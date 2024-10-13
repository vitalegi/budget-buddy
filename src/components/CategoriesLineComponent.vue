<template>
  <LineChartComponent :data="data"></LineChartComponent>
</template>

<script setup lang="ts">
import { LineChart } from 'src/model/charts';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import { computed } from 'vue';
import LineChartComponent from './charts/LineChartComponent.vue';
import ExpenseUtil from 'src/utils/expense-util';
import { getRgbCode } from 'src/model/icon';
import FacadeFactory from 'src/facade/facade-factory';

interface Props {
  credits: boolean;
  debits: boolean;
  abs: boolean;
}

const props = defineProps<Props>();

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
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  const targetCategories = categories.filter((e) => {
    if (ExpenseUtil.isDebit(e.amount)) {
      return props.debits;
    }
    if (ExpenseUtil.isCredit(e.amount)) {
      return props.credits;
    }
    return false;
  });
  let from = intervalStore.from;
  let to = intervalStore.to;

  if (intervalStore.interval === 'all') {
    from = ExpenseUtil.getSmallestYear(expenses.value);
    to = ExpenseUtil.getBiggestYear(expenses.value);
  }
  const dates = factory
    .chartService()
    .dateRange(from, to, intervalStore.interval);
  return factory.lineChartService().data(targetCategories, dates, {
    abs: props.abs,
    stack: false,
    colors: {
      process: (color: string): string => getRgbCode(color, true),
    },
  });
});
</script>

<style scoped lang="scss"></style>
