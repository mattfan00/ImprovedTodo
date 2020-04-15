export async function getTodos() {
  return fetch('http://localhost:3002/api/todos')
  .then((response) => response.json())
}

export async function getTodosFromList(listId) {
  return fetch('http://localhost:3002/api/lists/' + listId + '/todos')
  .then((response) => response.json())
}

export async function addTodo(val, listId) {
  return fetch('http://localhost:3002/api/todos', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: val,
      listId: listId
    })
  })
  .then((response) => response.json())
}


export async function updateTodo(todoId, updates) {
  return fetch('http://localhost:3002/api/todos/' + todoId, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(updates)
  })
  .then((response) => response.json())
}

export async function removeTodo(todo) {
  return fetch('http://localhost:3002/api/todos/' + todo._id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => response.json())
}