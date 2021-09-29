import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { Container } from "../styles";
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom'
import { Prioridade } from "../../../Enums/Prioridade";
import { useAfazerContext } from '../../../contexts/AfazerContext';

export function Lista() {
  const history = useHistory();
  const { afazerNome, afazerId, afazerPrioridade, afazerList, setAfazerList, setAfazerId, setAfazerNome, setAfazerPrioridade } = useAfazerContext();

  const editarAfazer = (key: any) => {
    var afazer = afazerList.filter((f, i) => i === key);
    history.push(`editar/${key}`)
    setAfazerId(afazer[0].id);
    setAfazerNome(afazer[0].descricao);
    setAfazerPrioridade(afazer[0].prioridade);
    console.log(`Id: ${afazerId}, nome: ${afazerNome}, Prioridade: ${afazerPrioridade}`);
  }

  return (
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
  );
}