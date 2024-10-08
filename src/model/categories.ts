import bigDecimal from 'js-big-decimal';
import Expense from './expense';

export interface CategoryGroup {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface CategoryWithExpenses extends CategoryGroup {
  expenses: Expense[];
  amount: bigDecimal;
}
