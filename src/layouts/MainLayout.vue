<template>
  <q-layout view="hHh lpR lFr">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title @click="$router.push('/')"> Budget Buddy </q-toolbar-title>

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
        <q-list bordered class="col-12">
          <q-item clickable v-ripple>
            <q-item-section @click="$router.push('/settings/categories')"
              >Categories</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="$router.push('/settings/accounts')">Accounts</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="$router.push('/settings/backup')"
              >Backup/Restore</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showFooterActions">
      <div class="row justify-evenly q-py-sm">
        <div class="col-12 row items-center justify-evenly" style="max-width: 600px">
          <q-btn
            size="40px"
            round
            outline
            icon="remove"
            class="big-button debit"
            @click="addDebit()"
          />
          <q-btn
            size="30px"
            round
            outline
            icon="compare_arrows"
            color="info"
            class="big-button"
            @click="addTransfer()"
          />
          <q-btn
            size="40px"
            round
            outline
            icon="add"
            class="big-button credit"
            @click="addCredit()"
          />
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import TimeIntervalSelector from 'src/components/TimeIntervalSelector.vue';
import AccountSelector from 'src/components/accounts/AccountSelector.vue';
import { computed, ref } from 'vue';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useRoute, useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const accountFilterStore = useAccountFilterStore();

const accountId = ref(accountFilterStore.accountId);

const router = useRouter();

const route = useRoute();

const showFooterActions = computed(() => route.meta.footerActions);

function updateAccountId(newAccountId?: string): void {
  if (newAccountId) {
    accountFilterStore.setAccountId(newAccountId);
  }
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
function addCredit() {
  void router.push('/add/credit');
}

function addDebit() {
  void router.push('/add/debit');
}

function addTransfer() {
  void router.push('/add/transfer');
}
</script>
<style scoped lang="scss">
.big-button.debit {
  color: $debit;
}
.big-button.credit {
  color: $credit;
}
</style>
