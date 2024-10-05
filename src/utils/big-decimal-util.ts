import bigDecimal from 'js-big-decimal';

export default class BigDecimalUtil {
  public static readonly ZERO = new bigDecimal('0');

  public static format(n: bigDecimal): {
    integerPart: string;
    decimalPart: string;
  } {
    return {
      integerPart: BigDecimalUtil.getIntegerPart(n).getPrettyValue(3, '.'),
      decimalPart: BigDecimalUtil.getDecimalPart(n, 2).getValue().substring(2),
    };
  }

  public static getIntegerPart(val: bigDecimal): bigDecimal {
    return val.round(0, bigDecimal.RoundingModes.DOWN);
  }

  public static getDecimalPart(val: bigDecimal, precision: number): bigDecimal {
    const abs = val.abs();
    const integerPart = BigDecimalUtil.getIntegerPart(abs).abs();
    return abs
      .subtract(integerPart)
      .round(precision, bigDecimal.RoundingModes.DOWN);
  }
}
