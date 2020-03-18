import React, { Component } from 'react'
import AddList from './AddList'
import ListHeader from './ListHeader'
import DockedList from './DockedList'
import * as listCalls from './apiCalls/apiList'
import {getTodos, removeTodo} from './apiCalls/apiTodo'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeLists: [],
      dockedLists: []
    }

    this.addList = this.addList.bind(this)
  }

  componentDidMount() {
    this.loadLists()
  }

  async loadLists() {
    let lists = await listCalls.getLists()
    const activeLists = lists.filter(list => list.display === true)
    const dockedLists = lists.filter(list => list.display === false)
    this.setState({
      activeLists: activeLists,
      dockedLists: dockedLists
    })
  }

  async addList(val) {
    let newList = await listCalls.addList(val)
    this.setState({activeLists: [...this.state.activeLists, newList]})
  }

  async deleteList(list) {
    let deletedList = await listCalls.deleteList(list)
    const newActiveLists = this.state.activeLists.filter(list => list._id !== deletedList._id)
    const newDockedLists = this.state.dockedLists.filter(list => list._id !== deletedList._id)

    // delete the todos associated with the list 
    let todos = await getTodos()
    todos.forEach(async todo => {
      if (deletedList._id === todo.listId) {
        await removeTodo(todo)
      }
    });
    this.setState({
      activeLists: newActiveLists,
      dockedLists: newDockedLists
    })
  }

  async changeListDisplay(list) {
    let updatedList = await listCalls.updateDisplay(list)
    var newActiveLists
    var newDockedLists
    if (updatedList.display) {
      newActiveLists = [...this.state.activeLists, updatedList]
      newDockedLists = this.state.dockedLists.filter(list => list._id !== updatedList._id)
    } else {
      newActiveLists = this.state.activeLists.filter(list => list._id !== updatedList._id)
      newDockedLists = [...this.state.dockedLists, updatedList]
    }

    this.setState({
      activeLists: newActiveLists,
      dockedLists: newDockedLists
    })
  }


  render() {
    const activeLists = this.state.activeLists.map(list => 
      <ListHeader 
        key={list._id}
        listId={list._id}
        name={list.name} 
        deleteList={this.deleteList.bind(this, list)}
        changeListDisplay={this.changeListDisplay.bind(this, list)}
      /> 
    )

    const dockedLists = this.state.dockedLists.map(list => 
      <DockedList 
        key={list._id}
        name={list.name}
        deleteList={this.deleteList.bind(this, list)}
        changeListDisplay={this.changeListDisplay.bind(this, list)} 
      />
    )

    return (
      <div>
        <AddList addList={this.addList} />
        {activeLists}
        {dockedLists}
      </div>
    )
  }
}

export default Lists