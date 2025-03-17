<template>
  <q-btn
    outline
    square
    :icon="icon"
    :color="color"
    size="xl"
    @click="showDialog = true"
    class="full-width"
  />
  <q-dialog v-model="showDialog" full-height full-width>
    <q-card class="q-px-sm q-pb-md">
      <q-card-actions :align="'right'">
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-actions>
      <q-card-section class="row q-col-gutter-xs">
        <div class="col-xs-4 col-md-3 col-lg-2 col-xl-1" v-for="entry in icons" :key="entry.icon">
          <q-btn
            :outline="entry.icon !== props.icon"
            square
            :icon="entry.icon"
            :color="entry.color"
            size="xl"
            class="full-width"
            @click="select(entry.icon, entry.color)"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { allIcons, Icon } from 'src/model/icon';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<Icon>();

const emit = defineEmits(['change']);

const showDialog = ref(false);

const selected = ref<Icon>({ icon: '', color: '' });

const icons = computed(() => allIcons());

function select(icon: string, color: string) {
  emit('change', { icon: icon, color: color });
}

onMounted(() => {
  selected.value.icon = props.icon;
  selected.value.color = props.color;
});
</script>
