
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, UserCheck, BarChart3, Calendar, FileText, Settings, User, LogOut, Bell, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Import all components
import DashboardOverview from '@/components/DashboardOverview';
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
        return <DashboardOverview />;
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
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Panel</h3>
              <p className="text-gray-600 max-w-md mx-auto">Configure application settings and preferences for optimal performance.</p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r bg-white shadow-sm">
          <SidebarContent>
            {/* Simplified Header Section */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Digital Literacy</h2>
                  <p className="text-xs text-gray-600">Janhit Sanstha</p>
                </div>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 font-medium text-xs uppercase tracking-wide px-4 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu className="space-y-1">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className={`transition-all duration-200 rounded-lg p-3 h-auto ${
                          activeTab === item.id 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div className={`p-1.5 rounded-md ${
                            activeTab === item.id 
                              ? 'bg-white/20' 
                              : 'bg-gray-100'
                          }`}>
                            <item.icon className={`w-4 h-4 ${
                              activeTab === item.id ? 'text-white' : 'text-gray-600'
                            }`} />
                          </div>
                          <span className={`font-medium text-sm ${
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

            {/* Simplified User Section */}
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm">
                    BD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Bharat Dorshettiwar</p>
                  <p className="text-xs text-gray-600">Coordinator</p>
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-gray-100 transition-colors rounded-lg p-2" />
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
                      {menuItems.find(item => item.id === activeTab)?.label}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {activeTab === 'dashboard' && 'Digital literacy program overview'}
                      {activeTab === 'students' && 'Manage student records'}
                      {activeTab === 'teachers' && 'Manage teaching staff'}
                      {activeTab === 'batches' && 'Organize learning batches'}
                      {activeTab === 'attendance' && 'Track attendance records'}
                      {activeTab === 'analytics' && 'View program analytics'}
                      {activeTab === 'reports' && 'Daily reports and tasks'}
                      {activeTab === 'settings' && 'System configuration'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Badge>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-emerald-700">Live</span>
                </div>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto">
              <div className="p-6">
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
