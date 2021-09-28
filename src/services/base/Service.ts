import { AxiosInstance, AxiosPromise } from "axios";
import { Model } from "../../models/base/Model";
import { backendApi } from "../base/Api";

export default class Service<Type extends Model> {
  protected api: AxiosInstance;

  constructor(protected resource: string) {
    this.api = backendApi;
  }

  /**
   * Utilizado para buscar um único objeto, a partido do seu id
   * @param id Id do objeto a ser buscado
   * @returns Retorna uma promise com o objeto solicitado
   */
  public get(id: number | string): AxiosPromise<Type> {
    return this.api.get(`/${this.resource}/${id}`);
  }

  /**
   * Utilizado para listar ou filtrar documentos
   * @param params Objeto utilizado para filtrar a lista, se omitido lista tudo
   * @returns Retorna uma promise que irá conter uma lista de objetos
   */
  public getAll(params?: any): AxiosPromise<Type[]> {
    return this.api.get(`/${this.resource}`, {
      params,
    });
  }

  /**
   * Utilizado para cadastrar novos objetos
   * @param data Objeto para ser cadastrado
   * @returns Retorna um promise que retornará o objeto criado
   */
  public post(data: Type): AxiosPromise<Type> {
    return this.api.post(`/${this.resource}`, data);
  }

  /**
   * Utilizado para atualizar um objeto
   * @param id Id do objeto a ser atualizado
   * @param data O objeto com as alterações
   * @returns Retorna uma promise com o objeto alterado
   */
  public put(data: Type): AxiosPromise<Type> {
    return this.api.put(`/${this.resource}/${data.id}`, data);
  }

  /**
   * Utilizado para deletar um objeto
   * @param id Id do objeto a ser deletado
   * @returns Retorna uma promise com a repsosta do servidor (utilizar os status HTTP para determinar se o objeto foi excluído ou não)
   */
  public delete(id: number | string): AxiosPromise {
    return this.api.delete(`/${this.resource}/${id}`);
  }
}
