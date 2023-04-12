import { QChatMessage } from "quasar";

export default {
  title: "Quasar/ChatMessage",
  component: QChatMessage,
  argTypes: {
    "label-html": {
      title: "label-html",
      type: { name: "boolean", required: false },
      description:
        "Render the label as HTML; This can lead to XSS attacks so make sure that you sanitize the message first",
      control: "boolean",
      table: { category: "Behaviour" },
    },
    "name-html": {
      title: "name-html",
      type: { name: "boolean", required: false },
      description:
        "Render the name as HTML; This can lead to XSS attacks so make sure that you sanitize the message first",
      control: "boolean",
      table: { category: "Behaviour" },
    },
    "text-html": {
      title: "text-html",
      type: { name: "boolean", required: false },
      description:
        "Render the text as HTML; This can lead to XSS attacks so make sure that you sanitize the message first",
      control: "boolean",
      table: { category: "Behaviour" },
    },
    "stamp-html": {
      title: "stamp-html",
      type: { name: "boolean", required: false },
      description:
        "Render the stamp as HTML; This can lead to XSS attacks so make sure that you sanitize the message first",
      control: "boolean",
      table: { category: "Behaviour" },
    },
    sent: {
      title: "sent",
      type: { name: "boolean", required: false },
      description: "Render as a sent message (so from current user)",
      control: "boolean",
      table: { category: "Content" },
    },
    label: {
      title: "label",
      type: { name: "string", required: false },
      description: "Renders a label header/section only",
      control: "text",
      table: { category: "Content" },
    },
    name: {
      title: "name",
      type: { name: "string", required: false },
      description: "Author's name",
      control: "text",
      table: { category: "Content" },
    },
    avatar: {
      title: "avatar",
      type: { name: "string", required: false },
      description: "URL to the avatar image of the author",
      control: "text",
      table: { category: "Content" },
    },
    text: {
      title: "text",
      type: { name: "object", required: false },
      description:
        "Array of strings that are the message body. Strings are not sanitized (see details in docs)",
      control: "object",
      table: { category: "Content" },
    },
    stamp: {
      title: "stamp",
      type: { name: "string", required: false },
      description: "Creation timestamp",
      control: "text",
      table: { category: "Content" },
    },
    "bg-color": {
      title: "bg-color",
      type: { name: "string", required: false },
      description:
        "Color name (from the Quasar Color Palette) for chat bubble background",
      control: "text",
      table: { category: "Style" },
    },
    "text-color": {
      title: "text-color",
      type: { name: "string", required: false },
      description:
        "Color name (from the Quasar Color Palette) for chat bubble text",
      control: "text",
      table: { category: "Style" },
    },
    size: {
      title: "size",
      type: { name: "string", required: false },
      description: "1-12 out of 12 (same as col-*)",
      control: "number",
      table: { category: "Style" },
    },
  },
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { QChatMessage },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<q-chat-message v-bind="args" />',
});
export const Standard = Template.bind({});
Standard.args = {
  text: ["hey, how are you?"],
  sent: true,
};
