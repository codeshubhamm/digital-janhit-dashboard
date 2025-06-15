
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, UserCheck, BarChart3, Calendar, FileText, Settings, User, LogOut, Bell, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'students', label: 'Students', icon: Users, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, gradient: 'from-purple-500 to-violet-500' },
    { id: 'batches', label: 'Batches', icon: Calendar, gradient: 'from-orange-500 to-red-500' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, gradient: 'from-pink-500 to-rose-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-indigo-500 to-blue-500' },
    { id: 'reports', label: 'Daily Reports', icon: FileText, gradient: 'from-amber-500 to-yellow-500' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-gray-500 to-slate-500' },
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
        <Sidebar className="border-r-0 bg-white shadow-lg">
          <SidebarContent>
            {/* Header Section */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Digital Literacy</h2>
                  <p className="text-sm text-gray-600">Janhit Sanstha</p>
                </div>
              </div>
              <Badge variant="outline" className="w-full justify-center py-1 border-blue-200 text-blue-700">
                Admin Dashboard
              </Badge>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-700 font-semibold text-sm uppercase tracking-wide px-4 py-2">
                Navigation Menu
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu className="space-y-1">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className={`transition-colors duration-200 rounded-lg p-3 h-auto ${
                          activeTab === item.id 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1 rounded-lg ${
                            activeTab === item.id 
                              ? 'bg-white/20' 
                              : 'bg-gray-100'
                          }`}>
                            <item.icon className={`w-4 h-4 ${
                              activeTab === item.id ? 'text-white' : 'text-gray-600'
                            }`} />
                          </div>
                          <span className={`font-medium ${
                            activeTab === item.id ? 'text-white' : 'text-gray-700'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Project Coordinator Account Section */}
            <div className="mt-auto p-4 border-t bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Avatar className="w-10 h-10 border-2 border-emerald-400">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
                    BD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Bharat Dorshettiwar</p>
                  <p className="text-xs text-gray-600">Project Coordinator</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0 hover:bg-emerald-100">
                    <Bell className="w-3 h-3 text-gray-600" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0 hover:bg-red-100">
                    <LogOut className="w-3 h-3 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500">© 2024 Digital Literacy Program</p>
                <p className="text-xs text-gray-400">Janhit Sanstha Initiative</p>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="bg-white/90 backdrop-blur-sm border-b px-6 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-blue-50 transition-colors duration-200 rounded-lg p-2" />
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activeTab === 'dashboard' ? 'bg-blue-500' :
                    activeTab === 'students' ? 'bg-emerald-500' :
                    activeTab === 'teachers' ? 'bg-purple-500' :
                    activeTab === 'batches' ? 'bg-orange-500' :
                    activeTab === 'attendance' ? 'bg-pink-500' :
                    activeTab === 'analytics' ? 'bg-indigo-500' :
                    activeTab === 'reports' ? 'bg-amber-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      {activeTab === 'dashboard' ? 'Welcome back, Bharat Sir!' : menuItems.find(item => item.id === activeTab)?.label}
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
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
                  <span className="text-sm font-semibold text-gray-700">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200/50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-emerald-700">Live</span>
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
