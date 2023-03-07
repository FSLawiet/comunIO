import SQLite from 'tauri-plugin-sqlite-api';
import { Notify } from 'quasar';
import { defineStore } from 'pinia';

export const financeiroStore = defineStore('storeFinanceiro', {
  state: () => ({
    receitas: <
      {
        id: number;
        valor: number;
        data: string;
        origem: number;
        destino: number;
      }[]
    >[],
    despesas: [],
    investimentos: [],
  }),
  getters: {
    getReceitas: (state) => state.receitas,
    getDespesas: (state) => state.despesas,
    getInvestimentos: (state) => state.investimentos,
  },
  actions: {
    async listarReceitas() {
      const db = await SQLite.open('./database.db');
      this.receitas = await db.select<
        Array<{
          id: number;
          valor: number;
          data: string;
          origem: number;
          destino: number;
        }>
      >('SELECT id, valor, data, origem, destino FROM receitas;');
      await db.close();
    },
  },
});
