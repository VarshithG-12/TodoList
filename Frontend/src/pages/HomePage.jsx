import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"
import TaskContext from "../context/TaskContext.jsx"
import { useContext, useEffect, useState} from "react"
import AddTaskCard from "../components/AddTaskCard.jsx"



const HomePage = () => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled); 
  };
  let {user} = useContext(AuthContext)
  let {getTask,tasks,deleteAllTasks,deleteCompletedTasks,updateTasks} = useContext(TaskContext)
  useEffect(()=> {
    getTask()
  },[]) 
  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      {/* {user ? <p className="text-4xl text-red-500 font-semibold">hello {user.username}, Welcome to the DashBoard!!</p> : <p className="text-4xl text-red-500 font-semibold">You are not Logged in</p>} */}
      {user ? <div>
      {tasks.length? 
        <div className="flex flex-col justify-center items-center mx-auto w-[90vw] sm:w-[450px]">
          <div className="text-3xl font-bold">Your Tasks</div>
          <ul className="max-w-md divide-y divide-gray-700 border border-gray-500 rounded-2xl p-5 w-[100%] md:w-[450px]">
          {tasks.map((task,index=0) => (
              <li className="py-3 sm:py-4" key={task.id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-gray-900 text-white px-4 py-2">{index = index+1}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                        {task.body}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Deadline:{task.date}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <button title='Mark as completed' onClick={()=>{updateTasks(task.id)}}> 
                        {!task.is_Completed ? <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true"viewBox="0 0 22 22" fill="currentColor" className="w-6 h-6 mr-2 text-black dark:text-black flex-shrink-0"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" /></svg>
                        :<svg className="w-6 h-6 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 22"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                        }
                        </button>
                    </div>
                  </div>
              </li>
          ))}
        </ul> 
      </div>:<p className="m-5 text-4xl text-center">No tasks to Display</p>
      }
      <div className="flex flex-col justify-center mx-auto w-[90vw] sm:w-[450px] md:flex-row"> 
        <Link onClick={deleteCompletedTasks} className="text-white m-2 bg-black hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Delete Completed Tasks</Link>
        <Link onClick={handleToggle} className="text-white m-2 bg-black hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Add New Task</Link>
        <Link onClick={deleteAllTasks} className="text-white m-2 bg-black hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Delete all Tasks</Link>
      </div>
      {isToggled ? <AddTaskCard/> : <p></p>}
      </div> : <p className="text-4xl text-red-500 font-semibold">Please Login</p>}

      </div>
  )
}

export default HomePage
