import axios from 'axios'

/*
IMPORTANT NOTE:
Don't put config as a global variable, since it won't update whenever a new user logs in
*/

export async function getLists() {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }

  return axios.get('http://localhost:3002/api/lists/', config)
  .then(res => res.data)
}

export async function addList(val) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }

  var body = JSON.stringify({
    name: val
  })

  return axios.post('http://localhost:3002/api/lists/', body, config)
  .then(res => res.data)
}

export async function deleteList(list) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }

  return axios.delete('http://localhost:3002/api/lists/' + list._id, config)
  .then(res => res.data)
}

export async function updateDisplay(list) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }

  var body = JSON.stringify({
    display: !list.display
  })

  return axios.put('http://localhost:3002/api/lists/' + list._id, body, config)
  .then(res => res.data)
}

export async function changeAllDisplays(listId, show) {
  var currentToken = localStorage.getItem('token')

  var config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": currentToken
    }
  }

  var body = JSON.stringify({
    display: show
  })

  return axios.put('http://localhost:3002/api/lists/' + listId, body, config)
  .then(res => res.data)
}