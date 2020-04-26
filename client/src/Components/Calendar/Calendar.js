import React, { Component } from 'react'
import moment from 'moment'


class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const daySlot = []
    for (var i = 0; i < 5; i++) {
      const day = moment().add(i, 'days')
      daySlot.push(
        <div>
          <h2>{day.format('dddd')}</h2>
          <h4>{day.format('MMM')} {day.format('D')}</h4>
        </div>
      )
    }


    return (
      <div>
        {daySlot}
      </div>
    )
  }
}

export default Calendar