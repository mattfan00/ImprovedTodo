import React, { Component } from 'react';
import './App.css';

import Lists from './Components/Lists/Lists'
import LoginPage from './Components/Index/LoginPage'
import { loadUser } from './apiCalls/apiUser'

import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      isLoggedIn: false,
      loading: true,
      currentUser: null,
      error: null
    }

    this.loadUser = this.loadUser.bind(this)
    this.logout = this.logout.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  componentDidMount() {
    this.loadUser()
  }

  async loadUser() {
    let response = await loadUser()
    console.log(response)

    if (response.status) {
      this.setState({
        isLoggedIn: false,
        loading: false,
      })
    } else {
      this.setState({
        isLoggedIn: true,
        loading: false,
        currentUser: response,
        error: null
      })
    }
  }

  signIn(result) {
    localStorage.setItem('token', result.token)
    this.setState({ 
      isLoggedIn: true,
      loading: false, 
      currentUser: result.user
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.setState({
      isLoggedIn: false,
      loading: false,
      currentUser: null
    })
  }

  render() {
    const { loading, isLoggedIn, currentUser, error } = this.state
    return (
      <div>
        { !loading ? 
          <Router>
            <Switch>
              <Route path='/login' render={props => (
                  isLoggedIn
                  ? <Redirect to='/' />
                  : <LoginPage signIn={this.signIn} />
                )} 
              />
              <PrivateRoute path='/' isLoggedIn={isLoggedIn} user={currentUser} logout={this.logout} component={Lists} />
            </Switch>
        </Router> 
          : '' }
      </div>
    )
  }
  
}

function PrivateRoute({ component: Component, ...rest }) {
  // console.log(rest)
  return (
    <Route {...rest} render={props => (
      rest.isLoggedIn 
        ? <Component {...props} user={rest.user} logout={rest.logout} />
        : <Redirect to='/login' />
      )}
    />
  )
}

export default App;
