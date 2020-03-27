import React, { Component } from 'react'
import Calendar from './Calendar'
import moment from 'moment'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.closeMenuAfterSubmit = this.closeMenuAfterSubmit.bind(this)
  }

  toggleHover(enter) {
    if (enter || this.state.showMenu) {
      this.setState({hover: true})
    } else {
      this.setState({hover: false})
    }
  }

  showMenu(e) {
    e.preventDefault()

    console.log('arrives at show')
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  closeMenu(e) {
    if (this.state.showMenu) {
      if (!this.dropdownMenu.contains(e.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });  
      }
    }
  }

  closeMenuAfterSubmit() {
    document.removeEventListener('click', this.closeMenu);
    this.setState({showMenu: false})
  }
  
  render() {
    const isCompleted = this.props.completed 
    const hover = this.state.hover
    const showMenu = this.state.showMenu
    const due = this.props.due
    const today = moment().startOf('day')

    return (
      <div className="todo-item" onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this,false)}>
        <span onClick={!showMenu ? this.props.toggleEditing : null} style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
          {this.props.name}
        </span>
        &nbsp; 
        {due ? (
          moment(due).diff(today, "days") <= 7 ? (
            moment(due).calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD/MM/YYYY'
            })
          ) : (
            moment(due).format("MMM D") 
          )
        ) : ''
        }
        &nbsp;
        {/* {hover ? <HoverItems /> : ''} */}
        {
          hover 
            ? (
              <span>
                <span onClick={this.props.removeTodo}>
                    X
                </span>
                &nbsp;
                <i onClick={this.showMenu} className="far fa-calendar-plus"></i>
                {
                  showMenu
                    ? (
                      <div 
                        ref={(element) => {
                          this.dropdownMenu = element;
                        }}
                      >
                        <Calendar 
                          todoId={this.props.todoId}  
                          changeDueDate={this.props.changeDueDate}
                          closeMenu={this.closeMenuAfterSubmit}
                          due={this.props.due}
                        />
                      </div>
                  )
                    : (
                      null
                  )
                } 
              </span>
            )
            : (
              null
            )
        }
      </div>
    )
  }
}




export default TodoItem