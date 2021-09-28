import { Container as ContainerBootstrap } from "react-bootstrap";
import styled from "styled-components";

export const Container = styled(ContainerBootstrap)`
  .alert-error {
    color: rgb(132, 32, 41);
  }

  @media screen and (max-width: 575px) {
    .btn {
      margin-top: -2rem !important;
    }
  }

  @media screen and (max-width: 767px) {
    .flex-md {
      margin-top: 0 !important;
    }
    .btn {
      margin-top: -1rem;
    }
  }
`;
