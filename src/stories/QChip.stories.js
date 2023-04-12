import { QChip } from "quasar";

export default {
  title: "Quasar/Chip",
  component: QChip,
  argTypes: {
    "remove-aria-label": {
      title: "remove-aria-label",
      type: { name: "string", required: false },
      description: "aria-label to be used on the remove icon",
      control: "text",
      table: { category: "Accessibility" },
    },
    icon: {
      title: "icon",
      type: { name: "string", required: false },
      description:
        "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
      control: "text",
      table: { category: "Content" },
    },
    "icon-right": {
      title: "icon-right",
      type: { name: "string", required: false },
      description:
        "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
      control: "text",
      table: { category: "Content" },
    },
    "icon-remove": {
      title: "icon-remove",
      type: { name: "string", required: false },
      description:
        "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
      control: "text",
      table: { category: "Content" },
    },
    "icon-selected": {
      title: "icon-selected",
      type: { name: "string", required: false },
      description:
        "Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)",
      control: "text",
      table: { category: "Content" },
    },
    label: {
      title: "label",
      type: { name: "string", required: false },
      description:
        "Chip's content as string; overrides default slot if specified",
      control: "text",
      table: { category: "Content" },
    },
    tabindex: {
      title: "tabindex",
      type: { name: "string", required: false },
      description: "Tabindex HTML attribute value",
      control: "text",
      table: { category: "General" },
    },
    "model-value": {
      title: "model-value",
      type: { name: "boolean", required: false },
      description:
        "Model of the component determining if QChip should be rendered or not",
      control: "boolean",
      table: { category: "Model" },
    },
    selected: {
      title: "selected",
      type: { name: "boolean", required: false },
      description: "Model for QChip if it's selected or not",
      control: "boolean",
      table: { category: "Model" },
    },
    clickable: {
      title: "clickable",
      type: { name: "boolean", required: false },
      description:
        "Is QChip clickable? If it's the case, then it will add hover effects and emit 'click' events",
      control: "boolean",
      table: { category: "State" },
    },
    removable: {
      title: "removable",
      type: { name: "boolean", required: false },
      description:
        "If set, then it displays a 'remove' icon that when clicked the QChip emits 'remove' event",
      control: "boolean",
      table: { category: "State" },
    },
    disable: {
      title: "disable",
      type: { name: "boolean", required: false },
      description: "Put component in disabled mode",
      control: "boolean",
      table: { category: "State" },
    },
    dense: {
      title: "dense",
      type: { name: "boolean", required: false },
      description: "Dense mode; occupies less space",
      control: "boolean",
      table: { category: "Style" },
    },
    size: {
      title: "size",
      type: { name: "string", required: false },
      description: "QChip size name or a CSS unit including unit name",
      control: "text",
      table: { category: "Style" },
    },
    dark: {
      title: "dark",
      type: { name: "boolean", required: false },
      description: "Notify the component that the background is a dark color",
      control: "boolean",
      table: { category: "Style" },
    },
    color: {
      title: "color",
      type: { name: "string", required: false },
      description: "Color name for component from the Quasar Color Palette",
      control: "text",
      table: { category: "Style" },
    },
    "text-color": {
      title: "text-color",
      type: { name: "string", required: false },
      description:
        "Overrides text color (if needed); Color name from the Quasar Color Palette",
      control: "text",
      table: { category: "Style" },
    },
    square: {
      title: "square",
      type: { name: "boolean", required: false },
      description:
        "Sets a low value for border-radius instead of the default one, making it close to a square",
      control: "boolean",
      table: { category: "Style" },
    },
    outline: {
      title: "outline",
      type: { name: "boolean", required: false },
      description: "Display using the 'outline' design",
      control: "boolean",
      table: { category: "Style" },
    },
    ripple: {
      title: "ripple",
      type: { name: "boolean", required: false },
      description:
        "Configure material ripple (disable it by setting it to 'false' or supply a config object)",
      control: "boolean",
      table: { category: "Style" },
    },
  },
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { QChip },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<q-chip v-bind="args" />',
});
export const Standard = Template.bind({});
Standard.args = {
  color: "primary",
  "text-color": "white",
  icon: "event",
  label: "Add to Calendar",
};
