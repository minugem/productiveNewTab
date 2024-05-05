import { useState } from 'react'
import '../styles/createTask.css'

function CreateTask({ showButton, setShowButton, addTask, taskLists }) {
    const [taskName, settaskName] = useState('');
    const [selectedTaskGroup, setSelectedTaskGroup] = useState(0);

    const handleInputChange = (event) => {
        settaskName(event.target.value);
    }

    const handleSelectChange = (event) => {
        setSelectedTaskGroup(event.target.value);
    }

    const createTask = () => {
        setShowButton(false)
        addTask((taskName != '' ? taskName : 'New Task'), selectedTaskGroup);
        settaskName('');
        setSelectedTaskGroup(0);
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
                                <select className='selectGroup' name="taskListSelect" id="taskListSelect" onChange={handleSelectChange}>
                                    {taskLists.map((taskList, index) => (
                                        <option key={index} value={taskList.id}>{taskList.title}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateTask
