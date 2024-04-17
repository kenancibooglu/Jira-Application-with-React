import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useEffect, useContext } from 'react';
import TasksContext from './context/task';

function App() {

  const {fetchTasks} = useContext(TasksContext);
  // useEffect ile api
  // boş olan tasks useEffect sayesinde yenilendiğinde halen dolu olur.
  useEffect(()=> {
  fetchTasks();
  }, []); // bir kere render alındığında []

 

  return (
    <div className='App'>
    <TaskCreate />
    <h2 className='duty'>Görevler</h2>
    <TaskList />
    </div>
    
    
  );
}

export default App;
