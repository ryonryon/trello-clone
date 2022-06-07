import { ComponentStory } from "@storybook/react";

import { TestRendererWithContext } from "../../utils/testRendererWithContext";
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
  <TestRendererWithContext>
    <AdditionColumn />
  </TestRendererWithContext>
);

export const Basic = Template.bind({});
