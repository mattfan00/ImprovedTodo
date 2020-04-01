import React, { Component } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import TodoItemEdit from './TodoItemEdit'
import * as todoCalls from '../apiCalls/apiTodo'


class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
      ]
    }

    this.addTodo = this.addTodo.bind(this)
    this.editTodo = this.editTodoName.bind(this)
    this.changeDueDate = this.changeDueDate.bind(this)
  }

  componentDidMount() {
    this.loadTodos()
  }

  async loadTodos() {
    let todos = await todoCalls.getTodosFromList(this.props.listId)
    todos = todos.map(todo => {
      todo.editing = false;
      return todo
    })
    this.setState({todos: todos})
  }

  async addTodo(val) {
    let newTodo = await todoCalls.addTodo(val, this.props.listId)
    this.props.updateNumTodos("add", this.props.listId)
    this.setState({todos: [...this.state.todos, newTodo]})
  }

  async toggleCompleted(todo) {
    let updatedTodo = await todoCalls.updateTodo(todo._id, {completed: !todo.completed})
    const newTodos = this.state.todos.map(todo => {
      if(todo._id === updatedTodo._id) {
        return {...todo, completed: !todo.completed}
      } else {
        return todo
      }
    })
    this.setState({todos: newTodos})
  }

  toggleEditing(todoId) {
    const newTodos = this.state.todos.map(todo => {
      if(todo._id === todoId) {
        return {...todo, editing: !todo.editing}
      } else {
        return {...todo, editing: false}
      }
    })
    this.setState({todos: newTodos})
  }

  async editTodoName(todoId, val) {
    await todoCalls.updateTodo(todoId, {name: val})
    const newTodos = this.state.todos.map(todo => {
      var newTodo = {...todo, editing: false}
      if (todo._id === todoId) {
        newTodo.name = val
      }
      return newTodo
    })
    this.setState({todos: newTodos})
  }

  async changeDueDate(todoId, date) {
    let updatedTodo = await todoCalls.updateTodo(todoId, {due: date})
    const newTodos = this.state.todos.map(todo => {
      if (todo._id === todoId) {
        return updatedTodo
      } else {
        return todo
      }
    })
    this.setState({todos: newTodos})
  }

  async removeDueDate(todoId) {
    let updatedTodo = await todoCalls.updateTodo(todoId, {due: null})
    const newTodos = this.state.todos.map(todo => {
      if (todo._id === todoId) {
        return updatedTodo
      } else {
        return todo
      }
    })
    this.setState({todos: newTodos})
  }

  async removeTodo(todo) {
    let removedTodo = await todoCalls.removeTodo(todo)
    const newTodos = this.state.todos.filter(todo => todo._id !== removedTodo._id)
    this.props.updateNumTodos("remove", this.props.listId)
    this.setState({todos: newTodos})
  }

  render() {
    const todoList = this.state.todos.map((todo) => {
      if (!todo.editing) {
        return (
          <TodoItem 
            key={todo._id}
            todoId={todo._id}
            name={todo.name}
            completed={todo.completed}
            editing={todo.editing}
            due={todo.due ? new Date(todo.due) : null}
            removeTodo={this.removeTodo.bind(this, todo)}
            toggleCompleted={this.toggleCompleted.bind(this, todo)} // this passes allows to call toggleCompleted and pass in todo
            toggleEditing={this.toggleEditing.bind(this, todo._id)}
            removeDueDate={this.removeDueDate.bind(this, todo._id)}
            changeDueDate={this.changeDueDate}
          />
        )
      } else {
        return (
          <TodoItemEdit
            editTodo={this.editTodo}
            currentVal={todo.name}
            todoId={todo._id}
            toggleEditing={this.toggleEditing.bind(this, todo._id)}
         />
        )
      }
    })

    return(
      <div className="main-grid-item-todos">
        {todoList}
        <TodoForm addTodo={this.addTodo} />
      </div>
    )
  }
}

export default TodoList