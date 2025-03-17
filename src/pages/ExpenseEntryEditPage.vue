<template>
  <q-page class="row content-start justify-evenly">
    <div class="col-12 text-h6 row justify-between q-pa-md">
      <span class="text-primary">Update expense</span>
      <q-btn round outline color="primary" icon="delete" @click="deleteExpense()" />
    </div>
    <ExpenseEntryTransferEditor
      v-if="type === 'transfer'"
      :add-mode="false"
      @submit="update"
      :oldDate="expense.date"
      :oldCreditAccountId="creditId"
      :oldDebitAccountId="debitId"
      :oldDescription="expense.description"
      :oldAmount="expense.amount"
    />
    <ExpenseEntryEditor
      v-if="type === 'credit' || type === 'debit'"
      :add-mode="false"
      :type="type"
      :oldDate="expense.date"
      :oldAccountId="accountId"
      :oldCategoryId="categoryId"
      :oldDescription="expense.description"
      :oldAmount="expense.amount"
      @submit="update"
    />
  </q-page>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import ExpenseEntryEditor from 'src/components/expenses/ExpenseEntryEditor.vue';
import ExpenseEntryTransferEditor from 'src/components/expenses/ExpenseEntryTransferEditor.vue';
import Expense from 'src/model/expense';
import { ExpenseType } from 'src/model/expense-type';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return new Expense();
  }
});

const creditId = computed(() => {
  if (expense.value.credit) {
    return expense.value.credit.id;
  }
  return undefined;
});

const debitId = computed(() => {
  if (expense.value?.debit) {
    return expense.value.debit.id;
  }
  return undefined;
});

const accountId = computed(() => {
  if (creditId.value) {
    return creditId.value;
  }
  if (debitId.value) {
    return debitId.value;
  }
  return undefined;
});

const type = computed((): ExpenseType | undefined => {
  const value = expense.value;
  if (value?.category?.type) {
    return value.category.type;
  }
  if (value.isTransfer()) {
    return 'transfer';
  }
  return undefined;
});

const categoryId = computed((): string | undefined => {
  const value = expense.value;
  if (value?.category?.id) {
    return value.category.id;
  }
  return undefined;
});

async function update(evt: {
  date: string;
  credit: string | null;
  debit: string | null;
  categoryId: string | null;
  description: string;
  amount: string;
}): Promise<void> {
  try {
    await expenseStore.updateExpense(
      props.expenseId,
      evt.date,
      evt.credit,
      evt.debit,
      evt.categoryId,
      evt.amount,
      evt.description,
    );
    void router.push('/');
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    Notify.create('Error: ' + e);
  }
}
async function deleteExpense(): Promise<void> {
  try {
    await expenseStore.deleteExpense(props.expenseId);
    void router.push('/');
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    Notify.create('Error: ' + e);
  }
}
</script>
