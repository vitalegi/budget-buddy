import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/BudgetBuddyHomePage.vue'),
        meta: {
          footerActions: true,
        },
      },
      {
        path: '/add/:type',
        component: () => import('pages/ExpenseEntryAddPage.vue'),
        props: true,
      },
      {
        path: '/edit/:expenseId',
        component: () => import('pages/ExpenseEntryEditPage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
