import { defineStore } from 'pinia';
import TimeInterval from 'src/model/interval';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import SpanInterval from 'src/model/span-interval';
import { spanService } from 'src/facade/span-service';
import { IntervalServiceProvider } from 'src/facade/interval-service';

interface State {
  interval: TimeInterval;
  span: SpanInterval;
  from: Date;
  to: Date;
}

function intervalServiceProvider(): IntervalServiceProvider {
  return new IntervalServiceProvider();
}

export const useIntervalStore = defineStore('interval', {
  state: (): State => {
    return {
      interval: '30-days',
      span: 'daily',
      from: addDays(startOfDay(new Date()), -30),
      to: endOfDay(new Date()),
    };
  },
  getters: {
    label: (state) => {
      return intervalServiceProvider()
        .getTimeIntervalService(state.interval)
        .getLabel(state.from, state.to);
    },
  },
  actions: {
    change(interval: TimeInterval) {
      this.interval = interval;
      this.span = spanService.getDefaultSpan(interval);
      const range = intervalServiceProvider().getTimeIntervalService(interval).select();
      this.from = range.from;
      this.to = range.to;
    },
    now() {
      const range = intervalServiceProvider().getTimeIntervalService(this.interval).select();
      this.from = range.from;
      this.to = range.to;
    },
    next() {
      const range = intervalServiceProvider().getTimeIntervalService(this.interval).next({
        from: this.from,
        to: this.to,
      });
      this.from = range.from;
      this.to = range.to;
    },
    previous() {
      const range = intervalServiceProvider().getTimeIntervalService(this.interval).previous({
        from: this.from,
        to: this.to,
      });
      this.from = range.from;
      this.to = range.to;
    },
  },
});
