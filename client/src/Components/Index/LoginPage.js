import React, { Component } from 'react'

import { login } from '../../apiCalls/apiUser'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  

  async handleSubmit(e) {
    e.preventDefault()

    let result = await login(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
    this.props.signIn(result)
  }

  handleUsername(e) {
    const username = e.target.value
    this.setState({ username })
  }

  handlePassword(e) {
    const password = e.target.value
    this.setState({ password })
  }

  render() {
    const { username, password } = this.state
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input value={username} onChange={this.handleUsername}></input>
          <input value={password} type="password" onChange={this.handlePassword}></input>
          <button>Login</button> 
        </form>
      </div>
      
    )
  }
}

export default LoginPage