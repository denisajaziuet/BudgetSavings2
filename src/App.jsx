import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from './store/slices/taskSlice';
import { useGetTasksQuery } from './store/apis/taskApi';

function App() {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const { data: apiTasks, isLoading, isError } = useGetTasksQuery();

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    dispatch(addTask(taskText.trim()));
    setTaskText('');
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Task App with Redux Toolkit</h1>
        <p className="subtitle">Shembull me task slice dhe RTK Query</p>

        <div className="row">
          <input
            type="text"
            placeholder="Shkruaj nje task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <h2>Task-at nga Redux</h2>
        {tasks.length === 0 ? (
          <p className="empty">Nuk ka task-e ende.</p>
        ) : (
          <ul className="list">
            {tasks.map((task, index) => (
              <li key={`${task}-${index}`} className="item">
                <span>{task}</span>
                <button className="delete" onClick={() => dispatch(removeTask(index))}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <h2>Task-at nga RTK Query</h2>
        {isLoading && <p className="empty">Duke u ngarkuar...</p>}
        {isError && <p className="empty">Ndodhi nje gabim.</p>}
        {!isLoading && !isError && apiTasks && (
          <ul className="list">
            {apiTasks.slice(0, 5).map((task) => (
              <li key={task.id} className="item">
                <span>{task.title}</span>
                <span className={task.completed ? 'done' : 'pending'}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
