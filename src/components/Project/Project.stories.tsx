import { ComponentStory } from "@storybook/react";

import { MOCKED_PROJECT } from "./constants";
import Project from "./Project";

export default {
  title: "Project",
  component: Project,
};

const Template: ComponentStory<typeof Project> = (args) => <Project {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  project: MOCKED_PROJECT,
};
