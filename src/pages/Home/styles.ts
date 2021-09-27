import styled from "styled-components";
// import { Container as BootstrapContainer } from "react-bootstrap";

// export const Container = styled(BootstrapContainer)`
export const Container = styled.div`
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

  .icon-close {
    color: rgb(232, 17, 35);
  }

  .icon-edit {
    color: #ff8533;
    margin-top: -3px;
  }

  .icone {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    height: 2rem;
    cursor: pointer;
  }

  .list-item {
    padding-bottom: 0.3rem !important;

    // Configurações para texto com reticências
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h5 {
    color: rgb(133, 133, 133);
  }
`;
