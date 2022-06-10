import { ComponentStory } from "@storybook/react";

import { TestRendererWithProjectContext } from "../../utils/testRendererWithContext";
import TicketDetailModal from "./TicketDetailModal";

export default {
  title: "TicketDetailModal",
  component: TicketDetailModal,
  argTypes: {
    onClose: { action: "onClose clicked" },
  },
  args: {
    isOpen: true,
    ticketId: 999,
  },
};

const Template: ComponentStory<typeof TicketDetailModal> = (args) => (
  <TestRendererWithProjectContext>
    <TicketDetailModal {...args} />
  </TestRendererWithProjectContext>
);

export const Basic = Template.bind({});
