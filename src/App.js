import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import react from 'react';
import Auth from './Auth';
import Register from './components/Register/Register';


class App extends react.Component
{
  componentWillMount()
  {
    if(localStorage.getItem('is_authenticated') !== 'true') Auth.force_logout(this.props.history.push);
  }

  render()
  {
    return (
      <Router>
        <Switch>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route exact path='/register'>
            <Register/>
          </Route>
          <Route path='/'>
            <Navigation/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
