import Routes from './routes';
import GlobalStyle from './styles/global';
import './components/FontAwesomeIcons';
import Zytrus from '../src/assets/zytrus_img.png';
import { Container, Navbar } from 'react-bootstrap';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand href="https://zitrus.com.br" target='_blank'>
            <img
              src={Zytrus}
              width="60%"
              height="60%"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Text className='titulo justify-content-start'>Afazeres</Navbar.Text>
        </Container>
      </Navbar>
      <Routes />
    </>
  );
}

export default App;
