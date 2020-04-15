import React, { Component } from 'react'
import { register } from '../../apiCalls/apiUser'
 
import { Link } from 'react-router-dom'

class RegisterPage extends Component {
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

    let result = await register(this.state.username, this.state.password)
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
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          <input value={username} onChange={this.handleUsername}></input>
          <input value={password} type="password" onChange={this.handlePassword}></input>
          <button>Register</button> 
        </form>
        <div>
          Have an account already? <Link to="/login">Sign in</Link>
        </div>
      </div>
    )
  }
}

export default RegisterPage