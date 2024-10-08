import bigDecimal from 'js-big-decimal';
import Expense, { EXPENSE_DATE_FORMAT } from 'src/model/expense';
import BigDecimalUtil from './big-decimal-util';
import Category from 'src/model/category';
import { format } from 'date-fns';
import { CategoryWithExpenses } from 'src/model/categories';

export default class ExpenseUtil {
  public static ACCOUNT_ALL = 'ALL';

  public static amountsWithSign(
    expenses: Expense[],
    accountId: string,
  ): bigDecimal {
    let amount = BigDecimalUtil.ZERO;
    for (const expense of expenses) {
      const value = ExpenseUtil.amountWithSign(expense, accountId);
      amount = amount.add(value);
    }
    return amount;
  }

  public static amountWithSign(
    expense: Expense,
    accountId: string,
  ): bigDecimal {
    const value = new bigDecimal(expense.amount);
    if (expense.isCredit()) {
      return value;
    } else if (expense.isDebit()) {
      return value.negate();
    } else if (expense.isTransfer()) {
      if (accountId === expense.credit?.id) {
        return value;
      }
      if (accountId === expense.debit?.id) {
        return value.negate();
      }
      return BigDecimalUtil.ZERO;
    }
    throw new Error(`Amount is not supported on ${JSON.stringify(expense)}`);
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
    categories: CategoryWithExpenses[],
    asc: boolean,
  ): CategoryWithExpenses[] {
    const multiplier = asc ? 1 : -1;
    return categories.sort((c1, c2) => {
      return multiplier * c1.amount.compareTo(c2.amount);
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
