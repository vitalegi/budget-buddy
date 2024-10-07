<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title @click="$router.push('/')">
          Budget Buddy
        </q-toolbar-title>

        <q-btn dense flat round icon="settings" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <div class="row items-start justify-start q-px-md">
        <AccountSelector
          v-model="accountId"
          :allow-all="true"
          class="col-12 q-py-md"
          @update:model-value="updateAccountId"
        />
        <div class="col-12 q-gutter-sm">
          <TimeIntervalSelector></TimeIntervalSelector>
        </div>
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <div class="row items-start justify-start">
        <q-list bordered separator class="col-12">
          <q-expansion-item expand-separator label="Categories">
            <template v-slot:header>
              <q-item-section> Categories </q-item-section>
            </template>
            <CategoriesVerticalEditor></CategoriesVerticalEditor>
          </q-expansion-item>
          <q-expansion-item expand-separator label="Accounts">
            <template v-slot:header>
              <q-item-section> Accounts </q-item-section>
            </template>
            <AccountsVerticalEditor></AccountsVerticalEditor>
          </q-expansion-item>
          <q-expansion-item expand-separator label="Accounts">
            <template v-slot:header>
              <q-item-section> Settings </q-item-section>
            </template>
            <SettingsList></SettingsList>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AccountsVerticalEditor from 'src/components/accounts/AccountsVerticalEditor.vue';
import CategoriesVerticalEditor from 'src/components/categories/CategoriesVerticalEditor.vue';
import SettingsList from 'src/components/settings/SettingsList.vue';
import TimeIntervalSelector from 'src/components/TimeIntervalSelector.vue';
import AccountSelector from 'src/components/accounts/AccountSelector.vue';
import { ref } from 'vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const accountFilterStore = useAccountFilterStore();

const accountId = ref(accountFilterStore.accountId);

function updateAccountId(newAccountId: string) {
  console.log(newAccountId);
  accountFilterStore.setAccountId(newAccountId);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
