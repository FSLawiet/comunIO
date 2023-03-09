<template>
  <!-- Fingerprint? 34:3A:52:2C:19:BD:00:C7:A9:9C:7F:9F:92:95:6D:2F:06:F2:6D:E0:F2:AA:E2:1E:1F:48:EB:CE:3F:A7:14:17 -->
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
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width align="center">
              <q-checkbox
                dense
                v-model="props.selected"
                :selected-rows-label="getSelectedString"
              />
            </q-td>
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="valor" :props="props">
              {{ `R$ ${props.row.valor.toFixed(2)}` }}
              <q-popup-edit
                v-model="props.row.valor"
                v-slot="scope"
                title="Alterar Valor da Receita"
                buttons
                @save="
                  (value, initialValue) =>
                    onUpdateField(props.row.id, { valor: value })
                "
              >
                <q-field
                  dense
                  autofocus
                  counter
                  v-model="scope.value"
                  label="Valor da Receita"
                  hint="Quantidade em Reais da entrada na receita"
                >
                  <template
                    v-slot:control="{
                      id,
                      floatingLabel,
                      modelValue,
                      emitValue,
                    }"
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
              </q-popup-edit>
            </q-td>
            <q-td key="data" :props="props">
              {{
                formatDate(
                  new Date(props.row.data).toUTCString(),
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
                    daysShort: [
                      'Dom',
                      'Seg',
                      'Ter',
                      'Qua',
                      'Qui',
                      'Sex',
                      'Sab',
                    ],
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
                )
              }}
              <q-popup-edit
                v-model="props.row.valor"
                v-slot="scope"
                title="Alterar Data da Receita"
                buttons
                @save="
                  (value, initialValue) =>
                    onUpdateField(props.row.id, { data: value })
                "
              >
                <q-date
                  v-model="scope.value"
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
                    daysShort: [
                      'Dom',
                      'Seg',
                      'Ter',
                      'Qua',
                      'Qui',
                      'Sex',
                      'Sab',
                    ],
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
                  minimal
                />
              </q-popup-edit>
            </q-td>
            <q-td key="origem" :props="props"
              >{{ formatOrigem(props.row.origem) }}
              <q-popup-edit
                v-model="props.row.origem"
                v-slot="scope"
                title="Alterar Origem da Receita"
                buttons
                @save="
                  (value, initialValue) =>
                    onUpdateField(props.row.id, { origem: value.value })
                "
              >
                <q-select
                  filled
                  v-model="scope.value.label"
                  :options="origens"
                  label="Origem de Renda"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="destino" :props="props"
              >{{ formatDestino(props.row.destino) }}
              <q-popup-edit
                v-model="props.row.destino"
                v-slot="scope"
                title="Alterar Destino da Receita"
                buttons
                @save="
                  (value, initialValue) =>
                    onUpdateField(props.row.id, { destino: value.value })
                "
              >
                <q-select
                  filled
                  v-model="scope.value.label"
                  :options="destinos"
                  label="Destino de Renda"
                />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Receita } from 'components/models';
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
    formatDate,
    formatOrigem(id: number) {
      return storeFinanceiro.getFontesRenda.filter(
        (origem) => origem.id === id
      )[0].nome;
    },
    formatDestino(id: number) {
      return storeCore.getFonteDestino.filter((destino) => destino.id === id)[0]
        .nome;
    },
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
    onUpdateField(id: number, arg: object) {
      storeFinanceiro.modificarReceita(id, arg);
      storeFinanceiro.listarReceitas();
    },
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
    columns() {
      return [
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
          name: 'origem',
          label: 'Origem',
          field: 'origem',
          align: 'center',
          format: (val: number) =>
            this.origens.filter((origem) => origem.value === val)[0].label,
        },
        {
          name: 'destino',
          label: 'Destino',
          field: 'destino',
          align: 'center',
          format: (val: number) =>
            this.destinos.filter((destino) => destino.value === val)[0].label,
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
