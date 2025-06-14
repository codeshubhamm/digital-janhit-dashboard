import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, GraduationCap, Calendar, BookOpen, FileText, BarChart3, Settings, LogOut, Plus, Bell, Sun, Moon, Menu, X, Code2, Download } from 'lucide-react';
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
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { id: 'students', label: 'Students', icon: Users, color: 'text-green-600' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'batches', label: 'Batches', icon: BookOpen, color: 'text-orange-600' },
    { id: 'attendance', label: 'Attendance', icon: Calendar, color: 'text-red-600' },
    { id: 'reports', label: 'Daily Reports', icon: FileText, color: 'text-indigo-600' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-pink-600' },
    { id: 'export', label: 'Export Data', icon: Download, color: 'text-teal-600' },
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

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Enhanced Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Digital Literacy Program</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Janhit Sanstha</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <QuickActionButtons onAction={handleTabChange} />
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gray-500" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="border-2 border-blue-200">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">BD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bharat Dorshettiwar</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Project Coordinator</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Enhanced Sidebar */}
        <div className={`fixed lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarOpen ? 'w-72' : 'w-0'} lg:w-72`}>
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full transition-all duration-200 transform hover:scale-105 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`mr-4 h-6 w-6 transition-colors ${activeTab === item.id ? 'text-white' : item.color}`} />
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </nav>
              
              {/* Sidebar Footer */}
              <div className="mt-8 px-4 space-y-4">
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
                
                {/* Credits Card */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border-0">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Developed by</h3>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Shubham Gungunwar</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Enhanced Main Content */}
        <div className="flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto">
                {/* Content with smooth transitions */}
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center py-3 px-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 scale-105'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
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
