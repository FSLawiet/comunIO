import { QCard } from "quasar";

export default {
  title: "Quasar/Card",
  component: QCard,
  argTypes: {
    tag: {
      title: "tag",
      type: { name: "string", required: false },
      description: "HTML tag to use",
      defaultValue: "div",
      control: "select",
      options: ["div", "span", "div", "form"],
      table: {
        category: "Content",
      },
    },
    dark: {
      title: "dark",
      type: { name: "boolean", required: false },
      description: "Notify the component that the background is a dark color",
      control: "boolean",
      table: {
        category: "Style",
      },
    },
    square: {
      title: "square",
      type: { name: "boolean", required: false },
      description: "Removes border-radius so borders are squared",
      control: "boolean",
      table: {
        category: "Style",
      },
    },
    flat: {
      title: "flat",
      type: { name: "boolean", required: false },
      description: "Applies a 'flat' design (no default shadow)",
      control: "boolean",
      table: {
        category: "Style",
      },
    },
    bordered: {
      title: "bordered",
      type: { name: "boolean", required: false },
      description: "Applies a default border to the component",
      control: "boolean",
      table: {
        category: "Style",
      },
    },
  },
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { QCard },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<q-card v-bind="args">CARD AREA</q-card>',
});
export const Standard = Template.bind({});
