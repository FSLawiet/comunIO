import { QCardActions } from "quasar";
import { action } from "@storybook/addon-actions";

export default {
  title: "Quasar/CardActions",
  component: QCardActions,
  argTypes: {
    align: {
      title: "align",
      type: { name: "string", required: false },
      description: "Specify how to align the actions",
      control: "select",
      options: [
        "left",
        "center",
        "right",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      table: { category: "Content" },
    },
    vertical: {
      title: "vertical",
      type: { name: "boolean", required: false },
      description: "Display actions one below the other",
      control: "boolean",
      table: { category: "Content" },
    },
  },
};
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { QCardActions },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<q-card><q-card-section><div class="text-h6">Our Changing Planet</div><div class="text-subtitle2">by John Doe</div></q-card-section><q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</q-card-section><q-separator dark /><q-card-actions v-bind="args"><q-btn flat @click="action">Action 1</q-btn><q-btn flat @click="action">Action 2</q-btn></q-card-actions></q-card>',
  methods: {
    action: action("clicked!"),
  },
});
export const Standard = Template.bind({});
