import axios from 'axios'

var currentToken = localStorage.getItem('token')

var config = {
  headers: {
    "Content-type": "application/json",
    "x-auth-token": currentToken
  }
}

export async function getTodos() {
  return axios.get('http://localhost:3002/api/todos', config)
  .then(res => res.data)
}

export async function getTodosFromList(listId) {
  return axios.get('http://localhost:3002/api/lists/' + listId + '/todos', config)
  .then(res => res.data)
}

export async function addTodo(val, listId) {
  var body = JSON.stringify({
    name: val,
    listId: listId
  })

  return axios.post('http://localhost:3002/api/todos', body, config )
  .then(res => res.data)
}


export async function updateTodo(todoId, updates) {
  var body = JSON.stringify(updates)
  return axios.put('http://localhost:3002/api/todos/' + todoId, body, config)
  .then(res => res.data)
}

export async function removeTodo(todo) {
  return axios.delete('http://localhost:3002/api/todos/' + todo._id, config)
  .then(res => res.data)
}