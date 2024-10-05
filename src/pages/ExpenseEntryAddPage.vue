<template>
  <q-page class="row content-start justify-evenly">
    <div class="col-12 text-h6 row justify-between q-pa-md">
      <span>Add expense</span>
    </div>
    <ExpenseEntryEditor
      :type="type"
      :add-mode="true"
      @submit="add"
    ></ExpenseEntryEditor>
  </q-page>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import ExpenseEntryEditor from 'src/components/expenses/ExpenseEntryEditor.vue';
import { ExpenseType } from 'src/model/expense-type';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useRouter } from 'vue-router';

interface Props {
  type: ExpenseType;
}

const props = defineProps<Props>();

const expenseStore = useExpenseStore();

const router = useRouter();

async function add(evt: {
  date: string;
  accountId: string;
  categoryId: string;
  description: string;
  amount: string;
}): Promise<void> {
  try {
    const type = props.type;
    let credit: string | null = null;
    let debit: string | null = null;
    switch (type) {
      case 'credit':
        credit = evt.accountId;
        break;
      case 'debit':
        debit = evt.accountId;
        break;
      default:
        throw new Error(`type ${type} is not handled`);
    }

    await expenseStore.addExpense(
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
</script>
