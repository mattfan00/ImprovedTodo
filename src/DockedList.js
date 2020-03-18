import React from 'react'

function DockedLists(props) {
  return (
    <div>
      <h4>
        <span onClick={props.changeListDisplay}>{props.name}</span> &nbsp;
        <span onClick={props.deleteList}>X</span>
      </h4> 
    </div>
  )
}


export default DockedLists