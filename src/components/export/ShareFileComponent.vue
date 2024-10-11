<template>
  <q-btn
    class="full-width"
    :color="color"
    label="Share"
    @click="share()"
    :disable="disabled"
  >
  </q-btn>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import { computed } from 'vue';

interface Props {
  content: string;
  filename: string;
  contentType: string;
  color?: string;
}

const props = defineProps<Props>();

const disabled = computed(() => props.content.length === 0);

async function share(): Promise<void> {
  const blob = new Blob([props.content], {
    type: props.contentType,
  });
  const data = {
    files: [
      new File([blob], props.filename, {
        type: blob.type,
      }),
    ],
  };
  try {
    await navigator.share(data);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      console.debug('Share was cancelled by the user.');
      return;
    }
    Notify.create('Failed sharing, try another method. Error: ' + err);
  }
}
</script>
