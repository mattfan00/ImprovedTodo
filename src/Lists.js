import React, { Component } from 'react'
import TodoList from './TodoList'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state= {
      lists: [
      ]
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/lists')
    .then((response) => response.json())
    .then((data) => {
      this.setState({lists: data})
    })
  }

  render() {
    const lists = this.state.lists.map(list => 
      <div>
        <h2>{list.name}</h2> 
        <TodoList listId={list._id} />
      </div>    
    )

    return (
      <div>
        {lists}
      </div>
    )
  }
}

export default Lists