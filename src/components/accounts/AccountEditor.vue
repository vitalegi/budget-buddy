<template>
  <q-form class="col-12 q-gutter-y-md" style="max-width: 600px" greedy>
    <q-input
      outlined
      v-model="editor.name"
      label="Name"
      @update:model-value="update()"
      debounce="400"
    />
    <q-input
      outlined
      v-model="editor.currency"
      label="Currency"
      @update:model-value="update()"
      debounce="400"
    />
    <q-checkbox v-model="editor.active" label="Active" @update:model-value="update()" />
    <IconSelector :icon="editor.icon" :color="editor.color" @change="changeIcon"></IconSelector>
    <q-btn v-if="addMode" @click="save()" class="full-width" size="xl" color="primary">Add</q-btn>
  </q-form>
</template>
<script setup lang="ts">
import { useAccountStore } from 'src/stores/accounts-store';
import { computed, onMounted, ref } from 'vue';
import IconSelector from '../IconSelector.vue';
import { randomIcon } from 'src/model/icon';

const accountStore = useAccountStore();

interface Props {
  id: string;
  name: string;
  currency: string;
  active: boolean;
  icon: string;
  color: string;
}

const props = defineProps<Props>();

const editor = ref<{
  id: string;
  name: string;
  currency: string;
  active: boolean;
  icon: string;
  color: string;
}>({
  id: '',
  currency: '',
  name: '',
  active: true,
  icon: '',
  color: '',
});
const addMode = computed(() => props.id === '');

function changeIcon(event: { icon: string; color: string }) {
  editor.value.icon = event.icon;
  editor.value.color = event.color;
  update();
}

function update(): void {
  if (addMode.value) {
    return;
  }
  save();
}

function save(): void {
  if (props.id !== '') {
    void accountStore.updateAccount(
      editor.value.id,
      editor.value.name.trim(),
      editor.value.currency,
      editor.value.active,
      editor.value.icon,
      editor.value.color,
    );
  } else {
    void accountStore.addAccount(
      editor.value.name.trim(),
      editor.value.currency,
      editor.value.active,
      editor.value.icon,
      editor.value.color,
    );
  }
}

onMounted(() => {
  if (props.id) {
    editor.value.id = props.id;
  }
  if (props.currency) {
    editor.value.currency = props.currency;
  }
  if (props.name) {
    editor.value.name = props.name;
  }
  if (props.active) {
    editor.value.active = props.active;
  }
  if (props.icon) {
    editor.value.icon = props.icon;
  }
  if (props.color) {
    editor.value.color = props.color;
  }
  if (editor.value.icon === '') {
    const baseIcon = randomIcon();
    editor.value.icon = baseIcon.icon;
    editor.value.color = baseIcon.color;
  }
});
</script>
