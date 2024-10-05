<template>
  <q-card class="col-12 q-gutter-y-md">
    <q-card-section>
      <q-file
        outlined
        v-model="model"
        @update:model-value="processFile"
        :loading="loading"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { format, parse } from 'date-fns';
import bigDecimal from 'js-big-decimal';
import { Notify } from 'quasar';
import Account from 'src/model/account';
import Category from 'src/model/category';
import { ExpenseType } from 'src/model/expense-type';
import { useExpenseStore } from 'src/stores/expenses-store';
import ArrayUtil from 'src/utils/array-util';
import BigDecimalUtil from 'src/utils/big-decimal-util';
import { ref } from 'vue';

const model = ref();

const loading = ref(false);

const expenseStore = useExpenseStore();

class ExpenseIn {
  id = '';
  date = '';
  accountName = '';
  categoryName = '';
  currency = '';
  amount = '';
  description = '';
}

async function processFile(e: File) {
  loading.value = true;
  const content = await e.text();
  try {
    const elements = readFile(content);
    await importEntries(elements);
  } catch (e) {
    error((e as Error).message);
  } finally {
    loading.value = false;
  }
}

function readFile(content: string): ExpenseIn[] {
  const lines = content.split('\n');
  if (lines.length === 0) {
    throw new Error('File is empty');
  }
  const expenses = new Array<ExpenseIn>();
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('"') && line.endsWith('"')) {
      line = line.substring(1, line.length - 1);
    }
    if (i === 0 && isHeader(line)) {
      continue;
    }
    if (line === '') {
      continue;
    }
    try {
      expenses.push(mapLine(line));
    } catch (e) {
      throw new Error(`Error on line ${i}: ${e}`);
    }
  }
  return expenses;
}

function isHeader(line: string): boolean {
  const actual = line.split(';').map((c) => c.toLowerCase().trim());
  const target = [
    'date',
    'account',
    'category',
    'amount',
    'currency',
    'description',
  ];
  if (actual.length !== target.length) {
    return false;
  }
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] != target[i]) {
      return false;
    }
  }
  return true;
}

function mapLine(line: string): ExpenseIn {
  const columns = line.split(';');
  if (columns.length < 6) {
    throw new Error('not all columns are present in the file');
  }
  const out = new ExpenseIn();
  const date = columns[0];
  try {
    const parsed = parse(date, 'yyyy-MM-dd', new Date());
    out.date = format(parsed, 'yyyy-MM-dd');
  } catch (e) {
    throw new Error(
      `date is invalid, expected format yyyy-MM-dd, found value: ${date}`,
    );
  }
  const account = columns[1].trim();
  if (account === '') {
    throw new Error('account is empty');
  }
  out.accountName = account;

  const category = columns[2].trim();
  if (category === '') {
    throw new Error('category is empty');
  }
  out.categoryName = category;

  const amount = columns[3].trim();
  try {
    const value = new bigDecimal(amount);
    if (value.compareTo(BigDecimalUtil.ZERO) === 0) {
      throw new Error('amount is zero');
    }
    out.amount = value.getValue();
  } catch (e) {
    throw new Error(`amount is not a valid number, found value: ${amount}`);
  }

  const currency = columns[4].trim();
  if (currency === '') {
    throw new Error('currency is empty');
  }
  out.currency = currency;

  out.description = columns[5];
  return out;
}

async function importEntries(entries: ExpenseIn[]): Promise<void> {
  const accountMap = await importAccounts(entries);
  const categoryMap = await importCategories(entries);

  for (let e of entries) {
    const account = accountMap.get(e.accountName)?.id || '';
    const category = categoryMap.get(e.categoryName)?.id || '';
    const amount = new bigDecimal(e.amount).abs().getValue();
    await expenseStore.addExpense(
      e.date,
      account,
      category,
      amount,
      e.description,
    );
  }
}

async function importAccounts(
  entries: ExpenseIn[],
): Promise<Map<string, Account>> {
  // accounts
  const receivedAccounts = ArrayUtil.distinct(
    entries.map((e) => e.accountName),
  );
  const accountMap = new Map<string, Account>();
  for (let e of receivedAccounts) {
    const matches = expenseStore.accounts.filter(
      (v) => v.name.toLowerCase() === e.toLowerCase(),
    );

    if (matches.length === 0) {
      const entry = await expenseStore.addAccount(e, '', true, '', '');
      accountMap.set(e, entry);
    } else {
      accountMap.set(e, matches[0]);
    }
  }
  return accountMap;
}

async function importCategories(
  entries: ExpenseIn[],
): Promise<Map<string, Category>> {
  const receivedCategories = ArrayUtil.distinct(
    entries.map((e) => e.categoryName),
  );
  const categoryMap = new Map<string, Category>();
  for (let e of receivedCategories) {
    const matches = expenseStore
      .categories()
      .filter((v) => v.name.toLowerCase() === e.toLowerCase());

    if (matches.length === 0) {
      const type = expenseType(entries, e);
      const entry = await expenseStore.addCategory(e, true, type, '', '');
      categoryMap.set(e, entry);
    } else {
      categoryMap.set(e, matches[0]);
    }
  }
  return categoryMap;
}

function expenseType(entries: ExpenseIn[], category: string): ExpenseType {
  let credits = 0;
  let debits = 0;
  entries
    .filter((e) => e.categoryName === category)
    .map((e) => new bigDecimal(e.amount).compareTo(BigDecimalUtil.ZERO) >= 0)
    .forEach((isPositive) => (isPositive ? ++credits : ++debits));

  if (credits > debits) {
    return 'credit';
  }
  return 'debit';
}

function error(msg: string) {
  Notify.create(msg);
}
</script>
