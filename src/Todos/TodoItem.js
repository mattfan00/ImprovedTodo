import React, { Component } from 'react'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
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


class HoverItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(e) {
    e.preventDefault()

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  closeMenu(e) {
    
    if (!this.dropdownMenu.contains(e.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }
  render() {
    return (
      <span>
        <span onClick={this.props.removeTodo}>
            X
        </span>
        &nbsp;
        <i onClick={this.showMenu} class="far fa-calendar-plus"></i>
        {
          this.state.showMenu
            ? (
              <div 
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button>item 1</button>
                <button>item 2</button>
                <button>item 3</button>
              </div>
          )
            : (
              null
          )
        }
        
      </span>
    )
  }
  
}

export default TodoItem