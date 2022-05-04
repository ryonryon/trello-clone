import Project from "../interfaces/Project";

export default function getProject(id: number): Project {
  return {
    id: id,
    name: "trello clone",
    columns: [
      {
        id: 1,
        name: "to do",
        order: 1,
        tickets: [
          {
            id: 12341,
            name: "test 1",
            description: "test 1 description",
            order: 1,
          },
          {
            id: 12342,
            name: "test 2",
            description: "test 2 description",
            order: 2,
          },
          {
            id: 12343,
            name: "test 3",
            description: "test 3 description",
            order: 3,
          },
        ],
      },
      {
        id: 2,
        name: "done",
        order: 2,
        tickets: [
          {
            id: 12344,
            name: "test 4",
            description: "test 4 description",
            order: 4,
          },
          {
            id: 12345,
            name: "test 5",
            description: "test 5 description",
            order: 5,
          },
        ],
      },
    ],
  };
}
