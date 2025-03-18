<template>
  <q-page class="row content-start justify-evenly">
    <AccountsVerticalEditor class="full-width"></AccountsVerticalEditor>
  </q-page>
</template>

<script setup lang="ts">
import AccountsVerticalEditor from 'src/components/accounts/AccountsVerticalEditor.vue';

defineOptions({
  name: 'AccountsPage',
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
