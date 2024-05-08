import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Task from './components/Task.jsx';
import CreateTask from './components/createTask.jsx';
import SearchBar from './components/searchBar.jsx';
import './styles/newTask.css';
import './styles/index.css';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [taskLists, setTaskLists] = useState([]);
  const [showTaskListEdit, setTaskListEdit] = useState(false);
  const [createTaskId, setCreateTaskId] = useState(0);

  const addTask = (taskTitle, taskGroup) => {
    const taskId = tasks.length;
    const newTask = { id: taskId, title: taskTitle, taskGroup: taskGroup };
    console.log("taskGroupOG", newTask.taskGroup);
    setTasks([...tasks, newTask]);
    storeData([...tasks, newTask]);
  };

  const addTaskList = () => {
    const taskListId = taskLists.length;
    const newTaskList = { id: taskListId, title: "Tasks " + Number(taskListId + 1), group: taskListId };
    setTaskLists([...taskLists, newTaskList]);
  };

  const storeData = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskLists', JSON.stringify(taskLists));
  }

  const loadData = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedTaskLists = JSON.parse(localStorage.getItem('taskLists')) || [];
    setTasks(storedTasks);
    setTaskLists(storedTaskLists);
  }

  const clearData = () => {
    localStorage.removeItem('tasks');
    localStorage.removeItem('taskLists');
    setTasks([]);
    setTaskLists([]);
  }

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function removeTaskList(id) {
    setTaskLists(taskLists.filter(taskList => taskList.id !== id));
  }

  function changeTaskListName(id, newName) {
    setTaskLists(taskLists.map(taskList => taskList.id === id ? { ...taskList, title: newName } : taskList));
  }

  const createTasks = (id) => {
    setCreateTaskId(id);
    setShowButton(true);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    storeData(tasks);
  }, [tasks]);

  useEffect(() => {
    storeData();
  }, [tasks, taskLists]);

  function TaskList(props) {
    const [taskListName, setTaskListName] = useState('');
    const [showTaskListEdit, setTaskListEdit] = useState(false);

    const handleInputChange = (event) => {
      setTaskListName(event.target.value);
    }

    return (
      <div className='taskList'>
        <div className='taskHeading'>
          <p>{props.title}</p>
          <button className='newTask' onMouseUp={() => createTasks(props.id)}>
            +
          </button>

          <button onClick={() => setTaskListEdit(true)}><span className="material-symbols-outlined">
            edit
          </span></button>
          <button className='close' onClick={props.removeTaskList}><span class="material-symbols-outlined">
            close
          </span></button>
        </div>

        <div className="taskContainer">
          {
            tasks.filter(task => Number(task.taskGroup) == Number(props.id)).map((task) => {
              return (
                <Task key={task.id} title={task.title} taskGroup={task.taskGroup} fn={() => removeTask(task.id)} />
              );
            })}

        </div>
        {showTaskListEdit && (
          <div className='editTaskList'>
            <div>
              <input type="text" name="" placeholder='Tasks' value={taskListName} onChange={handleInputChange} id="" autoFocus={true} onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (taskListName != '') {
                    props.changeTaskListName(props.id, taskListName);
                  }
                  else {
                    props.changeTaskListName(props.id, 'Tasks');
                  }
                  setTaskListName('');
                  setTaskListEdit(false);
                }
              }} />
            </div>
          </div>
        )}
      </div>
    )
  }



  return (
    <>
      <SearchBar />
      <button className='taskListButton' onMouseUp={() => addTaskList()}>
        +
      </button>
      <div className='taskLists'>
        {taskLists.map((taskList) => (
          <TaskList key={taskList.id} title={taskList.title} group={taskList.id} id={taskList.id} removeTaskList={() => removeTaskList(taskList.id)} changeTaskListName={(id, name) => changeTaskListName(id, name)} />
        ))}
      </div>
      <CreateTask showButton={showButton} setShowButton={setShowButton} addTask={addTask} taskLists={taskLists} createTaskId={createTaskId}/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
