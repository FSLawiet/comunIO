import { FontesRenda, Receita } from 'components/models';
import SQLite from 'tauri-plugin-sqlite-api';
import { Notify } from 'quasar';
import { defineStore } from 'pinia';

export const financeiroStore = defineStore('storeFinanceiro', {
  state: () => ({
    receitas: <Receita[]>[],
    fontesRenda: <FontesRenda[]>[],
    despesas: [],
    investimentos: [],
  }),
  getters: {
    getReceitas: (state) => state.receitas,
    getFontesRenda: (state) => state.fontesRenda,
    getDespesas: (state) => state.despesas,
    getInvestimentos: (state) => state.investimentos,
  },
  actions: {
    async listarReceitas() {
      try {
        const db = await SQLite.open('../src/db/database.db');
        this.receitas = await db.select<Array<Receita>>(
          'SELECT id, valor, data, origem, destino FROM receitas;'
        );
        await db.close();
      } catch (error) {
        console.log(error);
      }
    },
    async listarFontesRenda() {
      try {
        const db = await SQLite.open('../src/db/database.db');
        this.fontesRenda = await db.select<Array<FontesRenda>>(
          'SELECT id, nome FROM fontes_renda;'
        );
        await db.close();
      } catch (error) {
        console.log(error);
      }
    },
    async insertReceita(receita: Receita) {
      try {
        const db = await SQLite.open('../src/db/database.db');
        await db.execute(
          `INSERT INTO receitas (valor, data, origem, destino) VALUES (${receita.valor}, '${receita.data}', ${receita.origem}, ${receita.destino})`
        );
        await db.close();
        Notify.create({
          message: 'Receita cadastrada com sucesso!',
          type: 'positive',
          position: 'top',
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          message: `${error}`,
          type: 'negative',
          position: 'top',
        });
      }
    },
    async deletarReceita(id: number) {
      try {
        const db = await SQLite.open('../src/db/database.db');
        await db.execute(`DELETE FROM receitas WHERE id=${id};`);
        await db.close();
        Notify.create({
          message: 'Receita excluída com sucesso!',
          type: 'positive',
          position: 'top',
        });
      } catch (error) {
        console.log(error);
        Notify.create({
          message: `${error}`,
          type: 'negative',
          position: 'top',
        });
      }
    },
  },
});