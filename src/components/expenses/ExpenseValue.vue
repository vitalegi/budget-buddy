<template>
  <span class="balance-entry-value" :class="amountType">
    <span class="text-weight-medium"> {{ formatAmountIntPart }}</span>
    <span class="decimal-part"
      >,{{ formatAmountDecimalPart }} {{ currency }}
    </span>
  </span>
</template>

<script setup lang="ts">
import bigDecimal from 'js-big-decimal';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import ExpenseUtil from 'src/utils/expense-util';
import { computed } from 'vue';

interface Props {
  amount: bigDecimal;
  currency: string;
}

const props = defineProps<Props>();

const amountType = computed(() =>
  ExpenseUtil.isCredit(props.amount) ? 'credit' : 'debit',
);

const formatAmountIntPart = computed((): string => {
  const parts = BigDecimalUtil.format(props.amount);
  return parts.integerPart;
});

const formatAmountDecimalPart = computed((): string => {
  const parts = BigDecimalUtil.format(props.amount);
  return parts.decimalPart;
});
</script>

<style scoped lang="scss">
.decimal-part {
  font-size: smaller;
}
.balance-entry-value.debit {
  color: $debit;
}
.balance-entry-value.credit {
  color: $credit;
}
</style>
