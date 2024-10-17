<template>
  <SunburstComponent :data="data"></SunburstComponent>
</template>

<script setup lang="ts">
import { SunburstSeries } from 'src/model/charts';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import { computed } from 'vue';
import SunburstComponent from './charts/SunburstComponent.vue';
import SunburstService from 'src/facade/chart-sunburst-service';
import FacadeFactory from 'src/facade/facade-factory';

const factory = new FacadeFactory();
const expenseService = factory.expenseService();
const sunburstService = new SunburstService();

const expenses = computed(() => expenseService.getExpensesInScope());

const data = computed((): SunburstSeries[] => {
  const accountId = expenseService.getSelectedAccount();
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  return sunburstService.data(categories);
});
</script>

<style scoped lang="scss"></style>
