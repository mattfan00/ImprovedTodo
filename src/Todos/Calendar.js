import React, { Component } from "react"
import '../TodoCalendar.css'
import moment from 'moment'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dateObject: moment()
    }

    
  }

  firstDayOfMonth() {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); 
    return firstDay;
  }

  daysInMonth() {
    let dateObject = this.state.dateObject;
    let numDays = moment(dateObject).daysInMonth()
    return numDays;
  }

  currentDay() {
    return this.state.dateObject.format("D")
  }

  getDateSelected(day) {
    var dateObject = this.state.dateObject
    var dateFormat = new Date(dateObject.format('YYYY'), dateObject.format('M') - 1, day)
    this.props.changeDueDate(this.props.todoId, dateFormat)
    this.props.closeMenu()
  }

  render() {
    const weekdayname = moment.weekdaysShort().map((day, i) => (
      <div key={i}>{day}</div>
    ))

    var blanks = []
    for (var i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <button key={i + 1}></button>
      )
    }

    var daysInMonth = []
    for (var d = 1; d <= this.daysInMonth(); d++) {
      daysInMonth.push(
        <button key={d+this.firstDayOfMonth()} onClick={this.getDateSelected.bind(this, d)} className={this.currentDay() == d ? 'currentDay' : ''}>{d}</button>
      )
    }

    return (
      <div className="add-todo-calendar">
        <div className="month-indicator">
          {this.state.dateObject.format('MMM')} {this.state.dateObject.format('YYYY')}
        </div>
        <div className="day-of-week">
          {weekdayname}
        </div>
        <div className="date-grid">
          {blanks}
          {daysInMonth}
        </div>
      </div>
    )
  }
}

export default Calendar