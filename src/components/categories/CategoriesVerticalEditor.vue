<template>
  <q-list>
    <q-expansion-item class="bg-teal-1">
      <template v-slot:header>
        <q-item-section avatar>
          <q-icon color="primary" name="add" />
        </q-item-section>
        <q-item-section>New</q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <CategoryEditor
            id=""
            type="credit"
            name=""
            :active="true"
            icon=""
            color=""
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      v-for="element in elements"
      :key="element.id"
      expand-separator
      :label="element.name"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-icon :color="element.color" :name="element.icon" />
        </q-item-section>
        <q-item-section> {{ element.name }}</q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <CategoryEditor
            :id="element.id"
            :type="element.type"
            :name="element.name"
            :active="element.active"
            :icon="element.icon"
            :color="element.color"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import CategoryEditor from './CategoryEditor.vue';
import { useCategoryStore } from 'src/stores/categories-store';

const categoryStore = useCategoryStore();

const elements = computed(() => categoryStore.categories());
</script>
