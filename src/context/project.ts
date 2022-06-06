import { createContext, Dispatch } from "react";

import projectReducer from "../store/index";
import ProjectDefinition from "../interfaces/Project";

export const ProjectReducerContext = createContext<Dispatch<projectReducer.PassedActions> | undefined>(undefined);
export const ProjectContext = createContext<ProjectDefinition | undefined>(undefined);
