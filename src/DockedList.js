import React from 'react'


function DockedList(props) {
  return (
    <div className="dock-item" onClick={props.changeListDisplay}>
        <span>{props.name}</span> &nbsp;
        {props.display.toString()}
        {/* <span className="dock-item-delete" onClick={props.deleteList}>X</span> */}
    </div>
  )
}


export default DockedList