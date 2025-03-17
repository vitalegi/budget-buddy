import { defineStore } from 'pinia';
import Category from 'src/model/category';
import { ExpenseType } from 'src/model/expense-type';
import db from './indexeddb-facade';
import ModelFactory from 'src/model/model-factory';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    map: new Map<string, Category>(),
  }),
  getters: {
    categories(state) {
      return (type?: ExpenseType): Category[] => {
        let entries = Array.from(state.map.values());
        if (type) {
          entries = entries.filter((c) => c.type === type);
        }
        return entries.sort((c1, c2) => (c1.name.toUpperCase() < c2.name.toUpperCase() ? -1 : 1));
      };
    },
    category(state) {
      return (id: string): Category => {
        const entries = Array.from(state.map.values()).filter((e) => e.id === id);
        if (entries.length === 0) {
          throw new Error(`No category with id ${id}`);
        }
        return entries[0];
      };
    },
  },
  actions: {
    async addCategory(
      name: string,
      active: boolean,
      type: ExpenseType,
      icon: string,
      color: string,
    ): Promise<Category> {
      const entry = ModelFactory.category(null, name, active, type, icon, color);
      this.map.set(entry.id, entry);
      await db.categories.add(entry);
      return entry;
    },
    async updateCategory(
      id: string,
      name: string,
      active: boolean,
      type: ExpenseType,
      icon: string,
      color: string,
    ): Promise<Category> {
      if (!this.map.has(id)) {
        throw new Error(`Can't find category with id ${id}`);
      }
      const entry = ModelFactory.category(id, name, active, type, icon, color);
      this.map.set(entry.id, entry);
      await db.categories.update(entry.id, entry);
      return entry;
    },

    async loadCategories(entries: Category[]): Promise<void> {
      entries.forEach((entry) => this.map.set(entry.id, entry));
    },
  },
});
