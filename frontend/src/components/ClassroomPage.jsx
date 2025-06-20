import React, { useState } from 'react';
import {
  Plus, Search, Clock, Users, Play, BookOpen,
  Beaker, Calculator, Globe, Music, Palette, Trophy
} from 'lucide-react';

const ClassroomPage = ({ navigateTo, joinClass }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    subject: '',
    room: '',
  });
  const [joinCode, setJoinCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "DBMS",
      teacher: "Ms. Asha",
      subject: "Science",
      icon: <Beaker className="h-6 w-6" />,
      nextClass: "Tomorrow, 10:30 AM",
      students: 23,
      status: "upcoming",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      name: "Advanced Mathematics",
      teacher: "Mr. Raj",
      subject: "Mathematics",
      icon: <Calculator className="h-6 w-6" />,
      nextClass: "Today, 2:00 PM",
      students: 18,
      status: "today",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      name: "Computer Networks",
      teacher: "Mrs. Singh",
      subject: "CS",
      icon: <BookOpen className="h-6 w-6" />,
      nextClass: "Monday, 11:00 AM",
      students: 31,
      status: "upcoming",
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 4,
      name: "DSA",
      teacher: "Dr. Kumar",
      subject: "CSE",
      icon: <Globe className="h-6 w-6" />,
      nextClass: "Live Now",
      students: 27,
      status: "live",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "DWDM",
      teacher: "Ms. Priya",
      subject: "CS",
      icon: <Music className="h-6 w-6" />,
      nextClass: "Wednesday, 3:30 PM",
      students: 15,
      status: "upcoming",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 6,
      name: "Machine Learning",
      teacher: "Mr. Dev",
      subject: "CSE",
      icon: <Palette className="h-6 w-6" />,
      nextClass: "Friday, 1:00 PM",
      students: 20,
      status: "upcoming",
      color: "from-teal-500 to-cyan-600"
    }
  ]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const newClass = {
      id: classes.length + 1,
      name: formData.name,
      teacher: "You",
      subject: formData.subject,
      icon: <BookOpen className="h-6 w-6" />,
      nextClass: "Not Scheduled",
      students: 0,
      status: "upcoming",
      color: "from-indigo-500 to-blue-600"
    };
    setClasses([newClass, ...classes]);
    setFormData({ name: '', section: '', subject: '', room: '' });
    setIsModalOpen(false);
  };

  const handleJoinClass = (classData) => {
    joinClass(classData);
  };

  const handleJoinWithCode = () => {
    if (joinCode.trim()) {
      joinClass(classes[0]);
      setJoinCode('');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 text-xs font-medium">Live Now</span>
          </div>
        );
      case 'today':
        return <span className="text-orange-600 text-xs font-medium">Today</span>;
      default:
        return <span className="text-gray-500 text-xs font-medium">Upcoming</span>;
    }
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="text-purple-600">Classrooms</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join live classes, access materials, and track your progress all in one place
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Create Class Card */}
          <div
            className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create a Class</h3>
              <p className="text-gray-600 mb-6">Start teaching and engage with students in your virtual classroom</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                + Create Class
              </button>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Create a New Class</h2>
                <div className="space-y-4">
                  <input name="name" placeholder="Class Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  <input name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  <input name="room" placeholder="Room" value={formData.room} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Create</button>
                </div>
              </div>
            </div>
          )}

          {/* Join Class Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join with Code</h3>
              <p className="text-gray-600 mb-6">Enter a class code provided by your teacher to join instantly</p>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter class code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleJoinWithCode}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes, teachers, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-600 font-medium">Top Performer</span>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((classData) => (
            <div
              key={classData.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group cursor-pointer"
              onClick={() => handleJoinClass(classData)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${classData.color} group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{classData.icon}</div>
                </div>
                {getStatusBadge(classData.status)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {classData.name}
              </h3>
              <p className="text-gray-600 mb-4">{classData.teacher}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{classData.nextClass}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{classData.students} students</span>
                </div>
              </div>
              <button
                className={`w-full ${
                  classData.status === 'live'
                    ? 'bg-red-600 hover:bg-red-700'
                    : classData.status === 'today'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
              >
                <Play className="h-5 w-5" />
                <span>
                  {classData.status === 'live' ? 'Join Live' : 'Join Class'}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No classes found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or create a new class to get started.</p>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                Create Your First Class
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomPage;
