<template>
  <q-list>
    <q-expansion-item label="Backup/restore">
      <BackupCard />
    </q-expansion-item>
    <q-expansion-item label="Import data">
      <ImportCard />
    </q-expansion-item>
  </q-list>
</template>
<script setup lang="ts">
import BackupCard from './BackupCard.vue';
import ImportCard from './ImportCard.vue';
</script>
