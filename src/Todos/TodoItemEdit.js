import React, { Component } from 'react'

class TodoItemEdit extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      value: this.props.currentVal
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editTodo(this.props.todoId, this.state.value)
    this.setState({value: ""})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange}></input>
      </form>
    )
  }
}

export default TodoItemEdit