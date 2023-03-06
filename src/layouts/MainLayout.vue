<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar data-tauri-drag-region>
        <q-icon name="local_cafe" />
        <div>Comun.IO</div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn
          dense
          flat
          :icon="isMaximized ? 'window' : 'crop_square'"
          @click="maximize"
        />
        <q-btn dense flat icon="close" @click="close" />
      </q-bar>
      <q-toolbar>
        <div class="q-pa-sm q-pl-md row items-center">
          <div class="cursor-pointer non-selectable">
            File
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Open...</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable>
                  <q-item-section>Preferences</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>

                  <q-menu anchor="top end" self="top start">
                    <q-list>
                      <q-item v-for="n in 3" :key="n" dense clickable>
                        <q-item-section>Submenu Label</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" />
                        </q-item-section>
                        <q-menu auto-close anchor="top end" self="top start">
                          <q-list>
                            <q-item v-for="n in 3" :key="n" dense clickable>
                              <q-item-section>3rd level Label</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup>
                  <q-item-section>Quit</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Edit
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Cut</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Copy</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Paste</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Select All</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="q-ml-md cursor-pointer non-selectable">
            Financeiro
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable :to="{ name: 'financeiro' }">
                  <q-item-section>Painel de Controle</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable :to="{ name: 'receitas' }">
                  <q-item-section>Receitas</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'despesas' }">
                  <q-item-section>Despesas</q-item-section>
                </q-item>
                <q-item clickable :to="{ name: 'investimentos' }">
                  <q-item-section>Investimentos</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Orçamentos</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
        <q-space />
        <q-toolbar-title clickable :to="{ name: 'index' }">
          Comun.IO
        </q-toolbar-title>
        <q-space />
        <q-btn
          round
          :color="$q.dark.isActive ? 'primary' : 'dark'"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
      <div>Quasar v{{ $q.version }}</div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { appWindow } from '@tauri-apps/api/window';
import { useQuasar, LocalStorage } from 'quasar';

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

export default defineComponent({
  name: 'MainLayout',

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksList,
      windowState: false,
    };
  },
  mounted() {
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
    minimize() {
      appWindow.minimize();
    },
    maximize() {
      this.windowState = !this.windowState;
      appWindow.toggleMaximize();
    },
    close() {
      appWindow.close();
    },
  },
  computed: {
    isMaximized() {
      return this.windowState;
    },
  },
});
</script>
