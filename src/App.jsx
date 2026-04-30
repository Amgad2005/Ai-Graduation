import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './Login/Login';
import Dashboard from './Dashbord/Dashboard';
import RegisterCourses from './RegisterCourses/RegisterCourses';
import ChatBot from './ِChatBot/ChatBot';
import { useState } from 'react';
import { FileUploadSection } from './FileUploadSection/FileUploadSection';
import Header from './Header/Header';
import NavigationDrawer from './NavigationDrawer/NavigationDrawer';
import StudentDBPage from './studentdbPage/StudentDBPage';
import Admindb from './admindb/Admindb';
import AdminExceptionsDash from './AdminExceptions/AdminExceptionsDash';
import Request from './Request/Request';

function App() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();

  const handleFileUpload = (files) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };


  const showHeaderPaths = ["/student-db", "/file", "/admin-db" ,"/exceptions"];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* Header */}
      {showHeaderPaths.includes(location.pathname) && (
        <Header onMenuToggle={() => setIsDrawerOpen(true)} />
      )}

      {/* 🔵 Sidebar */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* 🔵 Pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/register" element={<RegisterCourses />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/student-db" element={<StudentDBPage />} />
        <Route path="/admin-db" element={<Admindb />} />
        <Route path="/request" element={<Request/>} />
        <Route path="/exceptions" element={<AdminExceptionsDash />} />
        <Route
          path="/file"
          element={
            <FileUploadSection
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
            />
          }
        />
      </Routes>

    </div>
  );
}

export default App;