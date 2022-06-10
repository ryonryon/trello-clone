import { ComponentStory } from "@storybook/react";

import { TestRendererWithProjectContext } from "../../utils/testRendererWithContext";
import AdditionColumn from ".";

export default {
  title: "AdditionColumn",
  component: AdditionColumn,
};

// mock up fetch() to prevent storybook to crash because of node's version incompatibility
global.fetch = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: 200,
        body: {
          id: 1,
          name: "test",
          sort: 1,
          project: {},
        },
      }),
  }) as unknown as Promise<Response>;

const Template: ComponentStory<typeof AdditionColumn> = () => (
  <TestRendererWithProjectContext>
    <AdditionColumn />
  </TestRendererWithProjectContext>
);

export const Basic = Template.bind({});
