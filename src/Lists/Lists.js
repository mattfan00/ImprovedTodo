import React, { Component } from 'react'
import AddList from './AddList'
import ListHeader from './ListHeader'
import DockedList from './DockedList'
import ChangeListDisplays from './ChangeListDisplays'
import * as listCalls from '../apiCalls/apiList'
import * as todoCalls from '../apiCalls/apiTodo'
import {getTodos, removeTodo} from '../apiCalls/apiTodo'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeLists: [],
      dock: []
    }

    this.addList = this.addList.bind(this)
    this.loadlists = this.loadLists.bind(this)
    this.updateNumTodos = this.updateNumTodos.bind(this)
    this.hideEmptyLists = this.hideEmptyLists.bind(this)
    this.displayAllLists = this.displayAllLists.bind(this)
  }

  componentDidMount() {
    this.loadLists()
  }

  async loadLists() {
    let lists = await listCalls.getLists()
    const activeLists = lists.filter(list => list.display === true)
    lists = await Promise.all(lists.map(async list => {
      let todos = await todoCalls.getTodosFromList(list._id) 
      list.numTodos = todos.length
      return list
    }))
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

  updateNumTodos(method, listId) {
    var newDock = this.state.dock.map(list => {
      if (list._id === listId) {
        var newList = {...list, numTodos: (method==="add" ? ++list.numTodos : --list.numTodos)}
        return newList
      } else {
        return list
      }
    })
    this.setState({dock: newDock})
  }

  async hideEmptyLists() {
    var newDock = await Promise.all(this.state.dock.map(async list => {
      if (list.numTodos === 0) {
        let updatedList = await listCalls.changeAllDisplays(list._id, false)
        updatedList.numTodos = 0
        return updatedList
      } else {
        return list
      }
    }))
    var newActiveLists = newDock.filter(list => list.display === true)
    this.setState({
      activeLists: newActiveLists,
      dock: newDock
    })
  }

  async displayAllLists() {
    var newDock = await Promise.all(this.state.dock.map(async list => {
      if (list.display === false) {
        var numTodos = list.numTodos
        let updatedList = await listCalls.changeAllDisplays(list._id, true)
        updatedList.numTodos = numTodos
        return updatedList
      } else {
        return list
      }
    }))
    var newActiveLists = newDock.filter(list => list.display === true)
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
        updateNumTodos = {this.updateNumTodos}
        deleteList={this.deleteList.bind(this, list)}
        changeListDisplay={this.changeListDisplay.bind(this, list)}
      /> 
    )

    const dockedLists = this.state.dock.map(list => 
      <DockedList
        key={list._id}
        name={list.name}
        display={list.display}
        numTodos = {list.numTodos}
        deleteList={this.deleteList.bind(this, list)}
        changeListDisplay={this.changeListDisplay.bind(this, list)} 
      />
    )

    return (
      <div>
        <div className="dock">
          {dockedLists}
          <AddList addList={this.addList} /> 
          <ChangeListDisplays
            hideEmptyLists={this.hideEmptyLists}
            displayAllLists={this.displayAllLists}
          />
        </div>
        <div className="main">
          <div className="main-grid">
            {activeLists}
          </div>
        </div>
        
      </div> 
    )
  }
}

export default Lists