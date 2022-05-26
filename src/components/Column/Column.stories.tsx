import { ComponentStory } from "@storybook/react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import ColumnDefinition from "../../interfaces/Column";
import { GrabbedItemContext, GRABBED_ITEM_CATEGORY } from "../Project/DnDColumnList";
import Column from "./Column";

const mockedColumnBody: ColumnDefinition = {
  id: 1,
  name: "Column",
  order: 1,
  tickets: [
    { id: 1, name: "test ticket 1", description: "", order: 0 },
    { id: 2, name: "test ticket 2", description: "", order: 1 },
    { id: 3, name: "test ticket 3", description: "", order: 2 },
    { id: 4, name: "test ticket 4", description: "", order: 3 },
  ],
};

export default {
  title: "Column",
  component: Column,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
  args: {
    title: "test Column",
    column: { ...mockedColumnBody, tickets: [] },
  },
};

const Template: ComponentStory<typeof Column> = (args) => (
  <BackGround>
    <Column {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

export const WithTickets = Template.bind({});

WithTickets.args = {
  ...Basic.args,
  column: mockedColumnBody,
};

export const Draggable: ComponentStory<typeof Column> = (args) => (
  <GrabbedItemContext.Provider value={GRABBED_ITEM_CATEGORY.ROW_TICKET}>
    <DragDropContext onDragEnd={() => null}>
      <BackGround>
        <Column {...args} />
      </BackGround>
    </DragDropContext>
  </GrabbedItemContext.Provider>
);

Draggable.args = {
  ...Basic.args,
  column: mockedColumnBody,
  draggable: true,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
