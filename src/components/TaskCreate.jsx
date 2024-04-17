// Formun ana yapısı, Text'ler, input ve buttonlar
import { useState } from 'react';
import '../App.css';
import { useContext } from 'react';
import TasksContext from '../context/task';

function TaskCreate({task, taskformUpdate, onUpdate}) {

    const {editTaskById, createTask} = useContext(TasksContext);
    // input için state
    // içerisinde ki değerleri güncelleye basınca yazılan verileri göstermek için,
    const [title,setTitle] = useState(task ? task.title : "");
    // textarea için state
    const [taskDesc,setTaskDesc] = useState(task ? task.taskDesc : "");

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    function handleTaskChange (e) {
        setTaskDesc(e.target.value);
    }
    // button onSubmit ile formu submit ediyoruz.
    // input ve textarea'ya girilen değerleri props olarak göndermemiz gerekmektedir.

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskformUpdate ) {
             onUpdate(task.id,title,taskDesc);
            //editTaskById(task.id, title, taskDesc)
        }else {
            //onCreate(title,taskDesc);
            createTask(title, taskDesc);
        }
        // props, bu props'a iki tane metod atıyoruz.
        
        setTitle("");
        setTaskDesc("");
    }

    return ( 
        // güncelleye bastığımda gösterilen
        <div>
        {taskformUpdate ? (
        <div className='task-update'> 
         <h3>Lütfen Taskı Düzenleyiniz:</h3>
         <form className="task-form" onSubmit={handleSubmit}> 
       
             <label className='task-label'>Başlık Giriniz:</label>
             <input 
             value={title} 
             onChange={handleChange} 
             className='task-input' 
             type="text"/>
             <label className='task-label'>Task Giriniz:</label>
             <textarea 
             value={taskDesc} 
             onChange={handleTaskChange} 
             rows={5} 
             className='task-input' />
             <button className='task-button update-button'>Düzenle</button>
         </form>
        </div>
        ) : (
        // güncelleye basmadığımda gösterilen 
        <div className='task-create'> 
        <h1 className='jira'>Jira Application</h1>
         <h3 className='ltf-tsk'>Lütfen Task Ekleyiniz!</h3>
         <form className="task-form" onSubmit={handleSubmit}> 
       
             <label className='task-label'>Başlık Giriniz:</label>
             <input 
             value={title} 
             onChange={handleChange} 
             className='task-input' 
             type="text"/>
             <label className='task-label'>Task Giriniz:</label>
             <textarea 
             value={taskDesc} 
             onChange={handleTaskChange} 
             rows={5} 
             className='task-input' />
             <button className='task-button'>Oluştur</button>
             <p><a href='https://github.com/cibo-24'>created by: cibo-24</a></p>
         </form>
       </div>

     )}
     </div>
    );
}


export default TaskCreate;