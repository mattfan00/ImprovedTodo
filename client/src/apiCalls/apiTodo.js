import axios from 'axios'

/*
IMPORTANT NOTE:
Don't put config as a global variable, since it won't update whenever a new user logs in
*/

export async function getTodos() {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }
  
  return axios.get('http://localhost:3002/api/todos', config)
  .then(res => res.data)
}

export async function getTodosFromList(listId) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }
  
  return axios.get('http://localhost:3002/api/lists/' + listId + '/todos', config)
  .then(res => res.data)
}

export async function addTodo(val, listId) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }
  
  var body = JSON.stringify({
    name: val,
    listId: listId
  })

  return axios.post('http://localhost:3002/api/todos', body, config )
  .then(res => res.data)
}


export async function updateTodo(todoId, updates) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }
  
  var body = JSON.stringify(updates)
  return axios.put('http://localhost:3002/api/todos/' + todoId, body, config)
  .then(res => res.data)
}

export async function removeTodo(todo) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }
  
  return axios.delete('http://localhost:3002/api/todos/' + todo._id, config)
  .then(res => res.data)
}