import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'financeiro',
        path: 'financeiro',
        component: () => import('pages/FinanceiroPage.vue'),
      },
      {
        name: 'receitas',
        path: 'financeiro/receitas',
        component: () => import('pages/ReceitasPage.vue'),
      },
      {
        name: 'despesas',
        path: 'financeiro/despesas',
        component: () => import('pages/DespesasPage.vue'),
      },
      {
        name: 'investimentos',
        path: 'financeiro/investimentos',
        component: () => import('pages/InvestimentosPage.vue'),
      },
      {
        name: 'docs',
        path: 'docs',
        component: () => import('pages/DocsPage.vue'),
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
