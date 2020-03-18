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
      dock: []
    }

    this.addList = this.addList.bind(this)
  }

  componentDidMount() {
    this.loadLists()
  }

  async loadLists() {
    let lists = await listCalls.getLists()
    const activeLists = lists.filter(list => list.display === true)
    // const dockedLists = lists.filter(list => list.display === false)
    this.setState({
      activeLists: activeLists,
      dock: lists
    })
  }

  async addList(val) {
    let newList = await listCalls.addList(val)
    this.setState({
      activeLists: [...this.state.activeLists, newList],
      dock: [...this.state.dock, newList]
    })
  }

  async deleteList(list) {
    let deletedList = await listCalls.deleteList(list)
    const newActiveLists = this.state.activeLists.filter(list => list._id !== deletedList._id)
    const newDock = this.state.dock.filter(list => list._id !== deletedList._id)

    // delete the todos associated with the list 
    let todos = await getTodos()
    todos.forEach(async todo => {
      if (deletedList._id === todo.listId) {
        await removeTodo(todo)
      }
    });
    this.setState({
      activeLists: newActiveLists,
      dock: newDock
    })
  }

  async changeListDisplay(list) {
    let updatedList = await listCalls.updateDisplay(list)
    var newActiveLists
    
    if (updatedList.display) {
      newActiveLists = [...this.state.activeLists, updatedList]
    } else {
      newActiveLists = this.state.activeLists.filter(list => list._id !== updatedList._id)
    }

    const newDock = this.state.dock.map(list => {
      if (list._id === updatedList._id) {
        return {...list, display: !list.display}
      } else {
        return list
      }
    })

    this.setState({
      activeLists: newActiveLists,
      dock: newDock
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

    const dockedLists = this.state.dock.map(list => 
      <DockedList
        key={list._id}
        name={list.name}
        display={list.display}
        deleteList={this.deleteList.bind(this, list)}
        changeListDisplay={this.changeListDisplay.bind(this, list)} 
      />
    )

    return (
      <div>
        <div className="dock">
          {dockedLists}
        </div>
        <div className="main">
          <AddList addList={this.addList} />
          {activeLists}
        </div>
        
      </div> 
    )
  }
}

export default Lists