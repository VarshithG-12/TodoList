import React from 'react'
import AuthContext from '../context/AuthContext.jsx'
import { useContext } from 'react'

const SettingsPage = () => {
  let {deleteAccount} = useContext(AuthContext)
  return (
    <>
    <div className='bg-black w-screen h-screen flex flex-col justify-center items-center '>
      <div onClick={deleteAccount} className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-400 text-white p-3 rounded-lg m-5 font-semibold">Delete Account</div>
      <div className='text-white text-4xl'>Other Features coming soon!</div>
    </div>
    
    </>
  )
}

export default SettingsPage
