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
  const [afazerPrioridade, setAfazerPrioridade] = useState<number>(2);
  const [afazerList, setAfazerList] = useState<AfazerModel[]>([]);
  const [count, setCount] = useState<number>(1);

  const salvarAfazer = () => {
    var afazer = [{
      id: count,
      descricao: afazerNome,
      prioridade: afazerPrioridade
    }]
    setAfazerList(afazerList.concat(afazer));
    setCount(count + 1);
  }

  const editarAfazer = () => {
    alert('editar');
  }

  return (
    <>
      <Container fluid>
        <Form>
          <Row>
            <Col sm={12} md={6} lg={4} className="mb-3 mt-3">
              <Form.Group controlId="frmDescricao">
                <Form.Label>Nome</Form.Label>
                <FormControl type="text" placeholder="Insira um Afazer"
                  onChange={(e) => setAfazerNome(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={10} md={4} lg={3} className="mb-3 mt-3 flex-md">
              <Form.Group controlId="frmPrioridade">
                <Form.Label>Prioridade</Form.Label>
                <Form.Select onChange={(e: any) => setAfazerPrioridade(parseInt(e.target.value))}>
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
          </Row>
        </Form>
      </Container>
      <Container fluid className='mt-3'>
        <Row>
          <Col sm={12} md={12} lg={8}>
            <Form.Label>Lista de afazeres pendentes</Form.Label>
            <ListGroup>
              {(afazerList.length) ?
                afazerList.map((item, key) => (
                  <ListGroup.Item key={key} className='d-flex pb-0 w-100 justify-content-between align-items-center list-item' variant="info">
                    <Col sm={11}>
                      <Form.Check className='me-2' type="checkbox" label={item.descricao} /*onClick={checkClick}*/ />
                    </Col>
                    <Col sm={1}>
                      <FontAwesomeIcon icon={faEdit} className='icon-edit icon' onClick={editarAfazer} />
                      <FontAwesomeIcon icon={faTimes} className='icon-close icon' onClick={() => setAfazerList(afazerList.filter((f, i) => i !== key))} />
                      {/* </div> */}
                    </Col>
                  </ListGroup.Item>
                ))
                : <h5>Não há afazeres a ser executados</h5>
              }
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}