import TaskContext from "../context/TaskContext.jsx"
import { useContext } from "react"

const AddtaskCard = () => {
    let {createTask} = useContext(TaskContext)
  return (
    <div className="border border-black w-[2/3] m-5 p-5 rounded-2xl">
        <form onSubmit={createTask}>
          <div className="mb-6">
              <label htmlFor="body" className="block mb-2 font-medium text-gray-900 text-xl">Your Task</label>
              <input type="text" id="body" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[100%]" placeholder="Wash Your Car!" required/>
          </div>
          <div className="mb-6">
              <label htmlFor="date" className="block mb-2 text-xl font-medium text-gray-900"> End Date</label>
              <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5" required/>
          </div>
          <div className="flex flex-row justify-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          </div>
        </form>
    </div>
  )
}

export default AddtaskCard
