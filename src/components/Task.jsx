import { useState } from 'react'
import '../styles/task.css'

function Task(props) {
  return (
    <div className="taskItem">
      <div className='task'>
        <p>{props.title}</p>
      </div>
      <div className="editBtn">
        <button onClick={props.fn}><span class="material-symbols-outlined">
          edit
        </span></button>
      </div>
      <div className="checkBtn">
        <button onClick={props.fn}>✓</button>
      </div>
    </div>
  )
}

export default Task
