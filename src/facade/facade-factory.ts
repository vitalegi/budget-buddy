import LineChartService from './chart-line-service';
import ChartService from './chart-service';
import ExpenseService from './expense-service';

//interface Options {}

export default class FacadeFactory {
  //private options: Options;
  /*
  public constructor(options?: Options) {
    if (options) {
      this.options = options;
    } else {
      this.options = {};
    }
  }
*/
  public chartService(): ChartService {
    return new ChartService(this.expenseService());
  }

  public lineChartService(): LineChartService {
    return new LineChartService(this.chartService());
  }

  public expenseService(): ExpenseService {
    return new ExpenseService();
  }
}
