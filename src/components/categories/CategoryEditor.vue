<template>
  <q-form class="col-12 q-gutter-y-md" style="max-width: 600px" greedy>
    <q-btn-group spread>
      <q-btn
        :color="editor.type === 'debit' ? 'primary' : undefined"
        label="Debit"
        icon="remove"
        @click="
          editor.type = 'debit';
          update();
        "
      />
      <q-btn
        :color="editor.type === 'credit' ? 'primary' : undefined"
        label="Credit"
        icon="add"
        @click="
          editor.type = 'credit';
          update();
        "
      />
    </q-btn-group>

    <q-input
      outlined
      v-model="editor.name"
      label="Name"
      @update:model-value="update()"
      debounce="400"
    />
    <q-checkbox
      v-model="editor.active"
      label="Active"
      @update:model-value="update()"
    />
    <q-input
      outlined
      v-model="editor.icon"
      label="Icon"
      @update:model-value="update()"
      debounce="400"
    />
    <q-input
      outlined
      v-model="editor.color"
      label="Color"
      @update:model-value="update()"
      debounce="400"
    />
    <q-btn
      v-if="addMode"
      @click="save()"
      class="full-width"
      size="xl"
      color="primary"
      >Add</q-btn
    >
  </q-form>
</template>
<script setup lang="ts">
import { ExpenseType } from 'src/model/expense-type';
import { useCategoryStore } from 'src/stores/categories-store';
import { computed, onMounted, ref } from 'vue';

const categoryStore = useCategoryStore();

interface Props {
  id: string;
  type: ExpenseType;
  name: string;
  active: boolean;
  icon: string;
  color: string;
}

const props = defineProps<Props>();

const editor = ref<{
  id: string;
  type: ExpenseType;
  name: string;
  active: boolean;
  icon: string;
  color: string;
}>({
  id: '',
  type: 'credit',
  name: '',
  active: true,
  icon: '',
  color: '',
});

const addMode = computed(() => props.id === '');

function update(): void {
  if (addMode.value) {
    return;
  }
  save();
}

function save(): void {
  if (props.id !== '') {
    categoryStore.updateCategory(
      editor.value.id,
      editor.value.name.trim(),
      editor.value.active,
      editor.value.type,
      editor.value.icon,
      editor.value.color,
    );
  } else {
    categoryStore.addCategory(
      editor.value.name.trim(),
      editor.value.active,
      editor.value.type,
      editor.value.icon,
      editor.value.color,
    );
  }
}

onMounted(() => {
  if (props.id) {
    editor.value.id = props.id;
  }
  if (props.type) {
    editor.value.type = props.type;
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
});
</script>
