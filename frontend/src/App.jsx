import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx';
import ClassroomPage from './components/ClassroomPage.jsx';
import ClassPage from './components/ClassPage.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [currentPage]); 
  // ✅ Navigation handler with auth protection
  const navigateTo = (page) => {
    const protectedPages = ['classroom', 'class'];

    if (protectedPages.includes(page) && !isAuthenticated) {
      toast.error("You must be logged in to access this page.");
      return;
    }

    setCurrentPage(page);
  };
  
  // ✅ Check login status
  
  // ✅ Join class (also protected)
  const joinClass = (classData) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to join a class.");
      return;
    }

    setSelectedClass(classData);
    setCurrentPage('class');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage navigateTo={navigateTo} />;
      case 'classroom':
        return <ClassroomPage navigateTo={navigateTo} joinClass={joinClass} />;
      case 'class':
        return <ClassPage classData={selectedClass} navigateTo={navigateTo} />;
      default:
        return <Homepage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;