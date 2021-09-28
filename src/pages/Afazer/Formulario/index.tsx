import React, { useEffect } from 'react';
import { Prioridade } from '../../../Enums/Prioridade';
import { PrioridadeUI } from '../../../Enums/PrioridadeUI';
import { Container } from '../styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAfazerContext } from '../../../contexts/AfazerContext';
import { Button, Col, FormControl, Row, Form } from 'react-bootstrap';


interface IFormInputs {
  nome: string
  prioridade: number
}

// Schema de validação do formulário
const schema = yup.object({
  nome:
    yup.string()
      .required('O nome do afazer não pode ser vazio')
      .max(30, 'O nome do afazer deve conter até 30 caracteres')
      .min(5, 'O nome do afazer deve ter pelo menos 5 caracteres')
      .ensure(),

  prioridade:
    yup.number()
      .integer()
      .required('A prioridade deve ser escolhida')
      .min(1, 'Escolha uma prioridade'),
}).required();

export function Formulario() {

  const {
    afazerNome,
    setAfazerNome,
    afazerPrioridade,
    setAfazerPrioridade,
    afazerId,
    setAfazerId,
    afazerList,
    setAfazerList
  } = useAfazerContext();

  useEffect(() => {
    resetarCampos();
    ordenarPrioridade();
  }, [afazerList]);

  //Validação do formulário
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  //Salva um registro de afazer
  const salvarAfazer = () => {
    let afazerEdit = afazerList.filter((f, i) => f.id === afazerId);
    var afazer;

    if (afazerEdit.length === 0) {
      afazer = [{
        id: afazerId,
        descricao: afazerNome,
        prioridade: afazerPrioridade
      }]
      setAfazerList(afazerList.concat(afazer));
      setAfazerId(afazerId + 1);
      return;
    }

    //Edição
    setAfazerId(afazerId);
    setAfazerNome(afazerNome);
    setAfazerPrioridade(afazerPrioridade);

    afazer = [{
      id: afazerId,
      descricao: afazerNome,
      prioridade: afazerPrioridade
    }]

    var index = afazerList.findIndex((f) => f.id === afazerEdit[0].id);
    if (index > -1) {
      afazerList.splice(index, 1);
      setAfazerList(afazerList.concat(afazer));
    }
    resetarCampos();
  }

  const ordenarPrioridade = () => {
    afazerList.sort(function (a, b) { return b.prioridade - a.prioridade });
  }

  const buscarUltimoIdInserido = () => {
    if (afazerList.length > 0) {
      var novoAfazerList = afazerList;
      novoAfazerList.sort(function (a, b) { return a.id - b.id });
      return novoAfazerList[novoAfazerList.length - 1].id;
    }
    return 0;
  }

  const cancelarEdicao = () => {
    resetarCampos();
  }

  const resetarCampos = () => {
    setAfazerId(buscarUltimoIdInserido() + 1);
    setAfazerNome('');
    setAfazerPrioridade(0);
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(salvarAfazer)}>
        <Row>
          <Col sm={12} md={5} lg={4} className="mb-3 mt-3">
            <Form.Group controlId="frmDescricao">
              <Form.Label>Nome</Form.Label>
              <FormControl type="text" placeholder="Insira um Afazer"
                {...register("nome")}
                value={afazerNome}
                onChange={(e) => setAfazerNome(e.target.value)}
                isInvalid={!!errors.nome}
              />
            </Form.Group>
          </Col>
          <Col sm={8} md={3} lg={3} className="mb-3 mt-3 flex-md">
            <Form.Group controlId="frmPrioridade">
              <Form.Label>Prioridade</Form.Label>
              <Form.Select
                {...register("prioridade")}
                value={afazerPrioridade}
                onChange={(e: any) => setAfazerPrioridade(parseInt(e.target.value))}
                isInvalid={!!errors.prioridade}
              >
                <option value={0}>Selecione a prioridade</option>
                <option value={Prioridade.BAIXA}>{PrioridadeUI.BAIXA}</option>
                <option value={Prioridade.MEDIA}>{PrioridadeUI.MEDIA}</option>
                <option value={Prioridade.ALTA}>{PrioridadeUI.ALTA}</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={2} md={2} lg={1} className="mb-3 mt-5 d-grid">
            <Form.Group controlId="btnEnviar" className="d-grid gap-2">
              <Button type="submit" variant="primary">Salvar</Button>
            </Form.Group>
          </Col>
          <Col sm={2} md={2} lg={1} className="mb-3 mt-5 d-grid">
            <Form.Group controlId="btnEnviar" className="d-grid gap-2">
              <Button variant="danger" onClick={cancelarEdicao}>Cancelar</Button>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={5} lg={4}>
            <span className='alert-error' >{errors.nome?.message}</span>
          </Col>
          <Col sm={8} md={3} lg={3} className="flex-md">
            <span className='alert-error'>{errors.prioridade?.message}</span>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}