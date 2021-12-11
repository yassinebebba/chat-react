import React from 'react';
import {Container, Button, Nav, Navbar} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import react from 'react';

class Chat extends react.Component
{
  constructor(props)
  {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout()
  {
    localStorage.setItem('token', '')
    localStorage.setItem('is_authenticated', 'false')
    this.props.history.push('/login')
  }

  render()
  {
    return (
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand>Bebba</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'/>
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link><Link to='/'>Chat</Link></Nav.Link>
            </Nav>
            <Button variant='outline-danger' onClick={this.logout}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Chat);
