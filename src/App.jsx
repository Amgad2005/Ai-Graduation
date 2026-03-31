import './App.css' 
import { Routes, Route } from "react-router-dom";
import Login from './Login/Login'
import Dashboard from './Dashbord/Dashboard';
import RegisterCourses from './RegisterCourses/RegisterCourses';
import ChatBot from './ِChatBot/ChatBot';
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Dashboard/>} />
      <Route path="/register" element={<RegisterCourses />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
    </div>
  )
}

export default App
