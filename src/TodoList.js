import React, { Component } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import * as todoCalls from './apiCalls/apiTodo'


class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
      ]
    }

    this.addTodo = this.addTodo.bind(this)
  }

  componentDidMount() {
    this.loadTodos()
  }

  async loadTodos() {
    let todos = await todoCalls.getTodos()
    const newTodos = todos.filter(todo => todo.listId === this.props.listId)
    this.setState({todos: newTodos})
  }

  async addTodo(val) {
    let newTodo = await todoCalls.addTodo(val, this.props.listId)
    this.setState({todos: [...this.state.todos, newTodo]})
  }

  async toggleCompleted(todo) {
    let updatedTodo = await todoCalls.toggleCompleted(todo)
    const newTodos = this.state.todos.map(todo => {
      if(todo._id === updatedTodo._id) {
        return {...todo, completed: !todo.completed}
      } else {
        return todo
      }
    })
    this.setState({todos: newTodos})
  }

  async removeTodo(todo) {
    let removedTodo = await todoCalls.removeTodo(todo)
    const newTodos = this.state.todos.filter(todo => todo._id !== removedTodo._id)
    this.setState({todos: newTodos})

  }

  render() {
    const todoList = this.state.todos.map((todo) => 
      <TodoItem 
        key={todo._id}
        name={todo.name}
        completed={todo.completed}
        removeTodo={this.removeTodo.bind(this, todo)}
        toggleCompleted={this.toggleCompleted.bind(this, todo)} // this passes allows to call toggleCompleted and pass in todo
      />
    )

    return(
      <div>
        <ul>
          {todoList}
          <TodoForm addTodo={this.addTodo} />
        </ul>
      </div>
    )
  }
}

export default TodoList