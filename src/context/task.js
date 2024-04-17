import React from "react";
import { createContext } from "react";
import axios from 'axios';
import { useState } from "react";

const TasksContext = createContext();

function Provider ({children}) {

    // createTask içerisine gönderilen değerleri array'e atamak için,
  const [tasks, setTasks] = useState([]);

  // TaskCreate'de props'tan gelen title değeri, title'da, taskDesc değeri ise taskDesc'de tutulur.
  const createTask = async (title,taskDesc) => {
    // createdTasks içerisine ...tasks'ın içerisinde ki tüm değerleri geçirdik.

    // api'ye istek atmak
    const response = await axios.post('http://localhost:3003/tasks', {
      title, 
      taskDesc,
    });

    const createdTasks = [...tasks,response.data]; // ...tasks ile verileri aldıktan sonra ,{} açmak verilerin yanına yeni bir veri eklemeye yarar.
    // yukarıda oluşturulmuş ...tasks (title ve taskDesc) - 2 eleman ve bizim oluşturduğumuz elemanla birlikte 3 elemanı setTask içerisine atadık.    
    setTasks(createdTasks);
  };

// api'ye isteğimizi atıyoruz. Daha sonra bunu useEffect içerisinde kullanıyoruz.
const fetchTasks = async () => {
  const response = await axios.get("http://localhost:3003/tasks");
  setTasks(response.data);
}

 // onDelete props'unun func'ını ve db.json'da silinmiş halinin var olması için
 const deleteTaskById = async (id) =>  {
    axios.delete(`http://localhost:3003/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
     })
      setTasks(afterDeletingTasks);
    }
  
    // güncelleme işlemi
    const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3003/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
      const updatedTask = tasks.map((task) => {
        if (task.id == id) {
          return {id, title:updatedTitle,taskDesc:updatedTaskDesc}
        }
        return task;
      });
      setTasks(updatedTask);
    }

    const sharedvaluesAndMethods = {
        tasks,
        createTask,
        fetchTasks,
        editTaskById,
        deleteTaskById,
    }

    return (
        <TasksContext.Provider value={sharedvaluesAndMethods}>
            {children}
        </TasksContext.Provider>
    )
}

export {Provider}
export default TasksContext;