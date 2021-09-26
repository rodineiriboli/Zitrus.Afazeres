// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
// import { Home } from './pages/Home';
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
          {/* <Navbar.Brand className="d-flex" href="https://github.com/rodineiriboli/Zitrus.Afazeres" target='_blank'>
              <FontAwesomeIcon icon={faGithub} className='icon-git' />
            </Navbar.Brand> */}
        </Container>
      </Navbar>
      <Routes />
    </>
  );
}

export default App;
