
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <LiveDashboard />;
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
        return <LiveDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">Digital Literacy</h2>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
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
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-900">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-6">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
