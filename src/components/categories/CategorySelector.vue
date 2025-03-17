<template>
  <q-select
    label="Category"
    outlined
    :options="categories"
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
import { ExpenseType } from 'src/model/expense-type';
import { useCategoryStore } from 'src/stores/categories-store';
import { computed } from 'vue';

const model = defineModel<string>();

interface Props {
  type: ExpenseType;
}

const props = defineProps<Props>();

const categoryStore = useCategoryStore();

const categories = computed(() => categoryStore.categories(props.type).filter((c) => c.active));
</script>
