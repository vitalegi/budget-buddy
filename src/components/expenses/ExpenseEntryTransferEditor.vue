<template>
  <q-form
    @submit="onSubmit"
    class="col-12 q-pa-md q-gutter-y-md"
    style="max-width: 600px"
    greedy
  >
    <DateSelector v-model="qDate" :mask="DateUtil.Q_DATE_MASK" />
    <AccountSelector
      label="From account"
      v-model="debitAccountId"
      :allow-all="false"
      :rules="[debitMustBeDifferentThanCredit()]"
    />
    <AccountSelector
      label="To account"
      v-model="creditAccountId"
      :allow-all="false"
      :rules="[creditMustBeDifferentThanDebit()]"
    />
    <q-input outlined v-model="description" label="Description" />
    <AmountSelector v-model="amount" />

    <q-btn
      :label="submitButtonLabel"
      type="submit"
      color="primary"
      size="24px"
      style="width: 100%"
    />
  </q-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DateSelector from '../DateSelector.vue';
import DateUtil from 'src/utils/date-util';
import AccountSelector from '../accounts/AccountSelector.vue';
import AmountSelector from '../AmountSelector.vue';
import { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import { format, parse } from 'date-fns';
import { ValidationRule } from 'quasar';

interface Props {
  addMode: boolean;
  oldDate?: string;
  oldCreditAccountId?: string;
  oldDebitAccountId?: string;
  oldDescription?: string;
  oldAmount?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const qDate = ref<string>('');
const creditAccountId = ref<string>('');
const debitAccountId = ref<string>('');
const description = ref<string>('');
const amount = ref<string>('');

const submitButtonLabel = computed(() => {
  if (props.addMode) {
    return 'Add';
  }
  return 'Save';
});

function onSubmit() {
  const mappedDate = convertDate(
    qDate.value,
    DateUtil.Q_DATE_FORMAT,
    EXPENSE_DATE_FORMAT,
  );
  emit('submit', {
    date: mappedDate,
    credit: creditAccountId.value,
    debit: debitAccountId.value,
    categoryId: null,
    description: description.value.trim(),
    amount: amount.value,
  });
}

function initDate(newValue?: string): void {
  let value = format(new Date(), EXPENSE_DATE_FORMAT);
  if (newValue) {
    value = newValue;
  }
  qDate.value = convertDate(value, EXPENSE_DATE_FORMAT, DateUtil.Q_DATE_FORMAT);
}

function convertDate(date: string, inFormat: string, outFormat: string) {
  const temp = parse(date, inFormat, new Date());
  return format(temp, outFormat);
}

function creditMustBeDifferentThanDebit(): ValidationRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (val: any) =>
    (val && val !== debitAccountId.value) || 'Credit and Debit must differ';
}

function debitMustBeDifferentThanCredit(): ValidationRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (val: any) =>
    (val && val !== creditAccountId.value) || 'Credit and Debit must differ';
}

onMounted(() => {
  initDate(props.oldDate);
  if (props.oldCreditAccountId) {
    creditAccountId.value = props.oldCreditAccountId;
  }
  if (props.oldDebitAccountId) {
    debitAccountId.value = props.oldDebitAccountId;
  }
  if (props.oldDescription) {
    description.value = props.oldDescription;
  }
  if (props.oldAmount) {
    amount.value = props.oldAmount;
  }
});
</script>
