// görevlerin listelendiği ve "Görevler"'in altında listenenler.
import '../App.css';
import TaskShow from "./TaskShow";
import { useContext } from 'react';
import TasksContext from '../context/task';


function TaskList() {

    const {tasks} = useContext(TasksContext);

    // taskEleman, tasks içerisinde ki her bir elemana atanan isim
    return ( 
        <div className="task-list">
        {tasks.map((task, index)=> {
            return (
                <TaskShow key={index} task={task} />
            )
        })}
        </div>
     );
}

export default TaskList;