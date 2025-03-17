<template>
  <LineChartComponent :data="data" :format-tooltip="tooltipFormatter" legend="scroll" />
</template>

<script setup lang="ts">
import { LineChart } from 'src/model/charts';
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

const factory = new FacadeFactory();
const expenseService = factory.expenseService();
const chartService = factory.chartService();

const expenses = computed(() => expenseService.getExpensesInScope());

const tooltipFormatter = computed(() => chartService.amountFormatter());

const data = computed((): LineChart => {
  const accountId = expenseService.getSelectedAccount();
  const categories = ExpenseCategoryUtil.getCategories(expenses.value, accountId);
  const targetCategories = categories.filter((e) => {
    if (ExpenseUtil.isDebit(e.amount)) {
      return props.debits;
    }
    if (ExpenseUtil.isCredit(e.amount)) {
      return props.credits;
    }
    return false;
  });

  const chartService = factory.chartService();
  const dates = chartService.getDatesInScope();
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
