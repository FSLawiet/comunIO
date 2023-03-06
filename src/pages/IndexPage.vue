<template>
  <q-page class="column items-center justify-evenly bg-image">
    <div class="page-content">
      <h3>Página Inicial</h3>
      <ul>
        <li v-for="(item, index) in fonteDestino" :key="index">
          {{ item.nome }}
        </li>
      </ul>
      <q-btn glossy label="Inicializar banco de dados" @click="initDatabase" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent } from 'vue';
import { coreStore } from 'stores/coreStore';

const store = coreStore();

export default defineComponent({
  name: 'IndexPage',
  data() {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ];
    const meta: Meta = {
      totalCount: 1200,
    };
    return { todos, meta };
  },
  mounted() {
    store.listarFonteDestino();
  },
  methods: {
    async initDatabase() {
      await store.init();
    },
  },
  computed: {
    fonteDestino() {
      return store.getFonteDestino;
    },
  },
});
</script>
<style>
.bg-image {
  position: relative;
}
.bg-image:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-image: url('assets/bg.webp');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
.page-content {
  position: relative;
}
</style>
