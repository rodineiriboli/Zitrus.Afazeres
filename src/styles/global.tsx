import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
.icon-git {
    hover: #def393;
    font-size: 30px;
  }
  .titulo {
    color: rgb(34, 28, 53);
    font-size: 30px;
    font-weight: bold;
  }
  h1 {
    color: red;
  }
  .navbar {
    background: #def393;
    color: red;
  }
`;
export default GlobalStyle;