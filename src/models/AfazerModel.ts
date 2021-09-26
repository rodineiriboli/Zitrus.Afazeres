import { Prioridade } from "../Enums/Prioridade";

export class AfazerModel {
  public id: number = 0;
  public descricao: string = "";
  public prioridade: Prioridade = Prioridade.MEDIA;
}
