import React, { Component } from 'react'
import AddList from './AddList'
import ListHeader from './ListHeader'
import * as listCalls from './apiCalls/apiList'
import {getTodos, removeTodo} from './apiCalls/apiTodo'

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
    this.loadLists()
  }

  async loadLists() {
    let list = await listCalls.getLists()
    this.setState({lists: list})
  }

  async addList(val) {
    let newList = await listCalls.addList(val)
    this.setState({lists: [...this.state.lists, newList]})
  }

  async deleteList(list) {
    let deletedList = await listCalls.deleteList(list)
    const newList = this.state.lists.filter(list => list._id !== deletedList._id)
    let todos = await getTodos()
    todos.forEach(async todo => {
      if (deletedList._id === todo.listId) {
        await removeTodo(todo)
      }
    });
    this.setState({lists: newList})
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