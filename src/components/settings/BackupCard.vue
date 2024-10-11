<template>
  <q-card class="col-12 q-gutter-y-md">
    <q-card-section class="q-gutter-y-xs">
      <DownloadFileComponent
        :filename="filename"
        :content="content"
        contentType="text/plain"
        color="primary"
      />
      <ShareFileComponent
        :filename="filename"
        :content="content"
        content-type="text/plain"
      />
      <CopyToClipboardComponent :content="content" />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { format } from 'date-fns';
import { useExpenseStore } from 'src/stores/expenses-store';
import { computed, onMounted, onUpdated, ref } from 'vue';
import ShareFileComponent from 'src/components/export/ShareFileComponent.vue';
import CopyToClipboardComponent from 'src/components/export/CopyToClipboardComponent.vue';
import DownloadFileComponent from 'src/components/export/DownloadFileComponent.vue';

const expenseStore = useExpenseStore();

const content = ref('');

const filename = computed(
  () => `budget-buddy-${format(new Date(), 'yyyy-MM-dd HHmmss')}.txt`,
);

async function exportJson(): Promise<string> {
  const out = await expenseStore.export();
  const content = JSON.stringify(out, null, 2);
  return content;
}

onUpdated(async () => {
  content.value = '';
  content.value = await exportJson();
});
onMounted(async () => {
  content.value = '';
  content.value = await exportJson();
});
</script>
