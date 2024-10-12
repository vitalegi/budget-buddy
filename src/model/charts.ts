export interface SunburstSeries {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  };
  label?: {
    show: boolean;
  };
  children?: SunburstSeries[];
}

export interface LineChartSeries {
  name: string;
  stack: string;
  color: string;
  data: number[];
}

export interface LineChart {
  xAxis: {
    data: string[];
  };
  series: LineChartSeries[];
}
