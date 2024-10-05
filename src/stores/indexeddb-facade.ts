import Dexie, { EntityTable } from 'dexie';
import Account from 'src/model/account';
import Category from 'src/model/category';
import { ExpenseDto } from 'src/model/expense';

const db = new Dexie('db') as Dexie & {
  accounts: EntityTable<Account, 'id'>;
  categories: EntityTable<Category, 'id'>;
  expenses: EntityTable<ExpenseDto, 'id'>;
};
db.version(1).stores({
  accounts: '++id, name, currency, active, icon, color',
  categories: '++id, type, name, active, icon, color',
  expenses:
    '++id, date, creditId, debitId, categoryId, amount, description, creationDate, lastUpdate',
});

export default db;
