<template>
  <q-list bordered class="rounded-borders" v-if="expenses.length > 0">
    <ExpensesByCategory
      :categoryId="category.id"
      :expenses="expenses"
      v-for="category in categories"
      :key="category.id"
    ></ExpensesByCategory>
  </q-list>
</template>

<script setup lang="ts">
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed } from 'vue';
import ExpensesByCategory from './ExpensesByCategory.vue';
import ExpenseUtil from 'src/utils/expense-util';
import { useAccountFilterStore } from 'src/stores/account-filter-store';

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
  return ExpenseUtil.sortCategoriesByAmount(expenses.value, false);
});
</script>
