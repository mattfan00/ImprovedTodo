export async function getTodos() {
  return fetch('http://localhost:3001/api/todos')
  .then((response) => response.json())
}

export async function getTodosFromList(listId) {
  return fetch('http://localhost:3001/api/lists/' + listId + '/todos')
  .then((response) => response.json())
}

export async function addTodo(val, listId) {
  return fetch('http://localhost:3001/api/todos', {
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

export async function editTodoName(todoId, val) {
  return fetch('http://localhost:3001/api/todos/' + todoId, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({name: val})
  })
  .then((response) => response.json())
} 

export async function toggleCompleted(todo) {
  return fetch('http://localhost:3001/api/todos/' + todo._id, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({completed: !todo.completed})
  })
  .then((response) => response.json())
}

export async function removeTodo(todo) {
  return fetch('http://localhost:3001/api/todos/' + todo._id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => response.json())
}