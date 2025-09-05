import TimeInterval from 'src/model/interval';
import SpanInterval from 'src/model/span-interval';

export default class SpanService {
  public getDefaultSpan(interval: TimeInterval): SpanInterval {
    switch (interval) {
      case 'all':
        return 'yearly';
      case 'yearly':
        return 'monthly';
      case '90-days':
        return 'daily';
      case '90-days':
        return 'daily';
      case 'monthly':
        return 'daily';
      case 'weekly':
        return 'daily';
      case 'daily':
        return 'daily';
    }
  }

  public getAvailableSpans(interval: TimeInterval): SpanInterval[] {
    switch (interval) {
      case 'all':
        return ['daily', 'weekly', 'monthly', 'yearly'];
      case 'yearly':
        return ['daily', 'weekly', 'monthly', 'yearly'];
      case '90-days':
        return ['daily', 'weekly', 'monthly'];
      case '30-days':
        return ['daily', 'weekly'];
      case 'monthly':
        return ['daily', 'weekly'];
      case 'weekly':
        return ['daily'];
      case 'daily':
        return ['daily'];
    }
  }

  public getShortLabel(span: SpanInterval): string {
    switch (span) {
      case 'yearly':
        return 'Y';
      case 'monthly':
        return 'M';
      case 'weekly':
        return 'W';
      case 'daily':
        return 'D';
    }
  }
}

export const spanService = new SpanService();
