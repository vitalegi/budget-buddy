<template>
  <q-form @submit="onSubmit" class="col-12 q-pa-md q-gutter-y-md" style="max-width: 600px" greedy>
    <DateSelector v-model="qDate" :mask="DateUtil.Q_DATE_MASK" />
    <AccountSelector v-model="accountId" :allow-all="false" />
    <CategorySelector v-model="categoryId" :type="type" />
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
import { ExpenseType } from 'src/model/expense-type';
import DateUtil from 'src/utils/date-util';
import AccountSelector from '../accounts/AccountSelector.vue';
import CategorySelector from '../categories/CategorySelector.vue';
import AmountSelector from '../AmountSelector.vue';
import { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import { format, parse } from 'date-fns';

interface Props {
  type: ExpenseType;
  addMode: boolean;
  oldDate?: string;
  oldAccountId?: string;
  oldCategoryId?: string;
  oldDescription?: string;
  oldAmount?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const qDate = ref<string>('');
const accountId = ref<string>('');
const categoryId = ref<string>('');
const description = ref<string>('');
const amount = ref<string>('');

const submitButtonLabel = computed(() => {
  if (props.addMode) {
    return 'Add';
  }
  return 'Save';
});

function onSubmit() {
  const mappedDate = convertDate(qDate.value, DateUtil.Q_DATE_FORMAT, EXPENSE_DATE_FORMAT);
  const type = props.type;
  let credit: string | null = null;
  let debit: string | null = null;
  switch (type) {
    case 'credit':
      credit = accountId.value;
      break;
    case 'debit':
      debit = accountId.value;
      break;
    default:
      throw new Error(`type ${type} is not handled`);
  }

  emit('submit', {
    date: mappedDate,
    credit: credit,
    debit: debit,
    categoryId: categoryId.value,
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

onMounted(() => {
  initDate(props.oldDate);
  if (props.oldAccountId) {
    accountId.value = props.oldAccountId;
  }
  if (props.oldCategoryId) {
    categoryId.value = props.oldCategoryId;
  }
  if (props.oldDescription) {
    description.value = props.oldDescription;
  }
  if (props.oldAmount) {
    amount.value = props.oldAmount;
  }
});
</script>
