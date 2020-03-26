import React from 'react'

function ChangeListDisplays(props) {
  return (
    <div className="changeListDisplays">
      <button onClick={props.hideEmptyLists}>Hide Empty Lists</button> 
      <button onClick={props.displayAllLists}>Show All Lists</button> 
    </div>
  )
}

export default ChangeListDisplays