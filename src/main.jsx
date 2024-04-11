import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import NewTaskButton from './components/NewTaskButton.jsx';
import Task from './components/Task.jsx';
import CreateTask from './components/createTask.jsx';
import './styles/index.css';
import SearchBar from './components/searchBar.jsx';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const addTask = (taskTitle) => {
    const taskId = tasks.length;
    const newTask = { id: taskId, title: taskTitle };
    setTasks([...tasks, newTask]);
    storeData([...tasks, newTask]);
  };

  const storeData = (data) => {
    localStorage.setItem('tasks', JSON.stringify(data));
  }

  const loadData = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }

  const clearData = () => {
    localStorage.removeItem('tasks');
    setTasks([]);
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

  return (
    <>
      <SearchBar />
      <div className='taskHeading'>
        <p>Tasks</p>
      </div>
      <div className="taskContainer">
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} fn={() => removeTask(task.id)} />
        ))}
      </div>
      <NewTaskButton setShowButton={setShowButton} />
      <CreateTask showButton={showButton} setShowButton={setShowButton} addTask={addTask} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
