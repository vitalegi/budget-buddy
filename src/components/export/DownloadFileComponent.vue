<template>
  <q-btn
    class="full-width"
    :color="color"
    @click="download()"
    :disable="disabled"
    label="Download"
  >
  </q-btn>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  content: string;
  filename: string;
  contentType: string;
  color?: string;
}

const props = defineProps<Props>();

const disabled = computed(() => props.content.length === 0);

function download() {
  const dataStr =
    'data:' + props.contentType + ',' + encodeURIComponent(props.content);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', props.filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
</script>
