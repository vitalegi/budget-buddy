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
          <q-tabs
            v-model="chartTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            :align="'center'"
          >
            <q-tab name="compare" icon="account_balance" label="Balance" />
            <q-tab name="pie" icon="data_usage" label="Split" />
            <q-tab name="credits" icon="trending_up" label="In" />
            <q-tab name="debits" icon="trending_down" label="Out" />
          </q-tabs>
          <q-tab-panels
            v-model="chartTab"
            animated
            style="background-color: transparent !important"
          >
            <q-tab-panel name="pie">
              <CategoriesSunburstComponent />
            </q-tab-panel>
            <q-tab-panel name="debits">
              <CategoriesLineComponent
                :debits="true"
                :credits="false"
                :abs="true"
              />
            </q-tab-panel>
            <q-tab-panel name="credits">
              <CategoriesLineComponent
                :debits="false"
                :credits="true"
                :abs="true"
              />
            </q-tab-panel>
            <q-tab-panel name="compare">
              <CreditVsDebitLineComponent />
            </q-tab-panel>
          </q-tab-panels>
          <ExpensesByCategories></ExpensesByCategories>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ExpensesByCategories from 'components/expenses/ExpensesByCategories.vue';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed, ref } from 'vue';
import ExpenseUtil from 'src/utils/expense-util';
import { useExpenseStore } from 'src/stores/expenses-store';
import ExpenseValue from 'src/components/expenses/ExpenseValue.vue';
import TimeIntervalSlideItem from 'src/components/TimeIntervalSlideItem.vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import CategoriesSunburstComponent from 'src/components/CategoriesSunburstComponent.vue';
import CategoriesLineComponent from 'src/components/CategoriesLineComponent.vue';
import CreditVsDebitLineComponent from 'src/components/CreditVsDebitLineComponent.vue';

defineOptions({
  name: 'BudgetBuddyHomePage',
});

const intervalStore = useIntervalStore();
const accountFilterStore = useAccountFilterStore();
const expenseStore = useExpenseStore();

const chartTab = ref('pie');

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
</script>

<style scoped lang="scss">
.main-content {
  overflow: auto;
}

.q-tab-panels {
  background-color: transparent;
}
</style>
