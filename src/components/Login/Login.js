import React from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import './Login.css'
import login_icon from './user.png'
import background from './login.svg'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import react from 'react';

class Login extends react.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      show: false,
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    localStorage.setItem('token', '')
    localStorage.setItem('is_authenticated', 'false')
  }

  login()
  {
    // axios.post(LOGIN, { email: this.state.email, password: this.state.password }).then(res =>
    // {
    //   localStorage.setItem('token', res.data.token)
    //   localStorage.setItem('is_authenticated', 'true')
    //   this.props.history.push('/');
    // }).catch(error =>
    // {
    //   this.state.show = true;
    // })
  }

  reset_password()
  {
  }

  render()
  {
    return (
      <Container className='mt-5'>
        <Row>
          <Col lg={4} md={6} sm={12} className='text-center mt-5 p-3'>
            <img className='icon-img' src={login_icon} alt='icon'/>
            <h3>Admin Login</h3>
            {this.state.show === true && <Alert variant='danger'>Wrong Email or password</Alert>}
            <Form>
              <Form.Group className='mb-3' controlId='formGroupEmail'>
                <Form.Control type='email' placeholder='Enter email'
                              onChange={value => this.setState({ email: value.target.value })}/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGroupPassword'>
                <Form.Control type='password' placeholder='Password'
                              onChange={value => this.setState({ password: value.target.value })}/>
              </Form.Group>
              <Button variant='primary btn-block' size='lg' onClick={this.login}>Login</Button>
              <div className='text-left mt-3'>
                <a href='/' onClick={this.reset_password}><small className='reset ml-2'>Reset Password</small></a>
              </div>
            </Form>
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className='w-100' src={background} alt='background'/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
