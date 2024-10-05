import { defineStore } from 'pinia';
import Account from 'src/model/account';
import Category from 'src/model/category';
import Expense, { ExpenseDto } from 'src/model/expense';
import DateUtil from 'src/utils/date-util';
import db from './indexeddb-facade';
import modelFactory from 'src/model/model-factory';
import { useCategoryStore } from './categories-store';
import { useAccountStore } from './accounts-store';
import ModelFactory from 'src/model/model-factory';
import ExpenseUtil from 'src/utils/expense-util';

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    _entries: new Array<Expense>(),
  }),
  getters: {
    expense(state) {
      return (id: string): Expense => {
        const match = state._entries.filter((e) => e.id === id);
        if (match.length === 0) {
          throw Error(`Expense ${id} not found`);
        }
        return match[0];
      };
    },
    expensesInInterval(state) {
      return (from: Date, to: Date) => {
        return state._entries
          .filter((e) => ExpenseUtil.inInterval(e.date, from, to))
          .sort((e1: Expense, e2: Expense) => {
            if (e1.date !== e2.date) {
              return e1.date > e2.date ? 1 : -1;
            }
            return DateUtil.compareDates(e1.lastUpdate, e2.lastUpdate);
          });
      };
    },
  },
  actions: {
    async addExpense(
      date: string,
      creditId: string | null,
      debitId: string | null,
      categoryId: string | null,
      amount: string,
      description: string,
    ): Promise<Expense> {
      const dto = modelFactory.expenseDto(
        null,
        date,
        creditId,
        debitId,
        categoryId,
        amount,
        description,
      );
      const categoryStore = useCategoryStore();
      const accountStore = useAccountStore();
      const out = modelFactory.expense(
        dto,
        categoryStore.map,
        accountStore.map,
      );
      await db.expenses.add(dto);
      this._entries.push(out);
      return out;
    },
    async updateExpense(
      expenseId: string,
      date: string,
      creditId: string | null,
      debitId: string | null,
      categoryId: string,
      amount: string,
      description: string,
    ): Promise<Expense> {
      const categoryStore = useCategoryStore();
      const accountStore = useAccountStore();
      const entry = ModelFactory.expenseDto(
        expenseId,
        date,
        creditId,
        debitId,
        categoryId,
        amount,
        description,
      );
      await db.expenses.update(expenseId, entry);
      const index = this._entries.findIndex((e) => e.id === expenseId);
      const out = ModelFactory.expense(
        entry,
        categoryStore.map,
        accountStore.map,
      );
      this._entries.splice(index, 1, out);
      return out;
    },

    async deleteExpense(expenseId: string): Promise<void> {
      await db.expenses.delete(expenseId);
      const index = this._entries.findIndex((e) => e.id === expenseId);
      this._entries.splice(index, 1);
    },

    async loadExpenses(entries: ExpenseDto[]): Promise<void> {
      const categoryStore = useCategoryStore();
      const accountStore = useAccountStore();
      const out = entries.map((e) =>
        ModelFactory.expense(e, categoryStore.map, accountStore.map),
      );
      this._entries.push(...out);
    },
    async export(): Promise<{
      categories: Category[];
      accounts: Account[];
      expenses: ExpenseDto[];
    }> {
      const categories = await db.categories.toArray();
      const accounts = await db.accounts.toArray();
      const expenses = await db.expenses.toArray();
      return {
        categories: categories,
        accounts: accounts,
        expenses: expenses,
      };
    },
  },
});

const expenseStore = useExpenseStore();

async function loadCategories(): Promise<void> {
  const categoryStore = useCategoryStore();
  const startTime = DateUtil.timestamp();
  const entries = await db.categories.toArray();
  const mapped = entries.map(Category.fromJson);
  await categoryStore.loadCategories(mapped);
  console.log(`loaded categories in ${DateUtil.timestamp() - startTime}ms`);
}

async function loadAccounts(): Promise<void> {
  const accountStore = useAccountStore();
  const startTime = DateUtil.timestamp();
  const entries = await db.accounts.toArray();
  const mapped = entries.map(Account.fromJson);
  await accountStore.loadAccounts(mapped);
  console.log(`loaded accounts in ${DateUtil.timestamp() - startTime}ms`);
}

async function loadExpenses(): Promise<void> {
  const startTime = DateUtil.timestamp();
  const entries = await db.expenses.toArray();
  const mapped = entries.map(ExpenseDto.fromJson);
  await expenseStore.loadExpenses(mapped);
  console.log(`loaded expenses in ${DateUtil.timestamp() - startTime}ms`);
}

async function loadData() {
  await loadCategories();
  await loadAccounts();
  await loadExpenses();
}

loadData();
