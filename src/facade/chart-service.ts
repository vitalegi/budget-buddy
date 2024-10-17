import { addDays, addMonths, addYears, format } from 'date-fns';
import Expense, { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import TimeInterval from 'src/model/interval';

export default class ChartService {
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
      case '90-days':
        return addDays(current, 90);
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
        const bucket = this.getDateBucket(date, dates);
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
