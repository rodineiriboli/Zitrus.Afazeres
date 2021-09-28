import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, ListGroup, Row } from 'react-bootstrap';
import { Prioridade } from '../../Enums/Prioridade';
import { PrioridadeUI } from '../../Enums/PrioridadeUI';
import { AfazerModel } from '../../models/Afazer/AfazerModel';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { useAfazerContext } from '../../contexts/AfazerContext';

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

export function Afazer() {

  const history = useHistory();

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
    debugger
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

  const editarAfazer = (key: any) => {
    let afazer = afazerList.filter((f, i) => i === key);

    setAfazerId(afazer[0].id);
    setAfazerNome(afazer[0].descricao);
    setAfazerPrioridade(afazer[0].prioridade);
  }

  return (
    <>
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
      <Container fluid className='mt-3'>
        <Row>
          <Col sm={12} md={12} lg={9}>
            {(afazerList.length > 0) &&
              <Form.Label>Lista de afazeres pendentes</Form.Label>
            }
            <ListGroup>
              {(afazerList.length) ?
                afazerList.map((item, key) => (
                  <ListGroup.Item key={key} className='d-flex pb-0 w-100 justify-content-between align-items-center list-item'
                    variant={item.prioridade === Prioridade.ALTA ? "danger" : item.prioridade === Prioridade.MEDIA ? "light" : "secondary"}
                  >
                    <Col sm={11}>
                      <Form.Check className='me-2' type="checkbox" label={item.descricao} /*onClick={checkClick}*/ />
                    </Col>
                    <Col sm={1}>
                      <FontAwesomeIcon icon={faEdit} className='icon-edit icone' onClick={() => editarAfazer(key)} />
                      {/* <FontAwesomeIcon icon={faEdit} className='icon-edit icone' onClick={() => history.push(`editar/${key}`)} /> */}
                      <FontAwesomeIcon icon={faTimes} className='icon-close icone' onClick={() => setAfazerList(afazerList.filter((f, i) => i !== key))} />
                    </Col>
                  </ListGroup.Item>
                ))
                : <h5>Não há afazeres a ser exibidos</h5>
              }
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}