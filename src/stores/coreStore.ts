import SQLite from 'tauri-plugin-sqlite-api';
import { Notify, Platform } from 'quasar';
import { defineStore } from 'pinia';
import { dbInit } from 'src/db/db';

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
        if (Platform.is.cordova) {
          const db = window.sqlitePlugin.openDatabase({
            name: 'database.db',
            location: 'default',
          });
          db.transaction((tr) => {
            tr.executeSql(
              dbInit,
              [],
              (error) => {
                // alert(`Transaction ERROR: ${error.message}`)
                console.log('Transaction ERROR: ' + error.message);
              },
              (rs) => {
                // alert('Banco Criado com sucesso!')
                console.log(rs);
              }
            );
          });
        } else {
          const db = await SQLite.open('../src/db/database.db');
          await db.execute(dbInit);
          await db.close();
        }
        Notify.create({
          type: 'positive',
          message: 'Base de dados inicializada!',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro!',
        });
        console.log(error);
      }
    },
    async listarFonteDestino() {
      try {
        if (Platform.is.cordova) {
          const db = window.sqlitePlugin.openDatabase({
            name: 'database.db',
            location: 'default',
          });
          db.transaction((tr) => {
            tr.executeSql(
              'SELECT id, valor, data, fonte, gasto FROM despesas;',
              [],
              (tr, rs) => {
                console.log(rs);
                this.despesas = rs.rows;
              }
            );
          });
        } else {
          const db = await SQLite.open('../src/db/database.db');
          this.listaFonteDestino = await db.select<
            Array<{ id: number; nome: string }>
          >('SELECT id, nome FROM fonte_destino;');
          await db.close();
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro!',
        });
        console.log(error);
      }
    },
  },
});
