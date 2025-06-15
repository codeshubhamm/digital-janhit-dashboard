
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, GraduationCap, BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, Phone, Mail, Plus, Eye, Edit, BarChart3, Sparkles, Zap, Target, Calendar } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatisticsSection from './StatisticsSection';
import EnhancedGraphs from './EnhancedGraphs';
import { useToast } from '@/hooks/use-toast';

const DashboardOverview = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const { toast } = useToast();

  // Quick calculations
  const totalStudents = sampleStudents.length;
  const activeStudents = sampleStudents.filter(s => s.status === 'Active').length;
  const totalTeachers = teachers.filter(t => t.status === 'Active').length;
  const activeBatches = batches.filter(b => b.status === 'Active').length;
  
  const avgAttendance = Math.round(
    sampleStudents.reduce((acc, student) => acc + student.attendance, 0) / totalStudents
  );
  
  const avgProgress = Math.round(
    sampleStudents.reduce((acc, student) => acc + student.progress, 0) / totalStudents
  );

  // Today's schedule
  const todaySchedule = [
    { time: '11:00 AM - 1:00 PM', batch: 'Coding Batch', teacher: 'Raj Sir', students: 18, status: 'ongoing' },
    { time: '1:00 PM - 3:00 PM', batch: 'Web 1.2 Batch', teacher: 'Raj Sir', students: 22, status: 'upcoming' },
    { time: '4:00 PM - 6:00 PM', batch: 'Web 1.1 + Tally', teacher: 'Achal Ma\'am & Chirangiv Sir', students: 25, status: 'upcoming' }
  ];

  // Quick actions for admin
  const quickActions = [
    { label: 'Add Student', icon: Users, action: 'students', color: 'bg-blue-500' },
    { label: 'Create Batch', icon: BookOpen, action: 'batches', color: 'bg-green-500' },
    { label: 'Mark Attendance', icon: CheckCircle, action: 'attendance', color: 'bg-purple-500' },
    { label: 'Generate Report', icon: BarChart3, action: 'reports', color: 'bg-orange-500' },
  ];

  // Recent activities
  const recentActivities = [
    { type: 'admission', message: 'New student Priya Sharma admitted', time: '2 hours ago', icon: Users, color: 'text-blue-600' },
    { type: 'completion', message: 'Web 1.2 Batch completed Module 3', time: '4 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { type: 'alert', message: 'Low attendance alert for 3 students', time: '6 hours ago', icon: AlertCircle, color: 'text-red-600' },
    { type: 'update', message: 'Batch timings updated', time: '1 day ago', icon: Clock, color: 'text-gray-600' }
  ];

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'students':
        toast({
          title: "Add Student",
          description: "Opening student registration form...",
        });
        // Navigate to student management
        break;
      case 'batches':
        toast({
          title: "Create Batch",
          description: "Opening batch creation form...",
        });
        // Navigate to batch management
        break;
      case 'attendance':
        toast({
          title: "Mark Attendance",
          description: "Opening attendance marking interface...",
        });
        // Navigate to attendance module
        break;
      case 'reports':
        toast({
          title: "Generate Report",
          description: "Opening report generation tool...",
        });
        // Navigate to reports
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: "This feature will be available in the next update.",
        });
    }
  };

  // Handle schedule actions
  const handleScheduleAction = (scheduleIndex: number) => {
    const schedule = todaySchedule[scheduleIndex];
    toast({
      title: `${schedule.batch}`,
      description: `${schedule.teacher} • ${schedule.students} students • ${schedule.time}`,
    });
  };

  // Handle activity click
  const handleActivityClick = (activity: any) => {
    toast({
      title: activity.type.charAt(0).toUpperCase() + activity.type.slice(1),
      description: activity.message,
    });
  };

  if (showGraphs) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Interactive Analytics</h1>
          <Button onClick={() => setShowGraphs(false)} variant="outline" className="hover:scale-105 transition-all duration-200">
            Back to Dashboard
          </Button>
        </div>
        <EnhancedGraphs />
      </div>
    );
  }

  if (showStatistics) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detailed Statistics</h1>
          <Button onClick={() => setShowStatistics(false)} variant="outline" className="hover:scale-105 transition-all duration-200">
            Back to Dashboard
          </Button>
        </div>
        <StatisticsSection />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Section with Gradient Animation */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              <h1 className="text-3xl font-bold mb-2">Welcome back, Bharat Sir!</h1>
            </div>
            <p className="text-blue-100 text-lg mb-2">Here's what's happening with your program today</p>
            <p className="text-blue-200 text-sm flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => setShowGraphs(true)} 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Interactive Graphs
            </Button>
            <Button 
              onClick={() => setShowStatistics(true)} 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Detailed Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics with Stagger Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Students', 
            value: totalStudents, 
            subtitle: `${activeStudents} active`, 
            icon: Users, 
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100'
          },
          { 
            title: 'Active Batches', 
            value: activeBatches, 
            subtitle: `of ${batches.length} total`, 
            icon: BookOpen, 
            color: 'green',
            gradient: 'from-green-500 to-emerald-600',
            bgGradient: 'from-green-50 to-emerald-100'
          },
          { 
            title: 'Avg Attendance', 
            value: `${avgAttendance}%`, 
            subtitle: 'This month', 
            icon: TrendingUp, 
            color: 'purple',
            gradient: 'from-purple-500 to-violet-600',
            bgGradient: 'from-purple-50 to-violet-100',
            showProgress: true
          },
          { 
            title: 'Teaching Staff', 
            value: totalTeachers, 
            subtitle: 'active faculty', 
            icon: GraduationCap, 
            color: 'orange',
            gradient: 'from-orange-500 to-amber-600',
            bgGradient: 'from-orange-50 to-amber-100'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={index}
              className="hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{metric.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>
                    {metric.showProgress && (
                      <Progress value={avgAttendance} className="mt-3 h-2 group-hover:h-3 transition-all duration-300" />
                    )}
                  </div>
                  <div className={`p-4 bg-gradient-to-br ${metric.bgGradient} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <Icon className={`w-8 h-8 text-${metric.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickAction(action.action)}
                  className="h-24 flex-col space-y-3 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 group border-2 hover:border-blue-300"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-200">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Today's Schedule */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Today's Schedule</span>
              </div>
              <Badge variant="outline" className="group-hover:scale-110 transition-transform duration-200">{todaySchedule.length} sessions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <div 
                  key={index} 
                  onClick={() => handleScheduleAction(index)}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105 hover:shadow-md group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={schedule.status === 'ongoing' ? 'default' : 'secondary'} className="group-hover:scale-105 transition-transform duration-200">
                        {schedule.time}
                      </Badge>
                      {schedule.status === 'ongoing' && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse shadow-md">
                          Live
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{schedule.batch}</h4>
                    <p className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                      <span className="flex items-center space-x-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{schedule.teacher}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{schedule.students} students</span>
                      </span>
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-blue-100 hover:scale-110 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activities */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={index} 
                    onClick={() => handleActivityClick(activity)}
                    className="flex items-start space-x-3 p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-200">
                      <Icon className={`w-4 h-4 ${activity.color} group-hover:scale-110 transition-transform duration-200`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Contact Information */}
      <Card className="bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">info@janhitsanstha.org</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
