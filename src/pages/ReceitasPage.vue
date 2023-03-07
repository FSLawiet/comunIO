<template>
  <q-page class="column items-center justify-evenly">
    <q-dialog v-model="modalDisplay">
      <div
        class="modal_container"
        :style="`background: ${$q.dark.isActive ? 'var(--q-dark)' : 'white'}; ${
          $q.dark.isActive
            ? 'box-shadow: 0 0 35px var(--q-primary); border: 2px solid var(--q-primary)'
            : ''
        }`"
      >
        <q-form @submit="onSubmit" @reset="onReset" class="formCliente">
          <div class="fieldsets">
            <fieldset>
              <legend>Informações da Receita</legend>
              <q-field
                rounded
                outlined
                v-model="formData.valor"
                label="Valor da Receita"
                hint="Quantidade em Reais da entrada na receita"
              >
                <template
                  v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
                >
                  <input
                    :id="id"
                    class="q-field__input text-right"
                    :value="modelValue"
                    @change="(e) => emitValue(e.target.value)"
                    v-money="moneyFormatForDirective"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
              <q-date
                v-model="formData.data"
                :locale="{
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
                }"
                today-btn
                mask="YYYY-MM-DD"
              />
              <q-select
                filled
                v-model="formData.origem"
                :options="origens"
                label="Origem de Renda"
              />
              <q-select
                filled
                v-model="formData.destino"
                :options="destinos"
                label="Destino de Renda"
              />
            </fieldset>
          </div>
          <div class="formButtons">
            <q-btn label="Enviar" type="submit" color="primary" />
            <q-btn
              label="Limpar Campos"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </q-dialog>
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
        title="Receitas"
        class="sticky-table"
        color="q-primary"
        bordered
        :rows="receitas"
        :columns="columns"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selecao"
        v-model:pagination="pagination"
        row-key="id"
      ></q-table>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Receita } from 'components/models';
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { coreStore } from 'stores/coreStore';
import { financeiroStore } from 'stores/financeiroStore';
import { VMoney } from 'v-money';

const storeCore = coreStore();
const storeFinanceiro = financeiroStore();
const $q = useQuasar();

export default defineComponent({
  name: 'ReceitasPage',
  directives: { money: VMoney },
  data() {
    return {
      modalDisplay: false,
      formData: {
        valor: '',
        data: '',
        origem: null as { label: string; value: number } | null,
        destino: null as { label: string; value: number } | null,
      },
      pagination: { rowsPerPage: 10 },
      selecao: [] as Receita[],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left' as 'left' | 'center' | 'right' | undefined,
          field: (row: Receita) => row.id,
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
        { name: 'data', label: 'Data', field: 'data', align: 'left' },
      ],
      origens: [] as { label: string; value: number }[],
      destinos: [] as { label: string; value: number }[],
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false,
      },
    };
  },
  mounted() {
    storeFinanceiro.listarReceitas();
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
  },
  methods: {
    modalToggle() {
      this.modalDisplay = !this.modalDisplay;
    },
    converteMoedaFloat(valor: string) {
      let preco = 0;
      if (valor !== '') {
        valor = valor.split(' ')[1];
        valor = valor.replace('.', '');
        valor = valor.replace(',', '.');
        preco = parseFloat(valor);
      }
      return preco;
    },
    onReset() {
      this.formData.valor = '';
      this.formData.data = '';
      this.formData.origem = null;
      this.formData.destino = null;
    },
    onSubmit() {
      const { valor, data, origem, destino } = this.formData;
      const correctedValor = this.converteMoedaFloat(valor);
      if (origem && destino) {
        storeFinanceiro.insertReceita({
          valor: correctedValor,
          data,
          origem: origem.value,
          destino: destino.value,
        });
        storeFinanceiro.listarReceitas();
        this.onReset();
        this.modalToggle();
      }
    },
    /*
    onUpdateField(id: number, arg: object) {
      store.modificarCliente(id, arg);
      store.pullLista();
    },
    */
    getSelectedString() {
      return this.selecao.length === 0
        ? ''
        : `${this.selecao.length} receita${
            this.selecao.length > 1 ? 's' : ''
          } selecionada${this.selecao.length > 1 ? 's' : ''} de ${
            this.receitas.length
          }`;
    },
    onDelete() {
      for (let receita of this.selecao) {
        if (receita.id) {
          storeFinanceiro.deletarReceita(receita.id);
          storeFinanceiro.listarReceitas();
        }
      }
    },
  },
  computed: {
    receitas() {
      return storeFinanceiro.getReceitas;
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
