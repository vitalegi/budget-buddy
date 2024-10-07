import { defineStore } from 'pinia';
import ExpenseUtil from 'src/utils/expense-util';

export const useAccountFilterStore = defineStore('accountFilter', {
  state: () => ({
    accountId: ExpenseUtil.ACCOUNT_ALL,
  }),
  actions: {
    setAccountId(accountId: string): void {
      this.accountId = accountId;
    },
  },
});
