import React, { Component } from 'react'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.addTodo(this.state.value)
    this.setState({value: ""})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
      </form>
    )
  }
}

export default TodoForm