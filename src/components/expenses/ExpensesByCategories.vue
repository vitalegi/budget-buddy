<template>
  <q-list bordered class="rounded-borders" v-if="expenses.length > 0">
    <ExpensesByCategory
      v-for="category in categories"
      :key="category.id"
      :categoryId="category.id"
      :label="category.label"
      :icon="category.icon"
      :color="category.color"
      :expenses="category.expenses"
      :amount="category.amount"
    ></ExpensesByCategory>
  </q-list>
</template>

<script setup lang="ts">
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed } from 'vue';
import ExpensesByCategory from './ExpensesByCategory.vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import ExpenseCategoryUtil from 'src/utils/expense-category-util';

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

const categories = computed(() => {
  const accountId = accountFilterStore.accountId;
  return ExpenseCategoryUtil.getCategories(expenses.value, accountId);
});
</script>
