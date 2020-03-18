import React, { Component } from 'react'
import AddList from './AddList'
import ListHeader from './ListHeader'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [
      ]
    }

    this.addList = this.addList.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/lists')
    .then((response) => response.json())
    .then((data) => {
      this.setState({lists: data})
    })
  }

  addList(val) {
    fetch('http://localhost:3001/api/lists', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name: val
      })
    })
    .then((response) => response.json())
    .then((newList) => {
      console.log(newList)
      this.setState({lists: [...this.state.lists, newList]})
    })
  }

  deleteList(list) {
    fetch('http://localhost:3001/api/lists/' + list._id, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((deletedList) => {
      const newList = this.state.lists.filter(list => list._id !== deletedList._id)
      this.setState({lists: newList})
    })
  }

  render() {
    const lists = this.state.lists.map(list => 
      <ListHeader 
        key={list._id}
        listId={list._id}
        name={list.name} 
        deleteList={this.deleteList.bind(this, list)}
      /> 
    )

    return (
      <div>
        <AddList addList={this.addList} />
        {lists}
      </div>
    )
  }
}

export default Lists