import React, { Component } from 'react'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    }

    this.toggleHover = this.toggleHover.bind(this)
  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
  }
  
  render() {
    const isCompleted = this.props.completed 
    const hover = this.state.hover

    return (
      <div className="todo-item" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <span onClick={this.props.toggleEditing} style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
          {this.props.name}
        </span>
        &nbsp; 
        {this.props.due ? this.props.due.toLocaleDateString() : ''}
        &nbsp;
        {hover ? <HoverItems /> : ''}
      </div>
    )
  }
}

function HoverItems(props) {
  return (
    <span>
      <span onClick={props.removeTodo}>
          X
      </span>
      &nbsp;
      <i class="far fa-calendar-plus"></i>
    </span>
   
  )
}

export default TodoItem