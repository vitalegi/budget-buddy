<template>
  <q-btn-group push>
    <q-btn
      v-for="span of spans"
      :key="span"
      :label="shortLabel(span)"
      :color="isSelected(span) ? 'primary' : undefined"
      @click="selectSpan(span)"
    />
  </q-btn-group>
</template>

<script setup lang="ts">
import { spanService } from 'src/facade/span-service';
import SpanInterval from 'src/model/span-interval';
import { useIntervalStore } from 'src/stores/interval-store';
import { computed } from 'vue';

const intervalStore = useIntervalStore();

const spans = computed(() => spanService.getAvailableSpans(intervalStore.interval));

function shortLabel(span: SpanInterval): string {
  return spanService.getShortLabel(span);
}

function isSelected(span: SpanInterval): boolean {
  return span === intervalStore.span;
}

function selectSpan(span: SpanInterval): void {
  intervalStore.span = span;
}
</script>

<style scoped lang="scss"></style>
