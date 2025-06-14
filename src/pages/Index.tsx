
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Calendar, BookOpen, FileText, BarChart3, Settings, LogOut, Plus } from 'lucide-react';
import DashboardOverview from '@/components/DashboardOverview';
import StudentManagement from '@/components/StudentManagement';
import TeacherManagement from '@/components/TeacherManagement';
import BatchManagement from '@/components/BatchManagement';
import AttendanceModule from '@/components/AttendanceModule';
import DailyReports from '@/components/DailyReports';
import DocumentsModule from '@/components/DocumentsModule';
import LoginForm from '@/components/LoginForm';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'batches', label: 'Batches', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'reports', label: 'Daily Reports', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digital Literacy Program</h1>
                <p className="text-sm text-gray-500">Janhit Sanstha</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>BD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Bharat Dorshettiwar</p>
                <p className="text-xs text-gray-500">Project Coordinator</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsLoggedIn(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            {menuItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 pb-20 md:pb-4">
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'students' && <StudentManagement />}
            {activeTab === 'teachers' && <TeacherManagement />}
            {activeTab === 'batches' && <BatchManagement />}
            {activeTab === 'attendance' && <AttendanceModule />}
            {activeTab === 'reports' && <DailyReports />}
            {activeTab === 'documents' && <DocumentsModule />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
