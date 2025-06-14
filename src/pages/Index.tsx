
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
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600', description: 'Overview & Analytics' },
    { id: 'students', label: 'Students', icon: Users, color: 'text-green-600', description: 'Manage Students' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, color: 'text-purple-600', description: 'Faculty Management' },
    { id: 'batches', label: 'Batches', icon: BookOpen, color: 'text-orange-600', description: 'Course Batches' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, color: 'text-red-600', description: 'Track Attendance' },
    { id: 'reports', label: 'Reports', icon: BarChart3, color: 'text-indigo-600', description: 'Generate Reports' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-pink-600', description: 'File Management' },
    { id: 'export', label: 'Export Data', icon: Download, color: 'text-teal-600', description: 'Data Export' },
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
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Modern Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">Digital Literacy Admin</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Janhit Sanstha</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-600">{activeStudents}</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-600">{avgAttendance}%</div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
              </div>

              <QuickActionButtons onAction={handleTabChange} />
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gray-500" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationClick}>
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">BD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bharat D.</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-4rem)] overflow-hidden`}>
          <div className="p-4">
            {!sidebarCollapsed && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Overview</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                    <div className="font-bold text-blue-600">{sampleStudents.length}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                    <div className="font-bold text-green-600">{batches.length}</div>
                    <div className="text-xs text-gray-500">Batches</div>
                  </div>
                </div>
              </div>
            )}

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} ${activeTab === item.id ? 'text-blue-600' : item.color}`} />
                    {!sidebarCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>

            {!sidebarCollapsed && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {menuItems.find(item => item.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {menuItems.find(item => item.id === activeTab)?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
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
