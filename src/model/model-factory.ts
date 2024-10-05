import Expense, { ExpenseDto } from './expense';
import { v4 as uuidv4 } from 'uuid';
import Category from './category';
import Account from './account';
import { ExpenseType } from './expense-type';

export default class ModelFactory {
  public static expenseDto(
    id: string | null,
    date: string,
    creditId: string | null,
    debitId: string | null,
    categoryId: string | null,
    amount: string,
    description: string,
  ): ExpenseDto {
    const out = new ExpenseDto();
    if (id === null) {
      out.id = uuidv4().toString();
    } else {
      out.id = id;
    }
    out.date = date;
    out.creditId = creditId;
    out.debitId = debitId;
    out.categoryId = categoryId;
    out.amount = amount;
    out.description = description;
    out.creationDate = new Date();
    out.lastUpdate = new Date();
    return out;
  }

  public static expense(
    dto: ExpenseDto,
    categories: Map<string, Category>,
    accounts: Map<string, Account>,
  ): Expense {
    const out = new Expense();
    out.id = dto.id;
    if (dto.creditId) {
      out.credit = ModelFactory.getById(dto.creditId, accounts);
    }
    if (dto.debitId) {
      out.debit = ModelFactory.getById(dto.debitId, accounts);
    }
    if (dto.categoryId) {
      out.category = ModelFactory.getById(dto.categoryId, categories);
    }
    out.date = dto.date;
    out.amount = dto.amount;
    out.description = dto.description;
    return out;
  }
  public static category(
    id: string | null,
    name: string,
    active: boolean,
    type: ExpenseType,
    icon: string,
    color: string,
  ): Category {
    const category = new Category();
    if (id === null) {
      category.id = uuidv4().toString();
    } else {
      category.id = id;
    }
    category.name = name;
    category.type = type;
    category.active = active;
    category.icon = icon;
    category.color = color;
    return category;
  }
  public static account(
    id: string | null,
    name: string,
    currency: string,
    active: boolean,
    icon: string,
    color: string,
  ): Account {
    const account = new Account();
    if (id === null) {
      account.id = uuidv4().toString();
    } else {
      account.id = id;
    }
    account.name = name;
    account.active = active;
    account.currency = currency;
    account.icon = icon;
    account.color = color;
    return account;
  }

  private static getById<E>(id: string, accounts: Map<string, E>): E {
    const value = accounts.get(id);
    if (value) {
      return value;
    }
    throw Error(`Element ${id} doesn't exist`);
  }
}
