import LineChartService from './chart-line-service';
import ChartService from './chart-service';

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
    return new ChartService();
  }

  public lineChartService(): LineChartService {
    return new LineChartService(this.chartService());
  }
}
