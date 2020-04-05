import React, { Component } from 'react'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      showForm: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.addTodo(this.state.value)
    this.setState({value: ""})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm,
      value: ""
    })
  }

  render() {
    const showForm = this.state.showForm
    const isDisabled = this.state.value.length === 0 ? true : false

    return (
      <div className="add-todo">
        <div onClick={this.toggleForm} className={`add-todo-text ${showForm ? 'hide' : ''}`}>
          <i className="fas fa-plus "></i> &nbsp; &nbsp;
          <div>Add todo</div>
        </div>
        <form className={`add-todo-form ${showForm ? '' : 'hide'}`} onSubmit={this.handleSubmit}>
          <input placeholder="Add Todo" type="text" value={this.state.value} onChange={this.handleChange}></input>
          {/* <button className={`add-todo-form-add ${isDisabled ? 'disabled' : ''}`} disabled={isDisabled}>Add</button> */}
          <button className="add-todo-form-cancel" type="button" onClick={this.toggleForm}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default TodoForm