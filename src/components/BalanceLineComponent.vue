<template>
  <LineChartComponent :data="data"></LineChartComponent>
</template>

<script setup lang="ts">
import { LineChart, LineChartSeries } from 'src/model/charts';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed } from 'vue';
import LineChartComponent from './charts/LineChartComponent.vue';
import ExpenseUtil from 'src/utils/expense-util';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import { COLOR_CREDIT, COLOR_DEBIT } from 'src/model/icon';
import FacadeFactory from 'src/facade/facade-factory';

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();

const factory = new FacadeFactory();

const expenses = computed(() =>
  expenseStore.expensesInInterval(
    intervalStore.from,
    intervalStore.to,
    accountFilterStore.accountId,
  ),
);

const data = computed((): LineChart => {
  const accountId = accountFilterStore.accountId;
  let from = intervalStore.from;
  let to = intervalStore.to;

  if (intervalStore.interval === 'all') {
    from = ExpenseUtil.getSmallestYear(expenses.value);
    to = ExpenseUtil.getBiggestYear(expenses.value);
  }

  // retrieve data
  const chartService = factory.chartService();
  const dates = chartService.dateRange(from, to, intervalStore.interval);
  const buckets = chartService.getDateBuckets(expenses.value, dates);

  // build series
  const seriesData = new Array<number>();
  for (const date of dates) {
    const entries = buckets.get(date);
    if (!entries) {
      seriesData.push(0);
    } else {
      seriesData.push(
        BigDecimalUtil.getNumberValue(
          ExpenseUtil.amountsWithSign(entries, accountId),
        ),
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
