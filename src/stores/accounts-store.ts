import { defineStore } from 'pinia';
import Account from 'src/model/account';
import db from './indexeddb-facade';
import ModelFactory from 'src/model/model-factory';

export const useAccountStore = defineStore('account', {
  state: () => ({
    map: new Map<string, Account>(),
  }),
  getters: {
    accounts(state): Account[] {
      return Array.from(state.map.values()).sort((a1, a2) =>
        a1.name.toUpperCase() < a2.name.toUpperCase() ? -1 : 1,
      );
    },
  },
  actions: {
    async addAccount(
      name: string,
      currency: string,
      active: boolean,
      icon: string,
      color: string,
    ): Promise<Account> {
      const entry = ModelFactory.account(null, name, currency, active, icon, color);
      this.map.set(entry.id, entry);
      await db.accounts.add(entry);
      return entry;
    },
    async updateAccount(
      id: string,
      name: string,
      currency: string,
      active: boolean,
      icon: string,
      color: string,
    ): Promise<Account> {
      const entry = ModelFactory.account(id, name, currency, active, icon, color);
      this.map.set(entry.id, entry);
      await db.accounts.update(entry.id, entry);
      return entry;
    },
    loadAccounts(entries: Account[]): void {
      entries.forEach((entry) => this.map.set(entry.id, entry));
    },
  },
});
