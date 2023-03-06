import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  QAvatar,
  QBadge,
  QBanner,
  QBar,
  QBtn,
  QBtnDropdown,
  QBtnGroup,
  QKnob,
} from 'quasar';

installQuasar();

describe('Quasar Avatar', () => {
  it('Deve montar corretamente', async () => {
    mount(QAvatar, {});
  });
});
describe('Quasar Badge', () => {
  it('Deve montar corretamente', async () => {
    mount(QBadge, {});
  });
});
describe('Quasar Banner', () => {
  it('Deve montar corretamente', async () => {
    mount(QBanner, {});
  });
});
describe('Quasar Bar', () => {
  it('Deve montar corretamente', async () => {
    mount(QBar, {});
  });
});
describe('Quasar Button', () => {
  it('Deve montar corretamente', async () => {
    mount(QBtn, {});
  });
});
describe('Quasar Button Dropdown', () => {
  it('Deve montar corretamente', async () => {
    mount(QBtnDropdown, {});
  });
});
describe('Quasar Button Group', () => {
  it('Deve montar corretamente', async () => {
    mount(QBtnGroup, {});
  });
});
describe('Quasar Knob', () => {
  it('Deve montar corretamente', async () => {
    mount(QKnob, {});
  });
});
