<template>
  <LineChartComponent :data="data"></LineChartComponent>
</template>

<script setup lang="ts">
import { chartService, lineChartService } from 'src/facade/chart-service';
import { LineChart } from 'src/model/charts';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import { computed } from 'vue';
import LineChartComponent from './charts/LineChartComponent.vue';
import ExpenseUtil from 'src/utils/expense-util';
import { CategoryWithExpenses } from 'src/model/categories';

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();

const expenses = computed(() =>
  expenseStore.expensesInInterval(
    intervalStore.from,
    intervalStore.to,
    accountFilterStore.accountId,
  ),
);

function credit(categories: CategoryWithExpenses[]): CategoryWithExpenses {
  return group(
    categories,
    (c) => ExpenseUtil.isCredit(c.amount),
    'credit',
    'Credits',
    'rgb(137, 208, 157)',
  );
}

function debit(categories: CategoryWithExpenses[]): CategoryWithExpenses {
  return group(
    categories,
    (c) => ExpenseUtil.isDebit(c.amount),
    'debit',
    'Debits',
    'rgb(231, 138, 135)',
  );
}

function group(
  categories: CategoryWithExpenses[],
  accept: (c: CategoryWithExpenses) => boolean,
  id: string,
  label: string,
  color: string,
): CategoryWithExpenses {
  const targetCategories = categories.filter((c) => accept(c));
  const amount = targetCategories
    .map((c) => c.amount)
    .reduce((prev, curr) => prev.add(curr));

  return {
    id: id,
    label: label,
    icon: '',
    color: color,
    expenses: targetCategories.flatMap((c) => c.expenses),
    amount: amount,
  };
}

const data = computed((): LineChart => {
  const accountId = accountFilterStore.accountId;
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  let from = intervalStore.from;
  let to = intervalStore.to;

  if (intervalStore.interval === 'all') {
    from = ExpenseUtil.getSmallestYear(expenses.value);
    to = ExpenseUtil.getBiggestYear(expenses.value);
  }

  const dates = chartService.dateRange(from, to, intervalStore.interval);
  return lineChartService.data([credit(categories), debit(categories)], dates, {
    abs: false,
    stack: false,
    colors: {
      process: (color: string): string => color,
    },
  });
});
</script>

<style scoped lang="scss"></style>
