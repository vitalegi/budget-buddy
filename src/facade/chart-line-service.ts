import { format } from 'date-fns';
import bigDecimal from 'js-big-decimal';
import { CategoryWithExpenses } from 'src/model/categories';
import { LineChart, LineChartSeries } from 'src/model/charts';
import Expense from 'src/model/expense';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import DateUtil from 'src/utils/date-util';
import ExpenseUtil from 'src/utils/expense-util';
import ChartService from './chart-service';

interface LineChartOptions {
  stack: boolean;
  abs: boolean;
  colors: {
    process: (color: string) => string;
  };
}

export default class LineChartService {
  private chartService: ChartService;

  public constructor(chartService: ChartService) {
    this.chartService = chartService;
  }

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
    const buckets = this.chartService.getDateBuckets(expenses, dates);

    const bucketsAmount = new Map<string, bigDecimal>();

    // for each bucket, compute amount
    buckets.forEach((value: Expense[], key: string) => {
      if (value && value.length > 0) {
        let amount = value
          .map((exp) => new bigDecimal(exp.amount))
          .reduce((prev, curr) => prev.add(curr))
          .multiply(sign);
        if (options.abs) {
          amount = amount.abs();
        }
        bucketsAmount.set(key, amount);
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
