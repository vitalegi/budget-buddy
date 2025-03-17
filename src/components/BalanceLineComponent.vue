<template>
  <LineChartComponent :data="data" :format-tooltip="tooltipFormatter" />
</template>

<script setup lang="ts">
import { LineChart, LineChartSeries } from 'src/model/charts';
import { computed } from 'vue';
import LineChartComponent from './charts/LineChartComponent.vue';
import ExpenseUtil from 'src/utils/expense-util';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import { COLOR_CREDIT, COLOR_DEBIT } from 'src/model/icon';
import FacadeFactory from 'src/facade/facade-factory';

const factory = new FacadeFactory();
const expenseService = factory.expenseService();
const chartService = factory.chartService();

const expenses = computed(() => expenseService.getExpensesInScope());

const tooltipFormatter = computed(() => chartService.amountFormatter());

const data = computed((): LineChart => {
  const accountId = expenseService.getSelectedAccount();

  // retrieve data
  const chartService = factory.chartService();
  const dates = chartService.getDatesInScope();
  const buckets = chartService.getDateBuckets(expenses.value, dates);

  // build series
  const seriesData = new Array<number>();
  for (const date of dates) {
    const entries = buckets.get(date);
    if (!entries) {
      seriesData.push(0);
    } else {
      seriesData.push(
        BigDecimalUtil.getNumberValue(ExpenseUtil.amountsWithSign(entries, accountId)),
      );
    }
  }
  for (let i = 1; i < seriesData.length; i++) {
    seriesData[i] = seriesData[i] + seriesData[i - 1];
  }

  // chart model
  const amount = seriesData.reduce((prev, curr) => prev + curr) || 0;
  const series: LineChartSeries = {
    name: 'Balance',
    stack: '',
    color: amount >= 0 ? COLOR_CREDIT : COLOR_DEBIT,
    data: seriesData,
  };

  const xAxis = chartService.datesToLabels(dates);
  return factory.lineChartService().chart(xAxis, [series]);
});
</script>

<style scoped lang="scss"></style>
