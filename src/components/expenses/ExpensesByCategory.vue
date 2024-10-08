<template>
  <q-expansion-item dense switch-toggle-side expand-separator>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar :icon="icon" :color="color" text-color="white" />
      </q-item-section>

      <q-item-section>
        {{ label }}
      </q-item-section>

      <q-item-section side>
        <q-item-label>
          <ExpenseValue :amount="amount" currency=""></ExpenseValue>
        </q-item-label>
      </q-item-section>
    </template>

    <ExpenseItem
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
      dense
    >
    </ExpenseItem>
  </q-expansion-item>
</template>

<script setup lang="ts">
import ExpenseItem from './ExpenseItem.vue';
import ExpenseValue from './ExpenseValue.vue';
import Expense from 'src/model/expense';
import bigDecimal from 'js-big-decimal';

interface Props {
  categoryId: string;
  label: string;
  icon: string;
  color: string;

  expenses: Expense[];
  amount: bigDecimal;
}

defineProps<Props>();
</script>
