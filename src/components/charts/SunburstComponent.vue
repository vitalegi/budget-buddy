<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';

import * as echarts from 'echarts';
import { SunburstSeriesNodeItemOption } from 'echarts/types/src/chart/sunburst/SunburstSeries.js';
import { SunburstSeries } from 'src/model/charts';

interface Props {
  data: SunburstSeries[];
}

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chartRef = ref<any>(null);

let chart: echarts.ECharts | undefined = undefined;

function process(data: SunburstSeries): SunburstSeriesNodeItemOption {
  const out: SunburstSeriesNodeItemOption = {
    name: data.name,
    value: data.value,
  };
  if (data.itemStyle) {
    out.itemStyle = {
      color: data.itemStyle.color,
    };
  }
  if (data.label) {
    out.label = {
      show: data.label.show,
    };
  }
  if (data.children) {
    out.children = data.children.map((c) => process(c));
  }
  return out;
}

function processData(data: SunburstSeries[]): SunburstSeriesNodeItemOption[] {
  return data.map((c) => process(c));
}

function load(data: SunburstSeries[]) {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }
  const option: echarts.EChartsOption = {
    series: {
      type: 'sunburst',
      data: processData(data),
      radius: [20, '95%'],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        show: true,
      },
    },
  };
  chart.setOption(option);
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
