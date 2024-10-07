<template>
  <q-expansion-item dense switch-toggle-side expand-separator>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar
          :icon="category.icon"
          :color="category.color"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        {{ category.name }}
      </q-item-section>

      <q-item-section side>
        <q-item-label>
          <ExpenseValue :amount="amount" currency=""></ExpenseValue>
        </q-item-label>
      </q-item-section>
    </template>

    <ExpenseItem
      v-for="expense in expensesWithCategory"
      :key="expense.id"
      :expense="expense"
      dense
    >
    </ExpenseItem>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ExpenseItem from './ExpenseItem.vue';
import ExpenseValue from './ExpenseValue.vue';
import Expense from 'src/model/expense';
import ExpenseUtil from 'src/utils/expense-util';
import { useCategoryStore } from 'src/stores/categories-store';

interface Props {
  categoryId: string;
  expenses: Expense[];
}

const props = defineProps<Props>();

const categoryStore = useCategoryStore();

const category = computed(() => categoryStore.category(props.categoryId));

const expensesWithCategory = computed(() => {
  return ExpenseUtil.sortExpensesByDate(
    ExpenseUtil.filterByCategory(props.expenses, props.categoryId),
    false,
  );
});

const amount = computed(() => ExpenseUtil.sum(expensesWithCategory.value));
</script>
