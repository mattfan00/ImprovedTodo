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
    .then((data) => {
      this.setState({todos: data})
    })
  }

  addTodo(val) {
    fetch('http://localhost:3001/api/todos', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({todos: [...this.state.todos, data]})
    })
  }
    
  render() {
    const todoList = this.state.todos.map((todo) => 
      <TodoItem key={todo._id} name={todo.name} />
    )

    return(
      <div>
        <ul>
          {todoList}
        </ul>
        <TodoForm addTodo={this.addTodo} />
      </div>
    )
  }
}

export default TodoList