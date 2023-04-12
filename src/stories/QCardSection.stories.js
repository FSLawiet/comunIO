import { QCardSection } from "quasar";

export default {
  title: "Quasar/CardSection",
  component: QCardSection,
  argTypes: {
    horizontal: {
      title: "horizontal",
      type: { name: "boolean", required: false },
      description:
        "Display a horizontal section (will have no padding and can contain other QCardSection)",
      control: "boolean",
      table: { category: "Content" },
    },
    tag: {
      title: "tag",
      type: { name: "string", required: false },
      defaultValue: "div",
      description: "HTML tag to use",
      control: "select",
      options: ["div", "span", "div", "form"],
      table: { category: "Content" },
    },
  },
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { QCardSection },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<q-card><q-card-section v-bind="args">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</q-card-section></q-card>',
});
export const Standard = Template.bind({});
