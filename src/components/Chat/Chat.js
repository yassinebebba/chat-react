import React from 'react';
import react from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {WSS_BASEURL} from '../../env';

class Chat extends react.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      dialog: [],
      message: '',
    }
    this.form_ref = React.createRef()

    this.chat_socket = null;
    this.logout = this.logout.bind(this);
    this.send = this.send.bind(this);
    this.get_msg = this.get_msg.bind(this);
  }


  componentWillMount()
  {
    this.chat_socket = new WebSocket(WSS_BASEURL + 'baba/');
    this.chat_socket.onmessage = this.get_msg

    this.chat_socket.onclose = function (e)
    {
      console.error('Chat socket closed unexpectedly');
    };
  }

  get_msg(e)
  {
    const data = JSON.parse(e.data);
    this.state.dialog = [...this.state.dialog, data.message];
    this.state.message = ''
    this.forceUpdate()
  }

  send(e)
  {
    e.preventDefault()
    e.target[0].value = ''
    this.chat_socket.send(JSON.stringify({
      'message': this.state.message
    }));
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
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Chat</Card.Title>
          <Card.Text>
            {this.state.dialog.map((msg, index) =>
            {
              return (
                <>
                  <h6>{msg}</h6>
                  <hr/>
                </>
              )
            })}
          </Card.Text>
          <Form onSubmit={(e) => this.send(e)}>
            <Form.Group ref={this.form_ref} className="mb-3" controlId="formBasicPassword">
              <Form.Control as="textarea" placeholder="Type..." onChange={(e) => this.state.message = e.target.value}/>
            </Form.Group>
            <Button variant="primary" type='submit'>Send</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Chat);
