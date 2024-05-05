import { useState } from 'react'
import '../styles/newTask.css'

function NewTaskButton(props) {

  return (
    <div className='newTaskButtonDiv'> 
      <button className='newTask' onMouseUp={() => props.setShowButton(true)}>
        +
      </button>
      <button className='newTask' onMouseUp={() => props.addTaskList()}>
        =
      </button>
    </div>
  )
}

export default NewTaskButton
