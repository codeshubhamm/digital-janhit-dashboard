
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, UserCheck, BarChart3, Calendar, FileText, Settings } from 'lucide-react';

// Import all components
import LiveDashboard from '@/components/LiveDashboard';
import RealStudentManagement from '@/components/RealStudentManagement';
import StudentManagement from '@/components/StudentManagement';
import TeacherManagement from '@/components/TeacherManagement';
import RealBatchManagement from '@/components/RealBatchManagement';
import AttendanceModule from '@/components/AttendanceModule';
import StatisticsSection from '@/components/StatisticsSection';
import DailyReports from '@/components/DailyReports';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'batches', label: 'Batches', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Daily Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigation = (section: string) => {
    setActiveTab(section);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <LiveDashboard onNavigate={handleNavigation} />;
      case 'students':
        return <RealStudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'batches':
        return <RealBatchManagement />;
      case 'attendance':
        return <AttendanceModule />;
      case 'analytics':
        return <StatisticsSection />;
      case 'reports':
        return <DailyReports />;
      case 'settings':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Panel</h3>
              <p className="text-gray-600">Configure application settings and preferences.</p>
            </CardContent>
          </Card>
        );
      default:
        return <LiveDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar className="border-r border-white/20 bg-white/80 backdrop-blur-md">
          <SidebarContent>
            <div className="p-6 border-b border-white/20">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Literacy
              </h2>
              <p className="text-sm text-gray-600 mt-1">Admin Dashboard</p>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-500 font-semibold">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                            : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 relative z-10">
                          <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                            activeTab === item.id ? 'text-white' : 'text-gray-600'
                          }`} />
                          <span className={`font-medium ${
                            activeTab === item.id ? 'text-white' : 'text-gray-700'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                        {activeTab === item.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-blue-50 transition-colors duration-200" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {activeTab === 'dashboard' && 'Overview of your digital literacy program'}
                    {activeTab === 'students' && 'Manage student information and enrollment'}
                    {activeTab === 'teachers' && 'Manage teaching staff and assignments'}
                    {activeTab === 'batches' && 'Organize and schedule learning batches'}
                    {activeTab === 'attendance' && 'Track and manage student attendance'}
                    {activeTab === 'analytics' && 'View detailed analytics and reports'}
                    {activeTab === 'reports' && 'Daily reports and task management'}
                    {activeTab === 'settings' && 'Application settings and configuration'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
