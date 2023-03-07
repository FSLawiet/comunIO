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
    async fonteRendaById(id: number) {
      try {
        const db = await SQLite.open('../src/db/database.db');
        const resp = await db.select<FontesRenda>(
          `SELECT id, nome FROM fontes_renda WHERE id=${id};`
        );
        await db.close();
        return resp;
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
    async modificarReceita(
      id: number,
      payload: {
        valor?: number;
        data?: string;
        origem?: number;
        destino?: number;
      }
    ) {
      try {
        const db = await SQLite.open('../src/db/database.db');
        if (payload.valor)
          await db.execute(
            `UPDATE receitas SET valor = ${payload.valor} WHERE id = ${id} `
          );
        else if (payload.data)
          await db.execute(
            `UPDATE receitas SET data = ${payload.data} WHERE id = ${id} `
          );
        else if (payload.origem)
          await db.execute(
            `UPDATE receitas SET origem = ${payload.origem} WHERE id = ${id} `
          );
        else if (payload.destino)
          await db.execute(
            `UPDATE receitas SET destino = ${payload.destino} WHERE id = ${id} `
          );
        await db.close();
        Notify.create({
          message: 'Receita alterado com sucesso!',
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
