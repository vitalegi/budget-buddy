<template>
  <q-page class="row content-start justify-evenly">
    <div class="col-12 text-h6 row justify-between q-pa-md">
      <span class="text-primary">Add expense</span>
    </div>
    <ExpenseEntryTransferEditor v-if="type === 'transfer'" :add-mode="true" @submit="add" />
    <ExpenseEntryEditor v-else :type="type" :add-mode="true" @submit="add" />
  </q-page>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import ExpenseEntryEditor from 'src/components/expenses/ExpenseEntryEditor.vue';
import ExpenseEntryTransferEditor from 'src/components/expenses/ExpenseEntryTransferEditor.vue';
import { ExpenseType } from 'src/model/expense-type';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useRouter } from 'vue-router';

interface Props {
  type: ExpenseType;
}

defineProps<Props>();

const expenseStore = useExpenseStore();

const router = useRouter();

async function add(evt: {
  date: string;
  credit: string | null;
  debit: string | null;
  categoryId: string | null;
  description: string;
  amount: string;
}): Promise<void> {
  try {
    await expenseStore.addExpense(
      evt.date,
      evt.credit,
      evt.debit,
      evt.categoryId,
      evt.amount,
      evt.description,
    );
    router.push('/');
  } catch (e) {
    Notify.create('Error: ' + e);
  }
}
</script>
