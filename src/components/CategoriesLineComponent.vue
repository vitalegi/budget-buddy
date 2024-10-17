<template>
  <LineChartComponent :data="data"></LineChartComponent>
</template>

<script setup lang="ts">
import { LineChart } from 'src/model/charts';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import { computed } from 'vue';
import LineChartComponent from './charts/LineChartComponent.vue';
import ExpenseUtil from 'src/utils/expense-util';
import { getRgbCode } from 'src/model/icon';
import FacadeFactory from 'src/facade/facade-factory';
import ExpenseService from 'src/facade/expense-service';

interface Props {
  credits: boolean;
  debits: boolean;
  abs: boolean;
}

const props = defineProps<Props>();

const factory = new FacadeFactory();

const expenseService = new ExpenseService();

const expenses = computed(() => expenseService.getExpensesInScope());

const data = computed((): LineChart => {
  const accountId = expenseService.getSelectedAccount();
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
  let from = expenseService.getSelectedFrom();
  let to = expenseService.getSelectedTo();

  if (expenseService.getIntervalType() === 'all') {
    from = ExpenseUtil.getSmallestYear(expenses.value);
    to = ExpenseUtil.getBiggestYear(expenses.value);
  }
  const dates = factory
    .chartService()
    .dateRange(from, to, expenseService.getIntervalType());
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
