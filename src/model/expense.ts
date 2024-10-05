import JsonUtil from 'src/utils/json-util';
import Account from './account';
import Category from './category';

export const EXPENSE_DATE_FORMAT = 'yyyy-MM-dd';

export default class Expense {
  id = '';
  date = '';
  credit: Account | null = null;
  debit: Account | null = null;
  category: Category | null = null;
  amount = '';
  description = '';
  creationDate = new Date();
  lastUpdate = new Date();

  public isTransfer(): boolean {
    return this.credit !== null && this.debit !== null;
  }
  public isCredit(): boolean {
    return this.credit !== null && this.debit === null;
  }
  public isDebit(): boolean {
    return this.credit === null && this.debit !== null;
  }
}

export class ExpenseDto {
  id = '';
  date = '';
  creditId: string | null = '';
  debitId: string | null = '';
  categoryId: string | null = null;
  amount = '';
  description = '';
  creationDate = new Date();
  lastUpdate = new Date();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromJson(obj: any): ExpenseDto {
    const out = new ExpenseDto();
    out.id = JsonUtil.asString(obj.id);
    out.date = JsonUtil.asString(obj.date);
    out.creditId = JsonUtil.asStringNullable(obj.creditId);
    out.debitId = JsonUtil.asStringNullable(obj.debitId);
    out.categoryId = JsonUtil.asStringNullable(obj.categoryId);
    out.amount = JsonUtil.asString(obj.amount);
    out.description = JsonUtil.asString(obj.description);

    out.creationDate = JsonUtil.asDate(obj.creationDate);
    out.lastUpdate = JsonUtil.asDate(obj.lastUpdate);
    return out;
  }
}
