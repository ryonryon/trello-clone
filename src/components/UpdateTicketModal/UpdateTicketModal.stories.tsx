import { ComponentStory } from "@storybook/react";

import UpdateTicketModal from "./UpdateTicketModal";

export default {
  title: "UpdateTicketModal",
  component: UpdateTicketModal,
  argTypes: {
    onClose: { action: "onClose clicked" },
  },
  args: {
    isOpen: true,
    ticket: {
      id: 999,
      name: "update ticket modal test title",
      description: "update ticket modal test description",
    },
  },
};

const Template: ComponentStory<typeof UpdateTicketModal> = (args) => <UpdateTicketModal {...args} />;

export const Basic = Template.bind({});
