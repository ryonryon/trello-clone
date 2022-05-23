import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import ProjectDefinition from "../../interfaces/Project";

import Project from "./Project";

const mockedProject: ProjectDefinition = {
  id: 1,
  name: "First Project",
  columns: [
    {
      id: 1,
      name: "This is the first column",
      order: 1,
      tickets: [
        { id: 1, name: "This is the first ticket", description: "Yay this is the first one", order: 1 },
        { id: 6, name: "H. Rackham", description: "test", order: 2 },
      ],
    },
    {
      id: 2,
      name: "Second Column",
      order: 2,
      tickets: [
        { id: 2, name: "What is Lorem Ipsum?", description: "test", order: 1 },
        { id: 3, name: "Why do we use it?", description: "test", order: 2 },
        { id: 4, name: "Where does it come from?", description: "test", order: 3 },
      ],
    },
    {
      id: 3,
      name: "Third Column",
      order: 3,
      tickets: [{ id: 5, name: "Where can I get some?", description: "test", order: 3 }],
    },
  ],
};

export default {
  title: "Project",
  component: Project,
};

const Template: ComponentStory<typeof Project> = (args) => (
  <BackGround>
    <Project {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

Basic.args = {
  project: mockedProject,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
