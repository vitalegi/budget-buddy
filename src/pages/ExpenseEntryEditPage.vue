<template>
  <q-page class="row content-start justify-evenly">
    <div class="col-12 text-h6 row justify-between q-pa-md">
      <span class="text-primary">Update expense</span>
      <q-btn
        round
        outline
        color="primary"
        icon="delete"
        @click="deleteExpense()"
      />
    </div>
    <ExpenseEntryEditor
      v-if="expense"
      :add-mode="false"
      :type="type"
      :oldDate="expense.date"
      :oldAccountId="accountId"
      :oldCategoryId="categoryId"
      :oldDescription="expense.description"
      :oldAmount="expense.amount"
      @submit="update"
    ></ExpenseEntryEditor>
  </q-page>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import ExpenseEntryEditor from 'src/components/expenses/ExpenseEntryEditor.vue';
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
  } catch (e) {
    return null;
  }
});

const creditId = computed(() => {
  if (expense.value?.credit) {
    return expense.value.credit.id;
  }
  return null;
});

const debitId = computed(() => {
  if (expense.value?.debit) {
    return expense.value.debit.id;
  }
  return null;
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

const type = computed((): ExpenseType => {
  const value = expense.value;
  if (value?.category?.type) {
    return value.category.type;
  }
  throw new Error("Expense can't be edited on this page");
});

const categoryId = computed((): string => {
  const value = expense.value;
  if (value?.category?.id) {
    return value.category.id;
  }
  throw new Error("Expense can't be edited on this page");
});

async function update(evt: {
  date: string;
  accountId: string;
  categoryId: string;
  description: string;
  amount: string;
}): Promise<void> {
  try {
    let credit: string | null = null;
    let debit: string | null = null;
    if (expense.value?.credit) {
      credit = evt.accountId;
    }
    if (expense.value?.debit != null) {
      debit = evt.accountId;
    }

    await expenseStore.updateExpense(
      props.expenseId,
      evt.date,
      credit,
      debit,
      evt.categoryId,
      evt.amount,
      evt.description,
    );
    router.push('/');
  } catch (e) {
    Notify.create('Error: ' + e);
  }
}
async function deleteExpense(): Promise<void> {
  try {
    await expenseStore.deleteExpense(props.expenseId);
    router.push('/');
  } catch (e) {
    Notify.create('Error: ' + e);
  }
}
</script>
