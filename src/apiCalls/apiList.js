export async function getLists() {
  return fetch('http://localhost:3001/api/lists/')
  .then((response) => response.json())
}

export async function addList(val) {
  return fetch('http://localhost:3001/api/lists/', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: val
    })
  })
  .then((response) => response.json())
}

export async function deleteList(list) {
  return fetch('http://localhost:3001/api/lists/' + list._id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => response.json())
}

export async function updateDisplay(list) {
  console.log('turning display to ' + !list.display.toString())
  return fetch('http://localhost:3001/api/lists/' + list._id, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      display: !list.display
    })
  })
  .then((response) => response.json())
}