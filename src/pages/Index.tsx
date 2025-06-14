import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, GraduationCap, Calendar, BookOpen, FileText, BarChart3, Settings, LogOut, Plus, Bell, Sun, Moon, Menu, X, Code2, Download, CheckCircle } from 'lucide-react';
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

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600', badge: null },
    { id: 'students', label: 'Students', icon: Users, color: 'text-green-600', badge: sampleStudents.length },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, color: 'text-purple-600', badge: teachers.length },
    { id: 'batches', label: 'Batches', icon: BookOpen, color: 'text-orange-600', badge: batches.length },
    { id: 'attendance', label: 'Attendance', icon: Calendar, color: 'text-red-600', badge: null },
    { id: 'reports', label: 'Daily Reports', icon: FileText, color: 'text-indigo-600', badge: null },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-pink-600', badge: null },
    { id: 'export', label: 'Data Management', icon: Download, color: 'text-teal-600', badge: null },
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
    
    // Auto-close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
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

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Enhanced Header with Real-time Data */}
      <header className="bg-white dark:bg-gray-800 shadow-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Digital Literacy Program</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Janhit Sanstha • Live Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Real-time Stats in Header */}
              <div className="hidden md:flex items-center space-x-6 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{sampleStudents.length}</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{batches.length}</div>
                  <div className="text-xs text-gray-500">Batches</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(sampleStudents.reduce((acc, s) => acc + s.attendance, 0) / sampleStudents.length)}%
                  </div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
              </div>

              <QuickActionButtons onAction={handleTabChange} />
              
              {/* Enhanced Dark Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                <Sun className="w-4 h-4 text-gray-500" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              
              {/* Enhanced Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-blue-100 dark:hover:bg-gray-700"
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              {/* Enhanced User Profile */}
              <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                <Avatar className="border-2 border-blue-200 dark:border-blue-400">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">BD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Bharat Dorshettiwar</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Project Coordinator</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Enhanced Sidebar with Live Data */}
        <div className={`fixed lg:relative lg:translate-x-0 transform transition-all duration-300 ease-in-out z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80`}>
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700">
            {/* Sidebar Header with Live Stats */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h3 className="text-lg font-semibold mb-3">Today's Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{sampleStudents.filter(s => s.status === 'Active').length}</div>
                  <div className="text-blue-100">Active Students</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{batches.filter(b => b.status === 'Active').length}</div>
                  <div className="text-blue-100">Running Batches</div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto custom-scrollbar">
              <nav className="mt-5 flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl w-full transition-all duration-200 transform hover:scale-105 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`mr-4 h-6 w-6 transition-colors ${activeTab === item.id ? 'text-white' : item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge !== null && (
                          <Badge 
                            variant={activeTab === item.id ? "secondary" : "outline"} 
                            className={`text-xs ${activeTab === item.id ? 'bg-white/20 text-white' : ''}`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {activeTab === item.id && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
              
              {/* Enhanced Sidebar Footer */}
              <div className="mt-8 px-4 space-y-4">
                {/* Live Status Card */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">System Status</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-700 dark:text-green-300">All Systems Online</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-0">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Need Help?</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">Contact support for assistance</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Get Support
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Enhanced Credits Card */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border-0">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Developed by</h3>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Shubham Gungunwar</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                    <div className="mt-2 text-xs text-gray-400">v2.1.0 • 2024</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Enhanced Main Content */}
        <div className="flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none custom-scrollbar">
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto">
                {/* Content with enhanced transitions */}
                <div className="animate-fade-in">
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
            </div>
          </main>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <div className="grid grid-cols-4 gap-1 p-2">
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center py-3 px-2 rounded-lg transition-all duration-200 touch-target ${
                  activeTab === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 scale-105'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-1" />
                  {item.badge !== null && (
                    <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 text-xs">
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
