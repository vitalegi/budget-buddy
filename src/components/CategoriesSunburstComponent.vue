<template>
  <SunburstComponent :data="data"></SunburstComponent>
</template>

<script setup lang="ts">
import { SunburstSeries } from 'src/model/charts';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';
import { computed } from 'vue';
import SunburstComponent from './charts/SunburstComponent.vue';
import SunburstService from 'src/facade/chart-sunburst-service';

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();

const sunburstService = new SunburstService();

const expenses = computed(() =>
  expenseStore.expensesInInterval(
    intervalStore.from,
    intervalStore.to,
    accountFilterStore.accountId,
  ),
);

const data = computed((): SunburstSeries[] => {
  const accountId = accountFilterStore.accountId;
  const categories = ExpenseCategoryUtil.getCategories(
    expenses.value,
    accountId,
  );
  return sunburstService.data(categories);
});
</script>

<style scoped lang="scss"></style>
