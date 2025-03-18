import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { it } from 'date-fns/locale';
import TimeInterval from 'src/model/interval';

interface Range {
  from: Date;
  to: Date;
}

const options = { locale: it };

interface TimeIntervalService {
  getLabel(from: Date, to: Date): string;
  //getInterval(date: Date): Range;
  select(): Range;
  next(current: Range): Range;
  previous(current: Range): Range;
}

export class AllTimeIntervalService implements TimeIntervalService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLabel(from: Date, to: Date): string {
    return 'All';
  }
  select(): Range {
    return { from: new Date(0, 0, 0), to: new Date(9999, 0, 0) };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next(current: Range): Range {
    return this.select();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previous(current: Range): Range {
    return this.select();
  }
}

export class YearlyTimeIntervalService implements TimeIntervalService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLabel(from: Date, to: Date): string {
    return format(from, 'yyyy');
  }
  select(): Range {
    const now = new Date();
    return this.interval(now);
  }
  next(current: Range): Range {
    const next = addHours(current.to, 1);
    return this.interval(next);
  }
  previous(current: Range): Range {
    const next = addHours(current.from, -1);
    return this.interval(next);
  }
  private interval(date: Date): Range {
    return { from: startOfYear(date), to: endOfYear(date) };
  }
}

export class DaysRollingTimeIntervalService implements TimeIntervalService {
  days;

  public constructor(days: number) {
    this.days = days;
  }

  getLabel(from: Date, to: Date): string {
    return this.format(from) + ' - ' + this.format(to);
  }
  select(): Range {
    const today = endOfDay(new Date());
    return {
      from: addDays(startOfDay(today), -this.days),
      to: today,
    };
  }
  next(current: Range): Range {
    const base = addHours(current.to, 1);
    return {
      from: startOfDay(base),
      to: addDays(endOfDay(base), this.days),
    };
  }
  previous(current: Range): Range {
    const base = addHours(current.from, -1);
    return {
      from: addDays(startOfDay(base), -this.days),
      to: endOfDay(base),
    };
  }
  private format(date: Date) {
    return format(date, "d LLL ''yy", options);
  }
}

export class MonthlyTimeIntervalService implements TimeIntervalService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLabel(from: Date, to: Date): string {
    return format(from, "LLL ''yy", options);
  }
  select(): Range {
    const now = new Date();
    return this.interval(now);
  }
  next(current: Range): Range {
    const next = addHours(current.to, 1);
    return this.interval(next);
  }
  previous(current: Range): Range {
    const next = addHours(current.from, -1);
    return this.interval(next);
  }
  private interval(date: Date): Range {
    return { from: startOfMonth(date), to: endOfMonth(date) };
  }
}

export class WeeklyTimeIntervalService implements TimeIntervalService {
  getLabel(from: Date, to: Date): string {
    return this.format(from) + ' - ' + this.format(to);
  }
  select(): Range {
    const now = new Date();
    return this.interval(now);
  }
  next(current: Range): Range {
    const next = addHours(current.to, 1);
    return this.interval(next);
  }
  previous(current: Range): Range {
    const next = addHours(current.from, -1);
    return this.interval(next);
  }
  private interval(date: Date): Range {
    return {
      from: startOfWeek(date, { weekStartsOn: 1 }),
      to: endOfWeek(date, { weekStartsOn: 1 }),
    };
  }
  private format(date: Date) {
    return format(date, 'd LLL', options);
  }
}

export class DailyTimeIntervalService implements TimeIntervalService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLabel(from: Date, to: Date): string {
    return format(from, "EEEE d LLL ''yy", options);
  }
  select(): Range {
    const now = new Date();
    return this.interval(now);
  }
  next(current: Range): Range {
    const next = addHours(current.to, 1);
    return this.interval(next);
  }
  previous(current: Range): Range {
    const next = addHours(current.from, -1);
    return this.interval(next);
  }
  private interval(date: Date): Range {
    return { from: startOfDay(date), to: endOfDay(date) };
  }
}

export class IntervalServiceProvider {
  public getTimeIntervalService(interval: TimeInterval): TimeIntervalService {
    switch (interval) {
      case 'all':
        return new AllTimeIntervalService();
      case 'yearly':
        return new YearlyTimeIntervalService();
      case '90-days':
        return new DaysRollingTimeIntervalService(90);
      case 'monthly':
        return new MonthlyTimeIntervalService();
      case 'weekly':
        return new WeeklyTimeIntervalService();
      case 'daily':
        return new DailyTimeIntervalService();
    }
  }
}
