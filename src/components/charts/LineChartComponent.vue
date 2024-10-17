<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';

import * as echarts from 'echarts';
import { LineChart, LineChartSeries } from 'src/model/charts';
import { OptionDataValue } from 'echarts/types/src/util/types.js';

interface Props {
  data: LineChart;
  formatTooltip: (value: string | number | Date | null | undefined) => string;
  legend?: 'scroll';
}

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chartRef = ref<any>(null);

let chart: echarts.ECharts | undefined = undefined;

function process(series: LineChartSeries): echarts.SeriesOption {
  const out: echarts.SeriesOption = {
    name: series.name,
    type: 'line',
    stack: series.stack,
    emphasis: {
      focus: 'series',
    },
    color: series.color,
    data: series.data,
  };

  return out;
}

function processData(data: LineChartSeries[]): echarts.SeriesOption[] {
  return data.map((c) => process(c));
}

function load(data: LineChart) {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      valueFormatter: (
        value: OptionDataValue | OptionDataValue[],
        dataIndex: number,
      ) => {
        if (value instanceof Array) {
          return props.formatTooltip(value[dataIndex]);
        }
        return props.formatTooltip(value);
      },
    },
    toolbox: {
      feature: {
        //saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.xAxis.data,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: processData(data.series),
  };
  if (props.legend === 'scroll') {
    option.legend = {
      type: 'scroll',
      data: data.series.map((s) => {
        return { name: s.name };
      }),
    };
  }
  chart.setOption(option, { replaceMerge: ['series'] });
}

function unload() {
  if (chart) {
    chart.dispose();
    chart = undefined;
  }
}

onMounted(() => {
  load(props.data);
});

onUpdated(() => {
  load(props.data);
});

onBeforeUnmount(() => {
  unload();
});
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 200px;
}
</style>
