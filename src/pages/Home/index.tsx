// import React from 'react';
import { CloseButton, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { Container as HomeContainer } from './styles';
// import Zytrus from '../../assets/zytrus_img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import Checkbox from '../../components/Checkbox';
// import { CheckboxContainer } from '../../components/CheckboxContainer';
import { Afazer } from '../Afazer';
import { useHistory, useParams } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function Home() {

  // Navegação e parâmetros da rota
  const history = useHistory();
  const { id: editId } = useParams<{ id: string }>();
  const returnUrl = `/editar/${editId ? editId : ''}`;
  // const test = () => { "bla"; }
  const teste = 'BLABSSLAAAADDDA';


  const checkClick = () => {
    console.log('alerta click');
  }

  /*
  INFIMA = dark,
  BAIXA = light,
  MEDIA = primary,
  ALTA = warning
  URGENTE = danger
  */
  return (
    <HomeContainer>
      {/* Form de inserção de afazeres */}
      <Afazer />

      {/* Listagem dos afazeres inseridos */}
      {/* <Container fluid className='mt-3'>
        <Row>
          {(2 !== 2) ?
            <Col sm={12} md={12} lg={8}>
              <Form.Label>Lista de afazeres pendentes</Form.Label>
              <ListGroup>
                <ListGroup.Item className='d-flex pb-0 w-100 justify-content-between align-items-center list-item' variant="info">
                  <Form.Check className='me-2' type="checkbox" label={teste} onClick={checkClick} />
                  <FontAwesomeIcon icon={faTimes} className='icon' />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            : <h5>Não há afazeres a ser executados</h5>
          }
        </Row>
      </Container> */}
    </HomeContainer>
  )
}