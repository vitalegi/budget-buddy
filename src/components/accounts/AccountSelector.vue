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
import { computed } from 'vue';

const model = defineModel<string>();

const accountStore = useAccountStore();

const accounts = computed(() => accountStore.accounts.filter((a) => a.active));
</script>
