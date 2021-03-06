import React, { Component } from 'react'

class AddList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.addList(this.state.value)
    this.setState({value: ""})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <form className="add-list-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Add List" value={this.state.value} onChange={this.handleChange}></input>
      </form>
    )
  }
}

export default AddList