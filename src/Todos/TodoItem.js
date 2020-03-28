import React, { Component } from 'react'
import Calendar from './Calendar'
import moment from 'moment'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverItem: false,
      hoverCheck: false,
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.closeMenuAfterSubmit = this.closeMenuAfterSubmit.bind(this)
  }

  toggleHoverItem(enter) {
    if (enter || this.state.showMenu) {
      this.setState({hoverItem: true})
    } else {
      this.setState({hoverItem: false})
    }
  }

  toggleHoverCheck(enter) {
    this.setState({hoverCheck: enter})
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
    const hoverItem = this.state.hoverItem
    const hoverCheck = this.state.hoverCheck
    const showMenu = this.state.showMenu
    const isCompleted = this.props.completed 
    const due = this.props.due
    const today = moment().startOf('day')

    return (
      <div 
        className="todo-item" 
        onMouseEnter={this.toggleHoverItem.bind(this, true)} 
        onMouseLeave={this.toggleHoverItem.bind(this,false)}
      >
        <span 
          onClick={this.props.removeTodo} 
          onMouseEnter={this.toggleHoverCheck.bind(this, true)} 
          onMouseLeave={this.toggleHoverCheck.bind(this,false)}
        >
          {hoverCheck ? <i class="fas fa-check-circle"></i> : <i class="far fa-circle"></i>}
        </span>
        &nbsp;&nbsp;
        <span onClick={!showMenu ? this.props.toggleEditing : null}>
          {this.props.name}
        </span> 
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
        {
          hoverItem 
            ? (
              <span>
                <i onClick={this.showMenu} className="fas fa-ellipsis-h"></i>
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