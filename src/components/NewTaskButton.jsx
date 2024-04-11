import { useState } from 'react'
import '../styles/newTask.css'

function NewTaskButton(props) {

  return (
      <div>
        <button className='newTask' onMouseUp={() => props.setShowButton(true)}>
          +
        </button>
      </div>
  )
}

export default NewTaskButton
