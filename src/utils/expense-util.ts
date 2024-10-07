import bigDecimal from 'js-big-decimal';
import Expense, { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import BigDecimalUtil from './big-decimal-util';
import Category from 'src/model/category';
import MapUtil from './map.util';
import { format } from 'date-fns';

export default class ExpenseUtil {
  public static ACCOUNT_ALL = 'ALL';

  public static sum(expenses: Expense[], accountId: string): bigDecimal {
    let amount = BigDecimalUtil.ZERO;
    for (const expense of expenses) {
      const newValue = new bigDecimal(expense.amount);
      if (expense.isCredit()) {
        amount = amount.add(newValue);
      }
      if (expense.isDebit()) {
        amount = amount.subtract(newValue);
      }
      if (expense.isTransfer()) {
        if (accountId === expense.credit?.id) {
          amount = amount.add(newValue);
        }
        if (accountId === expense.debit?.id) {
          amount = amount.subtract(newValue);
        }
      }
    }
    return amount;
  }

  public static inInterval(date: string, from: Date, to: Date): boolean {
    return (
      format(from, EXPENSE_DATE_FORMAT) <= date &&
      date <= format(to, EXPENSE_DATE_FORMAT)
    );
  }

  public static matchesAccount(expense: Expense, accountId: string): boolean {
    if (accountId === ExpenseUtil.ACCOUNT_ALL) {
      return true;
    }
    return expense.credit?.id === accountId || expense.debit?.id === accountId;
  }

  public static filterByCategory(
    expenses: Expense[],
    categoryId: string,
  ): Expense[] {
    return expenses.filter((e) => e.category?.id === categoryId);
  }

  public static getCategories(expenses: Expense[]): Category[] {
    const map = new Map<string, Category>();
    expenses
      .map((e) => e.category)
      .filter((e) => e !== null)
      .forEach((c) => {
        if (!map.has(c.id)) {
          map.set(c.id, c);
        }
      });
    return Array.from(map.values());
  }

  public static sortCategoriesByAmount(
    expenses: Expense[],
    asc: boolean,
  ): Category[] {
    const categories = ExpenseUtil.getCategories(expenses);
    const map = new Map<string, bigDecimal>();
    expenses.forEach((e) => {
      if (!e.category) {
        return;
      }
      let entry = map.get(e.category.id);
      if (entry === undefined) {
        entry = BigDecimalUtil.ZERO;
      }
      map.set(e.category.id, entry.add(new bigDecimal(e.amount)));
    });
    const multiplier = asc ? 1 : -1;
    return categories.sort((c1, c2) => {
      const v1 = MapUtil.getOrDefault(map, c1.id, BigDecimalUtil.ZERO);
      const v2 = MapUtil.getOrDefault(map, c2.id, BigDecimalUtil.ZERO);
      return multiplier * v1.compareTo(v2);
    });
  }

  public static sortExpensesByAmount(
    expenses: Expense[],
    asc: boolean,
  ): Expense[] {
    const multiplier = asc ? 1 : -1;
    return expenses
      .map((e) => e)
      .sort((e1, e2) => {
        const v1 = new bigDecimal(e1.amount);
        const v2 = new bigDecimal(e2.amount);
        return multiplier * v1.compareTo(v2);
      });
  }

  public static sortExpensesByDate(
    expenses: Expense[],
    asc: boolean,
  ): Expense[] {
    const multiplier = asc ? 1 : -1;
    return expenses
      .map((e) => e)
      .sort((e1, e2) => {
        return multiplier * (e1.date > e2.date ? 1 : -1);
      });
  }
}
