import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx';
import ClassroomPage from './components/ClassroomPage.jsx';
import ClassPage from './components/ClassPage.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedClass, setSelectedClass] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const joinClass = (classData) => {
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
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;