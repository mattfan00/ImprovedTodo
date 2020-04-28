import React, { Component } from 'react'
import moment from 'moment'
import * as todoCalls from '../../apiCalls/apiTodo'

import DayTodos from './DayTodos'


class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allTodos: [],
      loading: true
    }

    this.loadTodos = this.loadTodos.bind(this)
    this.createDaySlots = this.createDaySlots.bind(this)
  }

  componentDidUpdate() {
    if (this.state.allTodos.length === 0 && this.state.loading) { // this is necessary to prevent an infinite loop
      this.loadTodos()
    }
  }

  async loadTodos() {
    const { activeLists } = this.props

    var allActiveTodos = await Promise.all(activeLists.map(async list => { 
      let todos = await todoCalls.getTodosFromList(list._id)
      todos = todos.map(todo => {
        todo.editing = false;
        return todo
      })
      return todos
    }))

    allActiveTodos = allActiveTodos.flat()

    this.setState({
      allTodos: allActiveTodos,
      loading: false
    })
  }

  createDaySlots() {
    const { allTodos } = this.state

    const daySlot = []
    for (var i = 0; i < 5; i++) {
      const day = moment().add(i, 'days')
      var todosForDay = allTodos.filter(todo => {
        if (todo.due) {
          const todoDue = new Date(todo.due)
          if (moment(todoDue).isSame(day, 'day')) return true
        } else {
          if (i === 0) return true
        }
        return false
      })

      daySlot.push(
        <div key={i}>
          <h2>{day.format('dddd')}</h2>
          <h4>{day.format('MMM')} {day.format('D')}</h4>
          <DayTodos todos={todosForDay} />
        </div>
      )
    }
    return daySlot

  }

  render() {
    const daySlot = this.createDaySlots()

    return (
      <div>
        {daySlot}
      </div>
    )
  }
}

export default Calendar