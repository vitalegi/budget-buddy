<template>
  <q-select
    :label="label"
    outlined
    :options="accounts"
    v-model="model"
    option-value="id"
    option-label="name"
    map-options
    emit-value
    hide-bottom-space
    :rules="validationRules"
  />
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { useAccountStore } from 'src/stores/accounts-store';
import ExpenseUtil from 'src/utils/expense-util';
import { computed } from 'vue';

const model = defineModel<string>();

interface Props {
  label?: string;
  allowAll: boolean;
  rules?: ValidationRule[];
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Account',
  allowAll: false,
  rules: () => new Array<ValidationRule>(),
});

const accountStore = useAccountStore();

const validationRules = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mandatoryValue = (val: any) => (val && val.trim().length !== 0) || 'Value is mandatory';
  return [mandatoryValue, ...props.rules];
});

const accounts = computed((): Array<{ id: string; name: string }> => {
  const list = accountStore.accounts.filter((a) => a.active);
  if (props.allowAll) {
    return [{ id: ExpenseUtil.ACCOUNT_ALL, name: 'All accounts' }, ...list];
  }
  return list;
});
</script>
