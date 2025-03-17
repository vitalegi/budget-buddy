import bigDecimal from 'js-big-decimal';
import { CategoryWithExpenses } from 'src/model/categories';
import { SunburstSeries } from 'src/model/charts';
import { COLOR_CREDIT, COLOR_DEBIT, getRgbCode } from 'src/model/icon';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import DateUtil from 'src/utils/date-util';
import ExpenseUtil from 'src/utils/expense-util';

export default class SunburstService {
  private static LABEL_MIN_PERCENTAGE = new bigDecimal('0.05');

  public data(categories: CategoryWithExpenses[]): SunburstSeries[] {
    const startTime = DateUtil.timestamp();
    const total = BigDecimalUtil.sum(categories.map((c) => c.amount.abs()));

    const credits = categories.filter((c) => ExpenseUtil.isCredit(c.amount));
    const debits = categories.filter((c) => ExpenseUtil.isDebit(c.amount));

    const out = [
      this.mapExpenseTypeToSeries(credits, 'Credits', COLOR_CREDIT, total),
      this.mapExpenseTypeToSeries(debits, 'Debits', COLOR_DEBIT, total),
    ];
    console.info(`loaded sunburst chart data in ${DateUtil.timestamp() - startTime}ms`);
    return out;
  }

  protected mapExpenseTypeToSeries(
    categories: CategoryWithExpenses[],
    name: string,
    color: string,
    totalValue: bigDecimal,
  ): SunburstSeries {
    const amount = this.absSum(categories.map((c) => c.amount));
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

  protected absSum(values: bigDecimal[]): number {
    return BigDecimalUtil.getNumberValue(BigDecimalUtil.sum(values).abs());
  }
}
