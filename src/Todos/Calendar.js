import React, { Component } from "react"
import '../TodoCalendar.css'
import moment from 'moment'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dateObject: moment(),
      today: moment()
    }

    // this.checkIfSelectedDay = this.checkIfSelectedDay.bind(this)
    this.monthUp = this.monthUp.bind(this)
    this.monthDown = this.monthDown.bind(this)
    this.checkIfCurrentDay = this.checkIfCurrentDay.bind(this)
    this.checkIfSelectedDay = this.checkIfSelectedDay.bind(this)
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
    return this.state.today.format("D")
  }

  chooseDate(day) {
    var dateObject = this.state.dateObject
    var dateFormat = new Date(dateObject.format('YYYY'), dateObject.format('M') - 1, day)
    this.props.changeDueDate(this.props.todoId, dateFormat)
    this.props.closeMenu()
  }
  
  monthUp() {
    var dateObject = moment({...this.state.dateObject})
    var newDateObject = dateObject.set({
      'month': (dateObject.month() + 1) % 12
    })
    this.setState({
      dateObject: newDateObject
    })
  }

  monthDown() {
    var dateObject = moment({...this.state.dateObject})
    var newDateObject = dateObject.set({
      'month': (dateObject.month() - 1) % 12
    })
    this.setState({
      dateObject: newDateObject
    })
  }

  checkIfCurrentDay(day) {
    const dateObject = this.state.dateObject
    const today = this.state.today
    if (this.currentDay() == day && dateObject.month() == today.month() && dateObject.year() == today.year()) {
      return true
    } else return false
  }

  checkIfSelectedDay(day) {
    const dateObject = this.state.dateObject
    const due = moment(this.props.due)
    if (due.format('D') == day && dateObject.month() == due.month() && dateObject.year() == due.year()) {
      return true
    } else return false
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
        <button key={d+this.firstDayOfMonth()} 
          onClick={this.chooseDate.bind(this, d)} 
          className={`${this.checkIfCurrentDay(d) ? 'currentDay' : ''}  ${this.checkIfSelectedDay(d) ? 'selectedDay' : ''}`}
        >
          {d}
        </button>
      )
    }

    return (
      <div className="add-todo-calendar">
        <div className="month-indicator">
          <button onClick={this.monthDown}><i className="fas fa-arrow-left"></i></button>
          {this.state.dateObject.format('MMM')} {this.state.dateObject.format('YYYY')}
          <button onClick={this.monthUp}><i className="fas fa-arrow-right"></i></button>
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