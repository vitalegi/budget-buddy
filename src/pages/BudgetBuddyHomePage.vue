<template>
  <q-page class="row content-start justify-evenly">
    <div class="main-content col-12">
      <TimeIntervalSlideItem class="q-mb-sm"></TimeIntervalSlideItem>
      <div class="row col-12 justify-center q-mb-sm">
        <q-btn :draggable="false" color="grey-4" outline padding="sm xl">
          <ExpenseValue :amount="amount" currency=""></ExpenseValue>
        </q-btn>
      </div>
      <div class="row col-12 justify-center">
        <div style="max-width: 600px; width: 100%">
          <SunburstComponent :data="sunburstData"></SunburstComponent>
          <LineChartComponent :data="expensesChartData"></LineChartComponent>
          <ExpensesByCategories></ExpensesByCategories>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ExpensesByCategories from 'components/expenses/ExpensesByCategories.vue';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed } from 'vue';
import ExpenseUtil from 'src/utils/expense-util';
import { useExpenseStore } from 'src/stores/expenses-store';
import ExpenseValue from 'src/components/expenses/ExpenseValue.vue';
import TimeIntervalSlideItem from 'src/components/TimeIntervalSlideItem.vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import SunburstComponent from 'src/components/charts/SunburstComponent.vue';
import { LineChart, SunburstSeries } from 'src/model/charts';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import {
  chartService,
  lineChartService,
  sunburstService,
} from 'src/facade/chart-service';
import LineChartComponent from 'src/components/charts/LineChartComponent.vue';
import { endOfYear, parse, startOfYear } from 'date-fns';
import { EXPENSE_DATE_FORMAT } from 'src/model/expense';

defineOptions({
  name: 'BudgetBuddyHomePage',
});

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();

const amount = computed(() =>
  ExpenseUtil.amountsWithSign(expenses.value, accountFilterStore.accountId),
);

const expenses = computed(() =>
  expenseStore.expensesInInterval(
    intervalStore.from,
    intervalStore.to,
    accountFilterStore.accountId,
  ),
);

const sunburstData = computed((): SunburstSeries[] => {
  const accountId = accountFilterStore.accountId;
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  return sunburstService.data(categories);
});

const expensesChartData = computed((): LineChart => {
  const accountId = accountFilterStore.accountId;
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  const targetCategories = categories.filter((e) =>
    ExpenseUtil.isDebit(e.amount),
  );
  let from = intervalStore.from;
  let to = intervalStore.to;

  if (intervalStore.interval === 'all') {
    const firstDate = expenses.value
      .map((e) => e.date)
      .reduce((prev, curr) => (prev < curr ? prev : curr));
    const lastDate = expenses.value
      .map((e) => e.date)
      .reduce((prev, curr) => (prev > curr ? prev : curr));
    from = startOfYear(parse(firstDate, EXPENSE_DATE_FORMAT, new Date()));
    to = endOfYear(parse(lastDate, EXPENSE_DATE_FORMAT, new Date()));
  }

  const dates = chartService.dateRange(from, to, intervalStore.interval);
  return lineChartService.data(targetCategories, dates, false);
});
</script>

<style scoped lang="scss">
.main-content {
  overflow: auto;
}
</style>
