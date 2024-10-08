import JsonUtil from 'src/utils/json-util';

export type ExpenseType = 'credit' | 'debit' | 'transfer';

export function convertToExpenseType(str: string): ExpenseType {
  const type = JsonUtil.asString(str);
  if (type === 'credit' || type === 'debit' || type === 'transfer') {
    return type;
  } else {
    throw Error(`Type ${type} is not supported`);
  }
}
