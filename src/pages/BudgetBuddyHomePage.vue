<template>
  <q-page class="row content-start justify-evenly">
    <div class="main-content col-12">
      <TimeIntervalSlideItem class="q-mb-sm"></TimeIntervalSlideItem>
      <div class="row col-12 justify-center q-mb-sm">
        <q-btn :draggable="false" color="grey-4" outline padding="sm xl">
          <ExpenseValue :amount="amount" currency=""></ExpenseValue>
        </q-btn>
      </div>
      <div class="row col-12 justify-center">
        <div style="max-width: 600px; width: 100%">
          <ExpensesByCategories></ExpensesByCategories>
        </div>
      </div>
    </div>
    <div class="fixed-bottom row justify-evenly q-pb-md">
      <div
        class="col-12 row items-center justify-evenly"
        style="max-width: 600px"
      >
        <q-btn
          size="40px"
          round
          outline
          icon="remove"
          class="big-button debit"
          @click="addDebit()"
        />
        <q-btn
          size="30px"
          round
          outline
          icon="compare_arrows"
          color="info"
          class="big-button"
          @click="addTransfer()"
        />
        <q-btn
          size="40px"
          round
          outline
          icon="add"
          class="big-button credit"
          @click="addCredit()"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ExpensesByCategories from 'components/expenses/ExpensesByCategories.vue';
import { useIntervalStore } from 'src/stores/interval-store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import ExpenseUtil from 'src/utils/expense-util';
import { useExpenseStore } from 'src/stores/expenses-store';
import ExpenseValue from 'src/components/expenses/ExpenseValue.vue';
import TimeIntervalSlideItem from 'src/components/TimeIntervalSlideItem.vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';

defineOptions({
  name: 'BudgetBuddyHomePage',
});

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();
const router = useRouter();

const amount = computed(() =>
  ExpenseUtil.amountsWithSign(expenses.value, accountFilterStore.accountId),
);

const expenses = computed(() =>
  expenseStore.expensesInInterval(
    intervalStore.from,
    intervalStore.to,
    accountFilterStore.accountId,
  ),
);

function addCredit() {
  router.push('/add/credit');
}

function addDebit() {
  router.push('/add/debit');
}

function addTransfer() {
  router.push('/add/transfer');
}
</script>

<style scoped lang="scss">
.main-content {
  max-height: calc(100vh - 191px);
  overflow: auto;
}

.big-button.debit {
  color: $debit;
}
.big-button.credit {
  color: $credit;
}
</style>
