import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, FormControl, ListGroup, Row } from 'react-bootstrap';
import { Prioridade } from '../../Enums/Prioridade';
import { PrioridadeUI } from '../../Enums/PrioridadeUI';
import { AfazerModel } from '../../models/AfazerModel';
import { Container } from './styles';

export function Afazer() {

  const [afazerNome, setAfazerNome] = useState<string>('');
  const [afazerPrioridade, setAfazerPrioridade] = useState<number>(0);
  const [afazerId, setAfazerId] = useState<number>(0);
  const [afazerList, setAfazerList] = useState<AfazerModel[]>([]);

  const salvarAfazer = () => {
    debugger
    if (afazerPrioridade === 0) return;

    let afazerEdit = afazerList.filter((f, i) => f.id === afazerId);
    var afazer;

    if (afazerEdit.length === 0) {
      if (afazerId === -1) {
        var id = buscarUltimoIdInserido();
        setAfazerId(id);
      }
      setAfazerId(afazerId + 1);

      afazer = [{
        id: afazerId,
        descricao: afazerNome,
        prioridade: afazerPrioridade
      }]
      setAfazerList(afazerList.concat(afazer));
      setAfazerNome('');
      setAfazerPrioridade(0);
      // ordenarPrioridade();
      console.log(`NOVO = id: ${afazerId} - decrição: ${afazerNome} - prioridade: ${afazerPrioridade}`);
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
    // setAfazerList(afazer);

    // debugger
    var index = afazerList.findIndex((f) => f.id === afazerEdit[0].id);


    // var index = afazerList.indexOf(afazerEdit[0].id);
    if (index > -1) {
      afazerList.splice(index, 1);
      setAfazerList(afazerList.concat(afazer));
    }
    // ordenarPrioridade();
    resetarCampos();

    console.log(`EDIÇÃO = id: ${afazerId} - decrição: ${afazerNome} - prioridade: ${afazerPrioridade}`);
    // setCount(count + 1);
  }


  const ordenarPrioridade = () => {
    debugger
    let novaListaOrdenada = afazerList.sort(function (a, b) { return a.prioridade - b.prioridade });
    setAfazerList(novaListaOrdenada);
  }

  const buscarUltimoIdInserido = () => {
    var novoAfazerList = afazerList;
    novoAfazerList.sort(function (a, b) { return a.id - b.id });
    return novoAfazerList[novoAfazerList.length - 1].id;
  }

  const cancelarEdicao = () => {
    resetarCampos();
  }

  const resetarCampos = () => {
    setAfazerId(-1);
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
        <Form>
          <Row>
            <Col sm={12} md={5} lg={4} className="mb-3 mt-3">
              <Form.Group controlId="frmDescricao">
                <Form.Label>Nome</Form.Label>
                <FormControl type="text" placeholder="Insira um Afazer"
                  value={afazerNome}
                  onChange={(e) => setAfazerNome(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={8} md={3} lg={3} className="mb-3 mt-3 flex-md">
              <Form.Group controlId="frmPrioridade">
                <Form.Label>Prioridade</Form.Label>
                <Form.Select
                  value={afazerPrioridade}
                  onChange={(e: any) => setAfazerPrioridade(parseInt(e.target.value))}
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
                <Button variant="primary" onClick={salvarAfazer}>Salvar</Button>
              </Form.Group>
            </Col>
            <Col sm={2} md={2} lg={1} className="mb-3 mt-5 d-grid">
              <Form.Group controlId="btnEnviar" className="d-grid gap-2">
                <Button variant="danger" onClick={cancelarEdicao}>Cancelar</Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container fluid className='mt-3'>
        <Row>
          <Col sm={12} md={12} lg={9}>
            <Form.Label>Lista de afazeres pendentes</Form.Label>
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