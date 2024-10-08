<template>
  <q-item>
    <q-item-section avatar top> </q-item-section>

    <q-item-section top>
      <q-item-label @click="openEditor">
        <ExpenseValue :amount="amount" :currency="currency"></ExpenseValue>
        &nbsp; &nbsp; &nbsp;
        <span class="text-grey-8"> {{ expense.description }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <q-item-label class="q-mt-sm">
        {{ dateLabel }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import Expense from 'src/model/expense';
import ExpenseValue from './ExpenseValue.vue';
import { computed } from 'vue';
import { format } from 'date-fns';
import { useRouter } from 'vue-router';
import ExpenseUtil from 'src/utils/expense-util';
import { useAccountFilterStore } from 'src/stores/account-filter-store';

interface Props {
  expense: Expense;
}

const dateLabel = computed(() => format(props.expense.date, 'd LLL'));

const props = defineProps<Props>();

const router = useRouter();
const accountFilterStore = useAccountFilterStore();

const currency = computed(() => {
  if (props.expense.debit) {
    return props.expense.debit.currency;
  }
  if (props.expense.credit) {
    return props.expense.credit.currency;
  }
  return '';
});

const amount = computed(() => {
  const accountId = accountFilterStore.accountId;
  return ExpenseUtil.amountWithSign(props.expense, accountId);
});

function openEditor() {
  router.push(`/edit/${props.expense.id}`);
}
</script>
