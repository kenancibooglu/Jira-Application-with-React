// inputtan girilen 5 eleman varsa bunu bastırmam gerekiyor. Bu işi yapan component

import { useState } from 'react';
import '../App.css';
import TaskCreate from './TaskCreate';
import { useContext } from 'react';
import TasksContext from '../context/task';


function TaskShow({task}) {

    const {editTaskById, deleteTaskById} = useContext(TasksContext);

    const [showEdit,setShowEdit] = useState(false);
    // her bir eleman için id değeri vardır.
    // silme işlemi yapmak için bu id değerleri üzerinden silme işlemi gerçekleştireceğiz.
    const handleDeleteClick = () => {
        // onDelete(taskProp.id);
        deleteTaskById(task.id)
    }

    // tıkladığımda ekranda gösterilmesini istiyorum.
    const handleEditClick = () => {
        setShowEdit(!showEdit); // true'da yazabiliriz.
    }

    const handleSubmit = (id,updatedTitle,updatedTaskDesc) => {
        setShowEdit(false);
        // onUpdate(id,updatedTitle,updatedTaskDesc);
        editTaskById(id, updatedTitle, updatedTaskDesc);
    }

    console.log(task);
    return ( 
        <div className="task-show">


            {/* showEdit true ise <></> içerisindekiler eğer false ise <div> içerisindekileri göster diyoruz. */}
            
            {showEdit ? (
             
             <TaskCreate task={task} taskformUpdate={true} onUpdate={handleSubmit}/>
    
             ): ( <div>
            <h3 className='task-title'>Göreviniz:</h3>
            <p>{task.title}</p>
            <h3 className='task-title'>Yapılacaklar:</h3>
            <p>{task.taskDesc}</p>
            <div>
                <button className='deleteButton' onClick={handleDeleteClick}>Sil</button>
                <button className='updateButton' onClick={handleEditClick}>Güncelle</button>
            </div>
            </div>)}

           
            
        </div> 
        
    );
}

export default TaskShow;