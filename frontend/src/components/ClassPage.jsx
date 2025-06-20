import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Users, 
  BookOpen, 
  Trophy, 
  FileText, 
  Calendar,
  BarChart,
  MessageCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Share,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const ClassPage = ({ classData, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  if (!classData) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No class selected</h2>
          <button
            onClick={() => navigateTo('classroom')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Back to Classrooms
          </button>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart className="h-5 w-5" /> },
    { id: 'assignments', label: 'Assignments', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'live', label: 'Live Class', icon: <Video className="h-5 w-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="h-5 w-5" /> },
    { id: 'materials', label: 'Materials', icon: <FileText className="h-5 w-5" /> },
  ];

  const assignments = [
    {
      id: 1,
      title: "Chapter 5: Wave Properties",
      dueDate: "Due Tomorrow",
      status: "pending",
      points: 25,
      submissions: "18/23"
    },
    {
      id: 2,
      title: "Lab Report: Interference Patterns",
      dueDate: "Due in 3 days",
      status: "submitted",
      points: 40,
      grade: "A+"
    },
    {
      id: 3,
      title: "Quiz: Optics Fundamentals",
      dueDate: "Completed",
      status: "graded",
      points: 20,
      grade: "B+"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Arjun Sharma", points: 1250, avatar: "AS" },
    { rank: 2, name: "Priya Patel", points: 1180, avatar: "PP" },
    { rank: 3, name: "Rahul Kumar", points: 1150, avatar: "RK" },
    { rank: 4, name: "You", points: 1120, avatar: "YU", isCurrentUser: true },
    { rank: 5, name: "Sneha Singh", points: 1100, avatar: "SS" }
  ];

  const materials = [
    {
      title: "Chapter 5 Notes - Wave Optics",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2 days ago"
    },
    {
      title: "Interference Demo Video",
      type: "MP4",
      size: "45.2 MB",
      uploadDate: "1 week ago"
    },
    {
      title: "Problem Set Solutions",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "3 days ago"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Today's Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Class Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">45 min</div>
                  <div className="text-gray-600">Class Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
                  <div className="text-gray-600">Students Present</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-gray-600">Attendance Rate</div>
                </div>
              </div>
            </div>

            {/* Live Stream Preview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Live Class</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 text-sm font-medium">Live Now</span>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                <div className="relative z-10 text-center">
                  <Play className="h-16 w-16 text-gray-600 mb-4 mx-auto" />
                  <p className="text-gray-900 text-lg font-medium">Wave Optics - Interference Patterns</p>
                  <p className="text-gray-600">Click to join the live class</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isMuted 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isVideoOff 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </button>
                  <button className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Join Live Class
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Recent Assignments</h4>
                <div className="space-y-3">
                  {assignments.slice(0, 2).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 font-medium">{assignment.title}</p>
                        <p className="text-gray-600 text-sm">{assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {assignment.status === 'submitted' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {assignment.status === 'pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                        {assignment.status === 'graded' && <Star className="h-5 w-5 text-blue-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h4>
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((student) => (
                    <div key={student.rank} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold">
                        {student.rank}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{student.name}</p>
                        <p className="text-gray-600 text-sm">{student.points} points</p>
                      </div>
                      {student.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>AI Insights</span>
              </h4>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    📊 Your performance in Wave Optics has improved by 15% this week. Keep up the great work!
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 text-sm">
                    ⚠️ You've missed the last 2 assignments. Consider scheduling a study session to catch up.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    🎯 Based on your progress, you're on track to score an A- on the upcoming exam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Assignments</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
                + New Assignment
              </button>
            </div>
            
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h4>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{assignment.dueDate}</span>
                      </span>
                      <span>{assignment.points} points</span>
                      {assignment.submissions && <span>{assignment.submissions} submitted</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {assignment.status === 'submitted' && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Submitted
                      </span>
                    )}
                    {assignment.status === 'pending' && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                    {assignment.status === 'graded' && (
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Graded
                        </span>
                        <span className="text-2xl font-bold text-gray-900">{assignment.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300">
                  {assignment.status === 'pending' ? 'Start Assignment' : 'View Details'}
                </button>
              </div>
            ))}
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Class Leaderboard</h3>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {leaderboard.map((student, index) => (
                <div
                  key={student.rank}
                  className={`p-6 border-b border-gray-200 last:border-b-0 ${
                    student.isCurrentUser ? 'bg-purple-50' : 'hover:bg-gray-50'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      student.rank <= 3 
                        ? 'bg-yellow-500' 
                        : 'bg-purple-600'
                    } text-white font-bold text-lg`}>
                      {student.rank}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-400 text-white font-bold">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-lg font-bold ${student.isCurrentUser ? 'text-purple-600' : 'text-gray-900'}`}>
                          {student.name}
                        </h4>
                        {student.isCurrentUser && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{student.points} points</p>
                    </div>
                    {student.rank <= 3 && <Trophy className="h-6 w-6 text-yellow-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'materials':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Class Materials</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
                + Upload Material
              </button>
            </div>
            
            {materials.map((material, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-blue-600 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {material.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                      <span>{material.type}</span>
                      <span>{material.size}</span>
                      <span>Uploaded {material.uploadDate}</span>
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('classroom')}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-gray-600">{classData.teacher} • {classData.students} students</p>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;