import React, { Component } from "react"
import moment from 'moment'

class TodoCalendar extends Component {
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
    this.checkIfDisabledDay = this.checkIfDisabledDay.bind(this)
  }

  componentDidMount() {
    this.setState({dateObject: this.props.due ? moment(this.props.due) : moment()})
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
      'month': dateObject.month() + 1,
    })
    this.setState({
      dateObject: newDateObject
    })
  }

  monthDown() {
    var dateObject = moment({...this.state.dateObject})
    var newDateObject = dateObject.set({
      'month': dateObject.month() - 1,
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

  checkIfDisabledDay(day) {
    const dateObject = this.state.dateObject
    const today = this.state.today
    if (dateObject.year() > today.year() ||
        (dateObject.year() == today.year() && dateObject.month() > today.month()) || 
        (dateObject.year() == today.year() && dateObject.month() == today.month() && day >= this.currentDay()))
    {
      return false
    } else {
      return true
    }
  }

  render() {
    const weekdayname = moment.weekdaysShort().map((day, i) => (
      <div key={i}>{day}</div>
    ))

    var blanks = []
    for (var i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <button className="noHover" key={i + 1}></button>
      )
    }

    var daysInMonth = []
    for (var d = 1; d <= this.daysInMonth(); d++) {
      daysInMonth.push(
        <button
          key={d+this.firstDayOfMonth()} 
          onClick={this.chooseDate.bind(this, d)} 
          className={`hover-background 
            ${this.checkIfCurrentDay(d) ? 'currentDay' : ''}  
            ${this.checkIfSelectedDay(d) ? 'selectedDay' : ''} 
            ${this.checkIfDisabledDay(d) ? 'disabledDay noHover' : ''}
          `}
        >
          {d}
        </button>
      )
    }

    return (
      <div className="add-todo-calendar">
        <div className="month-indicator">
          <button onClick={this.monthDown} className="hover-background"><i className="fas fa-arrow-left"></i></button>
          {this.state.dateObject.format('MMM')} {this.state.dateObject.format('YYYY')}
          <button onClick={this.monthUp} className="hover-background"><i className="fas fa-arrow-right"></i></button>
        </div>
        <div className="day-of-week">
          {weekdayname}
        </div>
        <div className="date-grid">
          {blanks}
          {daysInMonth}
        </div>
        <span onClick={this.props.removeDueDate} className={`remove-date ${this.props.due ? '' : 'hide'}`}>
          Remove due date
        </span>
      </div>
    )
  }
}

export default TodoCalendar