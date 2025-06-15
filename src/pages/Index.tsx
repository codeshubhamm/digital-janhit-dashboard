
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, GraduationCap, Calendar, BookOpen, FileText, BarChart3, Settings, LogOut, Plus, Bell, Sun, Moon, Menu, X, Code2, Download, CheckCircle, Home, UserCheck, Clock, TrendingUp } from 'lucide-react';
import DashboardOverview from '@/components/DashboardOverview';
import RealStudentManagement from '@/components/RealStudentManagement';
import TeacherManagement from '@/components/TeacherManagement';
import RealBatchManagement from '@/components/RealBatchManagement';
import AttendanceModule from '@/components/AttendanceModule';
import DailyReports from '@/components/DailyReports';
import DocumentsModule from '@/components/DocumentsModule';
import ExcelExport from '@/components/ExcelExport';
import LoginForm from '@/components/LoginForm';
import QuickActionButtons from '@/components/QuickActionButtons';
import { useToast } from '@/hooks/use-toast';
import { sampleStudents, teachers, batches } from '@/data/programData';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600', description: 'Overview & Analytics', gradient: 'from-blue-500 to-blue-600' },
    { id: 'students', label: 'Students', icon: Users, color: 'text-green-600', description: 'Manage Students', gradient: 'from-green-500 to-emerald-600' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, color: 'text-purple-600', description: 'Faculty Management', gradient: 'from-purple-500 to-violet-600' },
    { id: 'batches', label: 'Batches', icon: BookOpen, color: 'text-orange-600', description: 'Course Batches', gradient: 'from-orange-500 to-amber-600' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, color: 'text-red-600', description: 'Track Attendance', gradient: 'from-red-500 to-rose-600' },
    { id: 'reports', label: 'Reports', icon: BarChart3, color: 'text-indigo-600', description: 'Generate Reports', gradient: 'from-indigo-500 to-blue-600' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-pink-600', description: 'File Management', gradient: 'from-pink-500 to-rose-600' },
    { id: 'export', label: 'Export Data', icon: Download, color: 'text-teal-600', description: 'Data Export', gradient: 'from-teal-500 to-cyan-600' },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    toast({
      title: "Section Changed",
      description: `Switched to ${menuItems.find(item => item.id === newTab)?.label}`,
      duration: 2000,
    });
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    toast({
      title: "Notifications",
      description: "You have 3 new updates about student attendance and batch schedules.",
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  const activeStudents = sampleStudents.filter(s => s.status === 'Active').length;
  const avgAttendance = Math.round(sampleStudents.reduce((acc, s) => acc + s.attendance, 0) / sampleStudents.length);

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Enhanced Header with Animation */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:scale-110 transition-all duration-200 hover:shadow-md"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-200">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">Digital Literacy Admin</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Janhit Sanstha</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Enhanced Quick Stats with Hover Effects */}
              <div className="hidden md:flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-center group cursor-pointer">
                  <div className="text-sm font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200">{activeStudents}</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-sm font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">{avgAttendance}%</div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
              </div>

              <QuickActionButtons onAction={handleTabChange} />
              
              {/* Enhanced Dark Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full p-2 hover:shadow-md transition-all duration-300">
                <Sun className="w-4 h-4 text-yellow-500 hover:scale-110 transition-transform duration-200" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-indigo-500 hover:scale-110 transition-transform duration-200" />
              </div>
              
              {/* Enhanced Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-110 transition-all duration-200 hover:shadow-md" 
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5 hover:animate-pulse" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs animate-pulse shadow-lg">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              {/* Enhanced User Profile */}
              <div className="flex items-center space-x-2 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-2 transition-all duration-300 hover:shadow-md">
                <Avatar className="w-8 h-8 group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <AvatarFallback className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 text-sm">BD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bharat D.</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)} className="hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar with Smooth Animations */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-500 ease-in-out bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200/50 dark:border-gray-700/50 h-[calc(100vh-4rem)] overflow-hidden shadow-xl`}>
          <div className="p-4">
            {!sidebarCollapsed && (
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Overview</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-3 bg-white/80 dark:bg-gray-700/80 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                    <div className="font-bold text-blue-600">{sampleStudents.length}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 dark:bg-gray-700/80 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                    <div className="font-bold text-green-600">{batches.length}</div>
                    <div className="text-xs text-gray-500">Batches</div>
                  </div>
                </div>
              </div>
            )}

            <nav className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      activeTab === item.id
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105 hover:shadow-md'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Animated background for hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <Icon className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} ${activeTab === item.id ? 'text-white' : item.color} group-hover:scale-110 transition-all duration-200 relative z-10`} />
                    {!sidebarCollapsed && (
                      <div className="flex-1 text-left relative z-10">
                        <div className="font-medium">{item.label}</div>
                        <div className={`text-xs ${activeTab === item.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{item.description}</div>
                      </div>
                    )}
                    
                    {/* Active indicator */}
                    {activeTab === item.id && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            {!sidebarCollapsed && (
              <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">System Status</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">All systems operational</div>
                <div className="mt-3 text-xs text-gray-400">
                  Developed by Shubham Gungunwar
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Enhanced Page Header */}
              <div className="mb-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="group">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                      {menuItems.find(item => item.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {menuItems.find(item => item.id === activeTab)?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 hover:bg-green-100 transition-colors duration-200 animate-pulse">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Online
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content with Stagger Animation */}
              <div className="space-y-6 animate-slide-up">
                {activeTab === 'dashboard' && <DashboardOverview />}
                {activeTab === 'students' && <RealStudentManagement />}
                {activeTab === 'teachers' && <TeacherManagement />}
                {activeTab === 'batches' && <RealBatchManagement />}
                {activeTab === 'attendance' && <AttendanceModule />}
                {activeTab === 'reports' && <DailyReports />}
                {activeTab === 'documents' && <DocumentsModule />}
                {activeTab === 'export' && <ExcelExport />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
