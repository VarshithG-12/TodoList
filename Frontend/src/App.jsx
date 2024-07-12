import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'
import SettingsPage from './pages/SettingsPage';
import {AuthProvider} from './context/AuthContext'
import { TaskProvider } from './context/TaskContext';
import RegisterPage from './pages/RegisterPage';
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Navbar/>
          <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{
    top: 80
  }}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    style: {
      background: '#fff',
      color: '#363636',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'white',
      },
    },
  }}
/>
          <Routes>
            <Route Component={LoginPage} path='/login'/>
            <Route Component={RegisterPage} path='/register'/>
            <Route Component={HomePage} path='/'/>
            <Route Component={AboutPage} path='/about'/>
            <Route Component={SettingsPage} path='/settings'/>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
