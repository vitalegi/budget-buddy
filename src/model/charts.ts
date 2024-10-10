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
