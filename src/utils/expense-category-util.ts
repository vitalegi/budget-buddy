import { CategoryGroup, CategoryWithExpenses } from 'src/model/categories';
import Expense from 'src/model/expense';
import ExpenseUtil from './expense-util';
import BigDecimalUtil from './big-decimal-util';

export default class ExpenseCategoryUtil {
  public static getCategories(expenses: Expense[], accountId: string): CategoryWithExpenses[] {
    const categories = new Map<string, CategoryWithExpenses>();
    for (const expense of expenses) {
      const category = ExpenseCategoryUtil.toCategoryGroup(expense, accountId);
      if (!category) {
        continue;
      }
      if (!categories.has(category.id)) {
        categories.set(category.id, {
          id: category.id,
          label: category.label,
          icon: category.icon,
          color: category.color,
          expenses: new Array<Expense>(),
          amount: BigDecimalUtil.ZERO,
        });
      }
      const container = categories.get(category.id);
      if (!container) {
        throw new Error('Missing category');
      }
      container.expenses.push(expense);
    }
    const list = Array.from(categories.values());
    list.forEach((e) => {
      e.amount = ExpenseUtil.amountsWithSign(e.expenses, accountId);
    });
    return ExpenseUtil.sortCategoriesByAmount(list, false);
  }

  private static toCategoryGroup(expense: Expense, accountId: string): CategoryGroup | null {
    if (expense.isTransfer()) {
      if (expense.credit?.id === accountId) {
        return {
          id: `CREDIT_${accountId}`,
          label: `From ${expense.debit?.name}`,
          icon: 'compare_arrows',
          color: 'primary',
        };
      }
      if (expense.debit?.id === accountId) {
        return {
          id: `DEBIT_${accountId}`,
          label: `To ${expense.credit?.name}`,
          icon: 'compare_arrows',
          color: 'primary',
        };
      }
      return null;
    }
    if (!expense.category) {
      throw new Error(`Expense without category: ${JSON.stringify(expense)}`);
    }
    return {
      id: expense.category.id,
      label: expense.category.name,
      icon: expense.category.icon,
      color: expense.category.color,
    };
  }
}
