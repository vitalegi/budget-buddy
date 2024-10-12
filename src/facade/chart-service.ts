import { addDays, addMonths, addYears, format } from 'date-fns';
import bigDecimal from 'js-big-decimal';
import { CategoryWithExpenses } from 'src/model/categories';
import { LineChart, LineChartSeries, SunburstSeries } from 'src/model/charts';
import Expense, { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import { COLOR_CREDIT, COLOR_DEBIT, getRgbCode } from 'src/model/icon';
import TimeInterval from 'src/model/interval';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import DateUtil from 'src/utils/date-util';
import ExpenseUtil from 'src/utils/expense-util';

function absSum(values: bigDecimal[]): number {
  return BigDecimalUtil.getNumberValue(BigDecimalUtil.sum(values).abs());
}

class ChartService {
  public dateRange(from: Date, to: Date, interval: TimeInterval): string[] {
    const dates = new Array<string>();
    let current = from;
    while (current < to) {
      dates.push(format(current, EXPENSE_DATE_FORMAT));
      current = this.nextStep(current, interval);
    }
    return dates;
  }

  protected nextStep(current: Date, interval: TimeInterval): Date {
    switch (interval) {
      case 'all':
        return addYears(current, 1);
      case 'yearly':
        return addMonths(current, 1);
      case 'monthly':
        return addDays(current, 3);
      case 'weekly':
        return addDays(current, 1);
      case 'daily':
        return addDays(current, 1);
    }
  }

  public getDateBuckets(
    expenses: Expense[],
    dates: string[],
  ): Map<string, Expense[]> {
    const buckets = new Map<string, Expense[]>();

    // preprocess all dates for faster access
    const dateToBucket = new Map<string, string>();
    for (const expense of expenses) {
      const date = expense.date;
      if (!dateToBucket.has(date)) {
        const bucket = chartService.getDateBucket(date, dates);
        dateToBucket.set(date, bucket);
      }
    }

    // assign each expense to proper bucket
    for (const expense of expenses) {
      const targetBucketName = dateToBucket.get(expense.date);
      if (targetBucketName === undefined) {
        throw new Error(
          `Can't map ${expense.date} to buckets: ${Array.from(dateToBucket.keys())}`,
        );
      }
      const target = buckets.get(targetBucketName);
      if (target === undefined) {
        const list = new Array<Expense>();
        list.push(expense);
        buckets.set(targetBucketName, list);
      } else {
        target.push(expense);
      }
    }
    return buckets;
  }

  public getDateBucket(value: string, buckets: string[]): string {
    let previous: string | undefined;
    for (const bucket of buckets) {
      if (value <= bucket) {
        if (previous) {
          return previous;
        }
        return bucket;
      }
      previous = bucket;
    }
    return buckets[buckets.length - 1];
  }

  public datesToLabels(dates: string[]): string[] {
    return dates.map((d) => format(d, 'dd/MM/yyyy'));
  }
}
export const chartService = new ChartService();

class SunburstService {
  private static LABEL_MIN_PERCENTAGE = new bigDecimal('0.08');

  public data(categories: CategoryWithExpenses[]): SunburstSeries[] {
    const startTime = DateUtil.timestamp();
    const total = BigDecimalUtil.sum(categories.map((c) => c.amount.abs()));

    const credits = categories.filter((c) => ExpenseUtil.isCredit(c.amount));
    const debits = categories.filter((c) => ExpenseUtil.isDebit(c.amount));

    const out = [
      this.mapExpenseTypeToSeries(credits, 'Credits', COLOR_CREDIT, total),
      this.mapExpenseTypeToSeries(debits, 'Debits', COLOR_DEBIT, total),
    ];
    console.info(
      `loaded sunburst chart data in ${DateUtil.timestamp() - startTime}ms`,
    );
    return out;
  }

  protected mapExpenseTypeToSeries(
    categories: CategoryWithExpenses[],
    name: string,
    color: string,
    totalValue: bigDecimal,
  ): SunburstSeries {
    const amount = absSum(categories.map((c) => c.amount));
    return {
      name: name,
      value: amount,
      itemStyle: {
        color: color,
      },
      label: {
        show: this.showLabel(new bigDecimal(amount), totalValue),
      },
      children: categories.map((c) => this.mapCategoryToSeries(c, totalValue)),
    };
  }

  protected mapCategoryToSeries(
    category: CategoryWithExpenses,
    totalValue: bigDecimal,
  ): SunburstSeries {
    return {
      name: category.label,
      value: BigDecimalUtil.getNumberValue(category.amount.abs()),
      itemStyle: {
        color: getRgbCode(category.color, true),
      },
      label: {
        show: this.showLabel(category.amount.abs(), totalValue),
      },
    };
  }

  protected showLabel(amount: bigDecimal, tot: bigDecimal): boolean {
    if (tot.compareTo(BigDecimalUtil.ZERO) === 0) {
      return false;
    }
    const ratio = amount.divide(tot);
    return ratio.compareTo(SunburstService.LABEL_MIN_PERCENTAGE) >= 0;
  }
}
export const sunburstService = new SunburstService();

interface LineChartOptions {
  stack: boolean;
  abs: boolean;
  colors: {
    process: (color: string) => string;
  };
}

class LineChartService {
  public data(
    categories: CategoryWithExpenses[],
    dates: string[],
    options: LineChartOptions,
  ): LineChart {
    const startTime = DateUtil.timestamp();
    const out: LineChart = {
      xAxis: {
        data: dates.map((d) => format(d, 'dd/MM/yyyy')),
      },
      series: new Array<LineChartSeries>(),
    };

    for (const category of categories) {
      out.series.push(this.mapCategoryToSeries(category, dates, options));
    }

    console.info(
      `loaded line chart data in ${DateUtil.timestamp() - startTime}ms`,
    );
    return out;
  }

  public chart(xAxis: string[], series: LineChartSeries[]): LineChart {
    const out: LineChart = {
      xAxis: {
        data: xAxis,
      },
      series: series,
    };
    return out;
  }

  protected mapCategoryToSeries(
    category: CategoryWithExpenses,
    dates: string[],
    options: LineChartOptions,
  ): LineChartSeries {
    let sign = new bigDecimal('1');
    if (ExpenseUtil.isDebit(category.amount)) {
      sign = new bigDecimal('-1');
    }
    const stackName = options.stack ? 'stack' : '';
    const series: LineChartSeries = {
      name: category.label,
      stack: stackName,
      color: options.colors.process(category.color),
      data: this.amounts(category.expenses, dates, sign, options),
    };
    return series;
  }

  protected amounts(
    expenses: Expense[],
    dates: string[],
    sign: bigDecimal,
    options: LineChartOptions,
  ): number[] {
    const buckets = chartService.getDateBuckets(expenses, dates);

    const bucketsAmount = new Map<string, bigDecimal>();

    // for each bucket, compute amount
    buckets.entries().forEach((e) => {
      if (e[1].length > 0) {
        let amount = e[1]
          .map((exp) => new bigDecimal(exp.amount))
          .reduce((prev, curr) => prev.add(curr))
          .multiply(sign);
        if (options.abs) {
          amount = amount.abs();
        }
        bucketsAmount.set(e[0], amount);
      }
    });

    // sort values
    const out = new Array<number>();
    for (const date of dates) {
      const amount = bucketsAmount.get(date);
      if (!amount) {
        out.push(0);
      } else {
        out.push(BigDecimalUtil.getNumberValue(amount));
      }
    }
    return out;
  }
}

export const lineChartService = new LineChartService();
