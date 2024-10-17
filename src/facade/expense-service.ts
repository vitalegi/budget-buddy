import Expense from 'src/model/expense';
import TimeInterval from 'src/model/interval';
import { useAccountFilterStore } from 'src/stores/account-filter-store';
import { useExpenseStore } from 'src/stores/expenses-store';
import { useIntervalStore } from 'src/stores/interval-store';

export default class ExpenseService {
  private expenseStore;
  private intervalStore;
  private accountFilterStore;

  public constructor() {
    this.expenseStore = useExpenseStore();
    this.intervalStore = useIntervalStore();
    this.accountFilterStore = useAccountFilterStore();
  }

  public getExpensesInScope(): Expense[] {
    return this.expenseStore.expensesInInterval(
      this.intervalStore.from,
      this.intervalStore.to,
      this.accountFilterStore.accountId,
    );
  }

  public getSelectedAccount() {
    return this.accountFilterStore.accountId;
  }

  public getSelectedFrom(): Date {
    return this.intervalStore.from;
  }
  public getSelectedTo(): Date {
    return this.intervalStore.to;
  }
  public getIntervalType(): TimeInterval {
    return this.intervalStore.interval;
  }
}
