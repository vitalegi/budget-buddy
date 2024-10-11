<template>
  <q-btn
    class="full-width"
    :color="color"
    @click="exportFile()"
    :loading="loading"
    :disable="disabled"
    :label="showCopiedIcon ? 'Copied!' : 'Copy to clipboard'"
    :icon-right="showCopiedIcon ? 'done' : 'content_copy'"
  >
  </q-btn>
</template>
<script setup lang="ts">
import { Notify } from 'quasar';
import { computed, ref } from 'vue';

interface Props {
  content: string;
  color?: string;
}

const props = defineProps<Props>();

const showCopiedIcon = ref(false);
const loading = ref(false);

const disabled = computed(() => props.content.length === 0);

function exportFile() {
  loading.value = true;
  try {
    navigator.clipboard.writeText(props.content);
    showCopiedIcon.value = true;
    setTimeout(() => (showCopiedIcon.value = false), 1000);
  } catch (e) {
    Notify.create(
      'Copy to clipboard is not allowed on your browser, try another method. Error: ' +
        e,
    );
  } finally {
    loading.value = false;
  }
}
</script>
