import { createContext,useContext } from "react";
import AuthContext from "./AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
export const TaskProvider = ({children}) =>{
    let [tasks,setTasks] = useState([])
    let {auth,logout,user} = useContext(AuthContext)
    let getTask = async() => {
        let response = await fetch('/api/show/',{
          method:'GET',
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + String(auth.access),}
          }) 
        let data = await response.json()
        if(response.status === 200){
          setTasks(data)
        }
        else if(response.statusText === 'Unauthorized'){
          logout();
        }
      }
    
    let createTask = async(e) => {
        e.preventDefault()
        const originalDateStr = e.target.date.value
        const originalDate = new Date(originalDateStr);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDateStr = originalDate.toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
        let response = await fetch('/api/create/',
        {
            method : "POST",
            headers : {"Content-Type":"application/json","Authorization": "Bearer " + String(auth.access),},
            body : JSON.stringify({"user":user.user_id, "body":e.target.body.value, "date":formattedDateStr, "is_Completed":false})
        })
        if(response.status === 201){
            toast.success("Task added")
            getTask()
        }
        else {
            toast.error("Something went wrong");
        }
    }
    let deleteCompletedTasks = async() => {
        let objects = tasks.filter((tasks)=> tasks.is_Completed)
        if(objects.length!=0){
            let response = await fetch('/api/delete/completed/',
            {
                method : "DELETE",
                headers : {"Content-Type":"application/json","Authorization": "Bearer " + String(auth.access),},
            })
            if(response.status === 204){
                toast.success("Deleted successfuly")
                getTask()
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }
    let deleteAllTasks = async() => {
        if(tasks.length!=0){
            let response = await fetch('/api/delete/',
            {
                method : "DELETE",
                headers : {"Content-Type":"application/json","Authorization": "Bearer " + String(auth.access),},
            })
            if(response.status === 204){
                toast.success("Deleted successfuly")
                getTask()
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }
    let updateTasks = async(id) => {
        let object = tasks.find((tasks)=>tasks.id===id)
        if(object.is_Completed){
            let response = await fetch('/api/update/'+String(id)+'/',
            {  
                method : "PATCH",
                headers : {"Content-Type":"application/json","Authorization": "Bearer " + String(auth.access),},
                body : JSON.stringify({"is_Completed":false})
            })
            if(response.status === 200){
                toast.success("Updated task")
                getTask()
            }
            else{
                toast.error("Something went wrong");
            }
        }
        else if(!object.is_Completed){
            let response = await fetch('/api/update/'+String(id)+'/',
            {  
                method : "PATCH",
                headers : {"Content-Type":"application/json","Authorization": "Bearer " + String(auth.access),},
                body : JSON.stringify({"is_Completed":true})
            })
            if(response.status === 200){
                toast.success("Updated task")
                getTask()
            }
            else{
                toast.error("Something went wrong");
            }
        }
    }
    const TaskData = {
        getTask:getTask,
        tasks:tasks,
        createTask:createTask,
        deleteCompletedTasks:deleteCompletedTasks,
        deleteAllTasks:deleteAllTasks,
        updateTasks:updateTasks,TaskContext
    }
    return (
            <TaskContext.Provider value={TaskData}>{children}</TaskContext.Provider>
        )
}

export default TaskContext