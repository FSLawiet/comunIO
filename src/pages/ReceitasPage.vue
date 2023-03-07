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
<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { coreStore } from 'stores/coreStore';
import { financeiroStore } from 'stores/financeiroStore';

const storeCore = coreStore();
const storeFinanceiro = financeiroStore();
const $q = useQuasar();

export default defineComponent({
  name: 'ReceitasPage',
  data() {
    return {
      modalDisplay: false,
      pagination: { rowsPerPage: 50 },
      selecao: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'valor',
          align: 'center',
          label: 'Valor',
          field: 'valor',
          sortable: true,
        },
        { name: 'data', label: 'Data', field: 'data', align: 'left' },
      ],
    };
  },
  mounted() {
    storeFinanceiro.listarReceitas();
  },
  methods: {
    modalToggle() {
      this.modalDisplay = !this.modalDisplay;
    },
    /*
    onReset() {
      this.formData.r_social = '';
      this.formData.n_fantasia = '';
      this.formData.ddd = null;
      this.formData.telefone = null;
      this.formData.contato = '';
      this.formData.cpf_cnpj = '';
      this.formData.endereço = '';
      this.formData.bairro = '';
      this.formData.número = null;
      this.formData.complemento = '';
      this.formData.estado = '';
      this.formData.cidade = '';
      this.formData.cep = null;
    },
    onSubmit() {
      store.cadastrarCliente(this.formData);
      store.pullLista();
    },
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
            this.clientes.length
          }`;
    },
    onDelete() {
      for (let cliente of this.selecao) {
        // store.deletarCliente(cliente.id);
        // store.pullLista();
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
