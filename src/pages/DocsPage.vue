<template>
  <q-page class="column items-center justify-evenly">
    <h3>DOCS</h3>
    <MDXProvider v-bind:components="components"><Post /></MDXProvider>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { MDXProvider } from '@mdx-js/vue';
import Post from '../stories/introduction.stories.mdx';

export default defineComponent({
  name: 'DocsPage',
  data() {
    return { components: { h1: 'h2' } };
  },
  components: { MDXProvider, Post },
});
</script>
