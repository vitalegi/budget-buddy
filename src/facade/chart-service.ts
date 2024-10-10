import bigDecimal from 'js-big-decimal';
import { CategoryWithExpenses } from 'src/model/categories';
import { SunburstSeries } from 'src/model/charts';
import { getRgbCode } from 'src/model/icon';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import DateUtil from 'src/utils/date-util';

function absSum(values: bigDecimal[]): number {
  return BigDecimalUtil.getNumberValue(BigDecimalUtil.sum(values).abs());
}

export class SunburstService {
  private static LABEL_MIN_PERCENTAGE = new bigDecimal('0.08');

  public static data(categories: CategoryWithExpenses[]): SunburstSeries[] {
    const startTime = DateUtil.timestamp();
    const total = BigDecimalUtil.sum(categories.map((c) => c.amount.abs()));

    const credits = categories.filter(
      (c) => c.amount.compareTo(BigDecimalUtil.ZERO) >= 0,
    );
    const debits = categories.filter(
      (c) => c.amount.compareTo(BigDecimalUtil.ZERO) < 0,
    );

    const out = [
      SunburstService.mapExpenseTypeToSeries(
        credits,
        'Credits',
        'rgb(137, 208, 157)',
        total,
      ),
      SunburstService.mapExpenseTypeToSeries(
        debits,
        'Debits',
        'rgb(231, 138, 135)',
        total,
      ),
    ];
    console.debug(`loaded chart data in ${DateUtil.timestamp() - startTime}ms`);
    return out;
  }

  protected static mapExpenseTypeToSeries(
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
        show: SunburstService.showLabel(new bigDecimal(amount), totalValue),
      },
      children: categories.map((c) => this.mapCategoryToSeries(c, totalValue)),
    };
  }

  protected static mapCategoryToSeries(
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
        show: SunburstService.showLabel(category.amount.abs(), totalValue),
      },
    };
  }

  protected static showLabel(amount: bigDecimal, tot: bigDecimal): boolean {
    if (tot.compareTo(BigDecimalUtil.ZERO) === 0) {
      return false;
    }
    const ratio = amount.divide(tot);
    return ratio.compareTo(SunburstService.LABEL_MIN_PERCENTAGE) >= 0;
  }
}
