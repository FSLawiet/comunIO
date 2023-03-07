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
          CREATE TABLE usuario
          (
            id INTEGER PRIMARY KEY,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            userName TEXT NOT NULL,
            email TEXT NOT NULL,
            pwd TEXT NOT NULL
          );
          CREATE TABLE fontes_renda (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);
          INSERT INTO fontes_renda (nome)
          VALUES
            ('Salário'),
            ('Férias'),
            ('13º Salário'),
            ('Aposentadoria'),
            ('Receita extra (aluguel, restituição IR)'),
            ('Pensão'),
            ('Empréstimos'),
            ('Bônus'),
            ('Outras receitas');
          CREATE TABLE receitas (
            id INTEGER PRIMARY KEY,
            valor REAL NOT NULL,
            data TEXT NOT NULL,
            origem INTEGER NOT NULL,
            destino INTEGER NOT NULL,
            FOREIGN KEY(origem) REFERENCES fontes_renda(id),
            FOREIGN KEY(destino) REFERENCES fonte_destino(id));
          INSERT INTO receitas (valor, data, origem, destino)
          VALUES
            (6800.00, '2019-01-01', 1, 1),
            (300, '2019-01-01', 8, 1),
            (1200, '2019-01-01', 9, 1),
            (6800.00, '2019-02-01', 1, 1),
            (980, '2019-02-01', 8, 1),
            (1150, '2019-02-01', 9, 1),
            (6800.00, '2019-03-01', 1, 1),
            (320, '2019-03-01', 8, 1),
            (2200, '2019-03-01', 9, 1),
            (6800.00, '2019-04-01', 1, 1),
            (390, '2019-04-01', 8, 1),
            (920, '2019-04-01', 9, 1),
            (6800.00, '2019-05-01', 1, 1),
            (480, '2019-05-01', 8, 1),
            (1240, '2019-05-01', 9, 1),
            (6800.00, '2019-06-01', 1, 1),
            (670, '2019-06-01', 8, 1),
            (980, '2019-06-01', 9, 1),
            (2500, '2019-06-01', 8, 1),
            (6800.00, '2019-07-01', 1, 1),
            (230, '2019-07-01', 8, 1),
            (1390, '2019-07-01', 9, 1),
            (6800.00, '2019-07-01', 1, 1),
            (230, '2019-07-01', 8, 1),
            (1390, '2019-07-01', 9, 1),
            (7000.00, '2019-08-01', 1, 1),
            (120, '2019-08-01', 8, 1),
            (340, '2019-08-01', 9, 1),
            (7000.00, '2019-09-01', 1, 1),
            (220, '2019-09-01', 8, 1),
            (1100, '2019-09-01', 9, 1),
            (7000.00, '2019-10-01', 1, 1),
            (320, '2019-10-01', 8, 1),
            (890, '2019-10-01', 9, 1),
            (7200.00, '2019-11-01', 1, 1),
            (210, '2019-11-01', 8, 1),
            (970, '2019-11-01', 9, 1),
            (7200.00, '2019-12-01', 1, 1),
            (2500, '2019-12-01', 8, 1),
            (7200.00, '2020-01-01', 1, 1),
            (1200, '2020-01-01', 9, 1),
            (7200.00, '2020-02-01', 1, 1),
            (1400, '2020-02-01', 9, 1),
            (7200.00, '2020-03-01', 1, 1),
            (7200.00, '2020-04-01', 1, 1),
            (7200.00, '2020-05-01', 1, 1),
            (7200.00, '2020-06-01', 1, 1),
            (3100, '2020-06-01', 8, 1),
            (7200.00, '2020-07-01', 1, 1),
            (7300.00, '2020-08-01', 1, 1);
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
