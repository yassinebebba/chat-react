import React from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import './Register.css'
import register_icon from './user.png'
import background from './register.svg'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import react from 'react';
import {REGISTER, VALIDATE_OTP} from '../../env';

class Register extends react.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      show: false,
      phone_number: '',
      password: '',
      otp: ''
    };
    this.send_otp = this.send_otp.bind(this);
    this.verify = this.verify.bind(this);
    localStorage.setItem('token', '')
    localStorage.setItem('is_authenticated', 'false')
  }

  send_otp()
  {
    axios.post(REGISTER, { phone_number: this.state.phone_number, password: this.state.password }).then(res =>
    {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('is_authenticated', 'true')
    }).catch(error =>
    {
      this.state.show = true;
    })
  }

  verify()
  {
    axios.post(VALIDATE_OTP, {
      phone_number: this.state.phone_number,
      password: this.state.password,
      otp: Number.parseInt(this.state.otp)
    }).then(res =>
    {
      this.props.history.push('/login');
    }).catch(error =>
    {
      console.log(error)
      console.log(JSON.parse(JSON.stringify(error)))
      this.state.show = true;
    })
  }

  render()
  {
    return (
      <Container className='mt-5'>
        <Row>
          <Col lg={4} md={6} sm={12} className='text-center mt-5 p-3'>
            <img className='icon-img' src={register_icon} alt='icon'/>
            <h3>Register</h3>
            {this.state.show === true && <Alert variant='danger'>Registration failed</Alert>}
            <Form>
              <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Enter phone number'
                              onChange={value => this.setState({ phone_number: value.target.value })}/>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Control type='password' placeholder='Password'
                              onChange={value => this.setState({ password: value.target.value })}/>
              </Form.Group>
              <Button variant='primary btn-block' className='mb-3' size='lg' onClick={this.send_otp}>Send OTP</Button>
              <Form.Group className='mb-3' controlId='formGroupPassword'>
                <Form.Control type='text' placeholder='OTP'
                              onChange={value => this.setState({ otp: value.target.value })}/>
              </Form.Group>
              <Button variant='primary btn-block' className='m-1' size='lg' onClick={this.verify}>Verify &
                Register</Button>
            </Form>
            <Button variant='primary btn-block' className='m-1' size='lg'
                    onClick={() => this.props.history.push('/login')}>Login</Button>
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className='w-100' src={background} alt='background'/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
