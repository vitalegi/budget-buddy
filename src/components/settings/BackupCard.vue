<template>
  <q-card class="col-12 q-gutter-y-md">
    <q-card-section>
      <q-btn
        class="full-width"
        color="primary"
        @click="exportFile()"
        :loading="loading"
        :disable="disabled"
      >
        <template v-slot>
          <div v-if="!showCopiedIcon">Copy to clipboard</div>
          <div v-else>Copied!</div>
          <q-space />
          <q-icon right name="content_copy" v-if="!showCopiedIcon" />
          <q-icon right name="done" v-else />
        </template>
      </q-btn>
      <div class="q-pa-sm text-caption">
        Will copy the full dataset to clipboard
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import { useExpenseStore } from 'src/stores/expenses-store';
import { computed, onMounted, onUpdated, ref } from 'vue';

const expenseStore = useExpenseStore();

const content = ref('');

const loading = ref(false);
const showCopiedIcon = ref(false);

const disabled = computed(() => content.value.length === 0);

function exportFile() {
  loading.value = true;
  try {
    navigator.clipboard.writeText(content.value);
    showCopiedIcon.value = true;
    setTimeout(() => (showCopiedIcon.value = false), 800);
  } catch (e) {
    Notify.create('Copy to clipboard failed: ' + e);
  } finally {
    loading.value = false;
  }
}

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
