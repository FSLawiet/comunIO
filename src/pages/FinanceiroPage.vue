<template>
  <q-page class="column items-center justify-evenly">
    <h3>Financeiro</h3>
    <Bar
      :data="{
        labels: ['Receitas', 'Despesas', 'Investimentos'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [getSumReceitas, getSumDespesas, getSumInvestimentos],
          },
        ],
      }"
      :options="options"
    />
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { financeiroStore } from 'stores/financeiroStore';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const storeFinanceiro = financeiroStore();

export default defineComponent({
  name: 'FinanceiroPage',
  components: { Bar },
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },
  mounted() {
    storeFinanceiro.listarReceitas();
    storeFinanceiro.listarDespesas();
    storeFinanceiro.listarInvestimentos();
  },
  computed: {
    getSumReceitas() {
      return storeFinanceiro.getReceitas
        .map((item) => item.valor)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
    },
    getSumDespesas() {
      return storeFinanceiro.getDespesas
        .map((item) => item.valor)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
    },
    getSumInvestimentos() {
      return storeFinanceiro.getInvestimentos
        .map((item) => item.valor)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
    },
  },
});
</script>
