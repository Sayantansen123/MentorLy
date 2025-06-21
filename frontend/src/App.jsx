// App.jsx with React Router Integration
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx';
import ClassroomPage from './components/ClassroomPage.jsx';
import ClassPage from './components/ClassPage.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './api/privateRoute.jsx';
import ClassroomVideo from './components/ClassroomVideo.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    
      <div className="min-h-screen bg-gray-50">
        <Navbar />
         <ToastContainer position="top-right" autoClose={3000} />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
           <Route element={<PrivateRoute />}>
           <Route path="/classroom/:channelName" element={<ClassroomVideo />} />
              <Route path="/classroom" element={<ClassroomPage />} />
              <Route path="/class" element={<ClassPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
  
  );
}

// Wrappers for passing props via React Router
function ClassroomPageWrapper() {
  const navigate = useNavigate();

  const joinClass = (classData) => {
    navigate('/class', { state: { classData } });
  };

  return <ClassroomPage navigateTo={navigate} joinClass={joinClass} />;
}

function ClassPageWrapper() {
  const navigate = useNavigate();
  const classData = window.history.state?.usr?.classData || null;

  return <ClassPage classData={classData} navigateTo={navigate} />;
}

export default App;
