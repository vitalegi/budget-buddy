<template>
  <q-page class="row content-start justify-evenly">
    <CategoriesVerticalEditor class="full-width"></CategoriesVerticalEditor>
  </q-page>
</template>

<script setup lang="ts">
import CategoriesVerticalEditor from 'src/components/categories/CategoriesVerticalEditor.vue';

defineOptions({
  name: 'CategoriesPage',
});
</script>

<style scoped lang="scss">
.main-content {
  overflow: auto;
}

.q-tab-panels {
  background-color: transparent;
}
</style>
