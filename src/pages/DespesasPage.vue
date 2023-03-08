<template>
  <q-page class="column items-center justify-evenly">
    <div class="q-pa-md">
      <div class="ops">
        <q-btn
          color="primary"
          icon="delete"
          @click="onDelete()"
          v-if="selecao.length > 0"
        />
        <q-btn color="primary" icon="add" @click="modalToggle()" />
      </div>
      <q-table
        title="Despesas"
        class="sticky-table"
        color="q-primary"
        bordered
        :rows="despesas"
        :columns="columns"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selecao"
        v-model:pagination="pagination"
        row-key="id"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
import { Despesa } from 'components/models';
import { defineComponent } from 'vue';
import { date, useQuasar } from 'quasar';
import { coreStore } from 'stores/coreStore';
import { financeiroStore } from 'stores/financeiroStore';
import { VMoney } from 'v-money';

const storeCore = coreStore();
const storeFinanceiro = financeiroStore();
const $q = useQuasar();
const { formatDate } = date;

export default defineComponent({
  name: 'DespesasPage',
  directives: { money: VMoney },
  data() {
    return {
      modalDisplay: false,
      pagination: { rowsPerPage: 10 },
      selecao: [] as Despesa[],
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    formatDate,
    getSelectedString() {
      return this.selecao.length === 0
        ? ''
        : `${this.selecao.length} despesa${
            this.selecao.length > 1 ? 's' : ''
          } selecionada${this.selecao.length > 1 ? 's' : ''} de ${
            this.despesas.length
          }`;
    },
  },
  mounted() {
    storeFinanceiro.listarDespesas();
    /*
    storeFinanceiro.listarFontesRenda().then(() => {
      for (let origem of storeFinanceiro.getFontesRenda) {
        this.origens.push({ label: origem.nome, value: origem.id });
      }
      storeCore.listarFonteDestino().then(() => {
        for (let destino of storeCore.getFonteDestino) {
          this.destinos.push({ label: destino.nome, value: destino.id });
        }
      });
    });
    */
  },
  computed: {
    despesas() {
      return storeFinanceiro.getDespesas;
    },
    columns() {
      return [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left' as 'left' | 'center' | 'right' | undefined,
          field: (row: Despesa) => row.id,
          format: (val: number) => `${val}`,
          sortable: true,
        },
        {
          name: 'valor',
          align: 'center',
          label: 'Valor',
          field: 'valor',
          format: (val: number) => `R$ ${val.toFixed(2)}`,
          sortable: true,
        },
        {
          name: 'data',
          label: 'Data',
          field: 'data',
          align: 'left',
          format: (val: string) =>
            date.formatDate(
              new Date(val).toUTCString(),
              'dddd, DD [de] MMMM [de] YYYY',
              {
                days: [
                  'Domingo',
                  'Segunda',
                  'Terça',
                  'Quarta',
                  'Quinta',
                  'Sexta',
                  'Sábado',
                ],
                daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                months: [
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ],
                monthsShort: [
                  'Jan',
                  'Fev',
                  'Mar',
                  'Abr',
                  'Mai',
                  'Jun',
                  'Jul',
                  'Ago',
                  'Set',
                  'Out',
                  'Nov',
                  'Dez',
                ],
              }
            ),
        },
        {
          name: 'fonte',
          label: 'Fonte',
          field: 'fonte',
          align: 'center',
        },
        {
          name: 'gasto',
          label: 'Gasto',
          field: 'gasto',
          align: 'center',
        },
      ];
    },
  },
});
</script>
<style scoped>
.sticky-table {
  /* height or max-height is important */
  max-height: 710px;
}
.modal_container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid var(--primary);
  border-radius: 15px;
  z-index: 4000;
  max-width: 75vw;
}
.formCliente {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
.fieldsets {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
fieldset {
  width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}
legend {
  padding: 0 4px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
}
.formButtons {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
.ops {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 0;
}
</style>
