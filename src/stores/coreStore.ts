import SQLite from 'tauri-plugin-sqlite-api';
import { Notify } from 'quasar';
import { defineStore } from 'pinia';

export const coreStore = defineStore('storeCore', {
  state: () => ({
    listaUsuarios: [],
    listaFonteDestino: <{ id: number; nome: string }[]>[],
  }),
  getters: {
    getUsuario: (state) => state.listaUsuarios,
    getFonteDestino: (state) => state.listaFonteDestino,
  },
  actions: {
    async init() {
      try {
        const db = await SQLite.open('./database.db');
        await db.execute(`
          CREATE TABLE fonte_destino (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);
          INSERT INTO fonte_destino (nome) VALUES ('Banco do Brasil'), ('Itaú'), ('Nubank'), ('Dinheiro');
          CREATE TABLE usuario (id INTEGER PRIMARY KEY, firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          userName TEXT NOT NULL,
          email TEXT NOT NULL,
          pwd TEXT NOT NULL);
        `);
        Notify.create({
          type: 'positive',
          message: 'Base de dados inicializada!',
        });
        await db.close();
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro!',
        });
        console.log(error);
      }
    },
    async listarFonteDestino() {
      const db = await SQLite.open('./database.db');
      this.listaFonteDestino = await db.select<
        Array<{ id: number; nome: string }>
      >('SELECT id, nome FROM fonte_destino;');
      await db.close();
    },
  },
});
