import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import NewTaskButton from './components/NewTaskButton.jsx';
import Task from './components/Task.jsx';
import CreateTask from './components/createTask.jsx';
import SearchBar from './components/searchBar.jsx';
import './styles/index.css';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [taskLists, setTaskLists] = useState([]);

  const addTask = (taskTitle) => {
    const taskId = tasks.length;
    const newTask = { id: taskId, title: taskTitle };
    setTasks([...tasks, newTask]);
    storeData([...tasks, newTask]);
  };

  const addTaskList = () => {
    const taskListId = taskLists.length;
    const newTaskList = { id: taskListId, title: "Tasks " + Number(taskListId + 1) };
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
    console.log(storedTaskLists);
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
    return (
      <div className='taskList'>
        <div className='taskHeading'>
          <p>{props.title}</p>
        </div>
        <div className="taskContainer">
          {tasks.map((task) => (
            <Task key={task.id} title={task.title} fn={() => removeTask(task.id)} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <>
      <SearchBar />
      <div className='taskLists'>
        {taskLists.map((taskList) => (
          <TaskList key={taskList.id} title={taskList.title} />
        ))}
      </div>
      <NewTaskButton setShowButton={setShowButton} addTaskList={addTaskList} />
      <CreateTask showButton={showButton} setShowButton={setShowButton} addTask={addTask} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
