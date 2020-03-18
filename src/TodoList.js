import React, { Component } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'


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
    fetch('http://localhost:3001/api/todos')
    .then((response) => {
      return response.json()
    })
    .then((todos) => {
      const newTodos = todos.filter(todo => todo.listId === this.props.listId)
      this.setState({todos: newTodos})
    })
  }

  addTodo(val) {
    fetch('http://localhost:3001/api/todos', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name: val,
        listId: this.props.listId
      })
    })
    .then((response) => response.json())
    .then((newTodo) => {
      this.setState({todos: [...this.state.todos, newTodo]})
    })
  }

  toggleCompleted(todo) {
    fetch('http://localhost:3001/api/todos/' + todo._id, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !todo.completed})
    })
    .then((response) => response.json())
    .then((updatedTodo) => {
      const newTodos = this.state.todos.map(todo => {
        if(todo._id === updatedTodo._id) {
          return {...todo, completed: !todo.completed}
        } else {
          return todo
        }
      })
      this.setState({todos: newTodos})
    })
  }

  removeTodo(todo) {
    fetch('http://localhost:3001/api/todos/' + todo._id, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((removedTodo) => {
      const newTodos = this.state.todos.filter(todo => todo._id !== removedTodo._id)
      this.setState({todos: newTodos})
    })
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