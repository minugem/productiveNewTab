import { useState } from 'react'
import '../styles/createTask.css'

function CreateTask({ showButton, setShowButton, addTask, createTaskId }) {
    const [taskName, settaskName] = useState('');

    const handleInputChange = (event) => {
        settaskName(event.target.value);
    }

    const createTask = () => {
        setShowButton(false)
        addTask((taskName != '' ? taskName : 'New Task'), createTaskId);
        settaskName('');
    }

    return (
        <div>
            {showButton && (
                <div className="createTask">
                    <div className="createTaskDiv">
                        <div className='closeBtnDiv'>
                            <button className="close" onClick={() => setShowButton(false)}>X</button>
                        </div>
                        <div className='creatingTask'>
                            <div>
                                <input type="text" name="" placeholder='New Task' value={taskName} onChange={handleInputChange} id="" autoFocus={true} onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        createTask();
                                    }
                                }} />
                            </div>
                            <div>
                                <button className='createTaskBtn' onClick={createTask}>Create Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateTask
