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
    const isDisabled = this.state.value.length === 0 ? true : false

    return (
      <form className="add-todo-form" onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange}></input>
        <button className={`add-todo-form-add ${isDisabled ? 'disabled' : ''}`} disabled={isDisabled}>Add</button>
        <button className="add-todo-form-cancel" type="button" onClick={this.props.toggleEditing}>Cancel</button>
      </form>
    )
  }
}

export default TodoItemEdit