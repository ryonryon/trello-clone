import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  font-family: Open Sans, Montserrat, Roboto
`;

export default function App(): JSX.Element {
  return (
    <div>
      <GlobalStyle />
      Hello world
    </div>
  );
}
