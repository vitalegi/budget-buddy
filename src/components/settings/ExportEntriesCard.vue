<template>
  <q-form @submit="exportFile" class="col-12 q-gutter-y-md" greedy>
    <q-card>
      <q-card-section>
        <q-btn
          class="full-width"
          color="primary"
          label="Export"
          type="submit"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>
<script setup lang="ts">
import { format } from 'date-fns';
import { useExpenseStore } from 'src/stores/expenses-store';

const expenseStore = useExpenseStore();

interface ExportFile {
  name: string;
  fileType: string;
  content: string;
}

async function exportJson(): Promise<ExportFile> {
  const out = await expenseStore.export();
  return {
    name: `budget-buddy-${format(new Date(), 'yyyy-MM-dd HHmmss')}.json`,
    fileType: 'text/json;charset=utf-8',
    content: JSON.stringify(out, null, 2),
  };
}

async function exportFile() {
  const file = await exportJson();
  download(file);
}

function download(file: ExportFile) {
  var dataStr = 'data:' + file + ',' + encodeURIComponent(file.content);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', file.name);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
</script>
