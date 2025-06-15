
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, UserCheck, BarChart3, Calendar, FileText, Settings, User, LogOut, Bell, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Import all components
import DashboardOverviewPage from '@/components/DashboardOverviewPage';
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
        return <DashboardOverviewPage />;
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
            <CardContent className="p-12 text-center">
              <Settings className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Settings Panel</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">Configure application settings and preferences for optimal performance.</p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverviewPage />;
    }
  };

  // If dashboard is selected, render it fullscreen without sidebar
  if (activeTab === 'dashboard') {
    return <DashboardOverviewPage />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar className="border-r-0 bg-white shadow-lg">
          <SidebarContent>
            {/* Header Section */}
            <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">Digital Literacy</h2>
                  <p className="text-sm text-gray-600 font-medium">Janhit Sanstha</p>
                </div>
              </div>
              <Badge variant="outline" className="w-full justify-center py-2 border-blue-200 text-blue-700 font-semibold text-sm">
                Admin Dashboard
              </Badge>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-700 font-bold text-xs uppercase tracking-wider px-6 py-3">
                Navigation Menu
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-3">
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className={`transition-all duration-300 rounded-xl p-4 h-auto ${
                          activeTab === item.id 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-[1.02]` 
                            : 'hover:bg-gray-50 hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-center space-x-4 w-full">
                          <div className={`p-2 rounded-lg ${
                            activeTab === item.id 
                              ? 'bg-white/20' 
                              : 'bg-gray-100'
                          }`}>
                            <item.icon className={`w-5 h-5 ${
                              activeTab === item.id ? 'text-white' : 'text-gray-600'
                            }`} />
                          </div>
                          <span className={`font-semibold text-sm tracking-wide ${
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
            <div className="mt-auto p-6 border-t bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Avatar className="w-12 h-12 border-2 border-emerald-400">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg">
                    BD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm tracking-tight truncate">Bharat Dorshettiwar</p>
                  <p className="text-xs text-gray-600 font-medium">Project Coordinator</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-emerald-100 rounded-lg">
                    <Bell className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-red-100 rounded-lg">
                    <LogOut className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="text-center mt-4 space-y-1">
                <p className="text-xs text-gray-500 font-medium">© 2024 Digital Literacy Program</p>
                <p className="text-xs text-gray-400">Janhit Sanstha Initiative</p>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="bg-white/95 backdrop-blur-sm border-b px-8 py-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-6">
                <SidebarTrigger className="hover:bg-blue-50 transition-colors duration-200 rounded-xl p-3" />
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activeTab === 'students' ? 'bg-emerald-500' :
                    activeTab === 'teachers' ? 'bg-purple-500' :
                    activeTab === 'batches' ? 'bg-orange-500' :
                    activeTab === 'attendance' ? 'bg-pink-500' :
                    activeTab === 'analytics' ? 'bg-indigo-500' :
                    activeTab === 'reports' ? 'bg-amber-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                      {menuItems.find(item => item.id === activeTab)?.label}
                    </h1>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {activeTab === 'students' && 'Manage student information and enrollment records'}
                      {activeTab === 'teachers' && 'Manage teaching staff and their assignments'}
                      {activeTab === 'batches' && 'Organize and schedule learning batches efficiently'}
                      {activeTab === 'attendance' && 'Track and manage student attendance records'}
                      {activeTab === 'analytics' && 'View detailed analytics and comprehensive reports'}
                      {activeTab === 'reports' && 'Daily reports and task management overview'}
                      {activeTab === 'settings' && 'Application settings and system configuration'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 shadow-sm">
                  <span className="text-sm font-semibold text-gray-700 tracking-wide">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50 shadow-sm">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-emerald-700 tracking-wide">Live</span>
                </div>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto bg-gray-50/50">
              <div className="p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
