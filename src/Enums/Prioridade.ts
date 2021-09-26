import { PrioridadeUI } from "./PrioridadeUI";

export enum Prioridade {
  BAIXA = 1,
  MEDIA = 2,
  ALTA = 3,
}

//Mapeia a Prioridade  da interface para numérico
export const prioridadeMap: { [id: string]: Prioridade } = {
  [PrioridadeUI.BAIXA]: Prioridade.BAIXA,
  [PrioridadeUI.MEDIA]: Prioridade.MEDIA,
  [PrioridadeUI.ALTA]: Prioridade.ALTA,
};
