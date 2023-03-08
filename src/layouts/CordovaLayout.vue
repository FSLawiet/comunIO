<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-space />
        <q-toolbar-title>
          <q-avatar>
            <img src="icons/favicon-96x96.png" />
          </q-avatar>
        </q-toolbar-title>
        <q-space />
        <q-btn
          round
          :color="$q.dark.isActive ? 'primary' : 'dark'"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab :to="{ name: 'index' }" label="Home" />
        <q-route-tab :to="{ name: 'financeiro' }" label="Financeiro" />
      </q-tabs>
    </q-header>
    <q-drawer overlay :model-value="leftDrawerOpen"> </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated>
      <div>Quasar v{{ $q.version }}</div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar, LocalStorage } from 'quasar';
import { coreStore } from 'stores/coreStore';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const storeCore = coreStore();

export default defineComponent({
  name: 'CordovaLayout',

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksList,
    };
  },
  mounted() {
    storeCore.init();
    const $q = useQuasar();

    if (
      LocalStorage.getItem('darkmode') ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      LocalStorage.set('darkmode', true);
      $q.dark.set(true);
    } else if (
      !LocalStorage.getItem('darkmode') ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      LocalStorage.set('darkmode', false);
      $q.dark.set(false);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (event.matches) {
          LocalStorage.set('darkmode', true);
          $q.dark.set(true);
        } else {
          LocalStorage.set('darkmode', false);
          $q.dark.set(false);
        }
      });
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
