<template>
  <q-select
    label="Account"
    outlined
    :options="accounts"
    v-model="model"
    option-value="id"
    option-label="name"
    map-options
    emit-value
    hide-bottom-space
    :rules="[(val) => (val && val.trim().length !== 0) || 'Value is mandatory']"
  />
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/accounts-store';
import ExpenseUtil from 'src/utils/expense-util';
import { computed } from 'vue';

const model = defineModel<string>();

interface Props {
  allowAll: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  allowAll: false,
});

const accountStore = useAccountStore();

const accounts = computed((): Array<{ id: string; name: string }> => {
  const list = accountStore.accounts.filter((a) => a.active);
  if (props.allowAll) {
    return [{ id: ExpenseUtil.ACCOUNT_ALL, name: 'All accounts' }, ...list];
  }
  return list;
});
</script>
