<template>
  <q-page class="row content-start justify-evenly">
    <ExpenseEntryEditor
      v-if="expense"
      :add-mode="false"
      :type="expense.category.type"
      :oldDate="expense.date"
      :oldAccountId="expense.account.id"
      :oldCategoryId="expense.category.id"
      :oldDescription="expense.description"
      :oldAmount="expense.amount"
      @submit="update"
    ></ExpenseEntryEditor>
  </q-page>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import ExpenseEntryEditor from 'src/components/expenses/ExpenseEntryEditor.vue';
import { useExpenseStore } from 'src/stores/expenses-store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  expenseId: string;
}

const props = defineProps<Props>();

const expenseStore = useExpenseStore();

const router = useRouter();

const expense = computed(() => {
  // if I land on the page before data is loaded (e.g. via direct link), this call will fail
  try {
    return expenseStore.expense(props.expenseId);
  } catch (e) {
    return null;
  }
});

async function update(evt: {
  date: string;
  accountId: string;
  categoryId: string;
  description: string;
  amount: string;
}): Promise<void> {
  try {
    await expenseStore.updateExpense(
      props.expenseId,
      evt.date,
      evt.accountId,
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
