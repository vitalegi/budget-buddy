<template>
  <q-page class="row content-start justify-evenly">
    <SettingsList class="full-width"></SettingsList>
  </q-page>
</template>

<script setup lang="ts">
import SettingsList from 'src/components/settings/SettingsList.vue';

defineOptions({
  name: 'BackupPage',
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
