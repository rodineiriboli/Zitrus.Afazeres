import React from "react";
import { Container, Box } from "./styles";

type CheckboxContainerProps = {
  labelCheckboxContainer: string;
  children: React.ReactNode;
}

export function CheckboxContainer({ labelCheckboxContainer, children }: CheckboxContainerProps) {
  return (
    <Container className="d-flex flex-column">
      <label>{labelCheckboxContainer}</label>
      <Box className="d-flex flex-row h-100 align-items-start">
        {children}
      </Box>
    </Container>
  );
}
