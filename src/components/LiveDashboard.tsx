
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, BookOpen, TrendingUp, Clock, CheckCircle, AlertCircle, Calendar, ArrowRight, Target, Award, Activity } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useTeachers } from '@/hooks/useTeachers';
import { useBatches } from '@/hooks/useBatches';
import { useAttendance } from '@/hooks/useAttendance';
import { useDailyReports } from '@/hooks/useDailyReports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import EnhancedGraphs from './EnhancedGraphs';

interface LiveDashboardProps {
  onNavigate?: (section: string) => void;
}

const LiveDashboard = ({ onNavigate }: LiveDashboardProps) => {
  const { students, loading: studentsLoading } = useStudents();
  const { teachers, loading: teachersLoading } = useTeachers();
  const { batches, loading: batchesLoading } = useBatches();
  const { getAttendanceStats } = useAttendance();
  const { reports, addReport } = useDailyReports();
  const { toast } = useToast();

  const [attendanceStats, setAttendanceStats] = useState({
    totalRecords: 0,
    presentCount: 0,
    absentCount: 0,
    attendanceRate: 0
  });

  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getAttendanceStats();
      setAttendanceStats(stats);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = batches.map(batch => ({
      id: batch.id,
      time: `${batch.start_time} - ${batch.end_time}`,
      title: batch.name,
      type: batch.batch_type,
      room: batch.room || 'Lab 1',
      students: students.filter(s => s.batch_id === batch.id).length
    }));
    setTodaySchedule(schedule);
  }, [batches, students]);

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      switch (action) {
        case 'add-student':
          onNavigate('students');
          break;
        case 'mark-attendance':
          onNavigate('attendance');
          break;
        case 'view-reports':
          onNavigate('reports');
          break;
        case 'manage-batches':
          onNavigate('batches');
          break;
      }
    }
    
    toast({
      title: "Navigation",
      description: `Navigating to ${action.replace('-', ' ')} section`,
    });
  };

  const handleAddQuickReport = async () => {
    try {
      await addReport({
        title: `Daily Update - ${new Date().toLocaleDateString()}`,
        description: 'Quick daily update added from dashboard',
        task_type: 'daily_update',
        date: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Success",
        description: "Quick report added successfully!",
      });
    } catch (error) {
      console.error('Error adding quick report:', error);
      toast({
        title: "Error",
        description: "Failed to add quick report",
        variant: "destructive",
      });
    }
  };

  const courseDistribution = [
    { 
      name: 'Programming & Coding', 
      value: students.filter(s => s.course_enrolled === 'coding').length,
      color: '#3B82F6'
    },
    { 
      name: 'Web Development', 
      value: students.filter(s => s.course_enrolled === 'web_development').length,
      color: '#10B981'
    },
    { 
      name: 'Tally', 
      value: students.filter(s => s.course_enrolled === 'tally').length,
      color: '#F59E0B'
    },
    { 
      name: 'Web 1:1', 
      value: students.filter(s => s.course_enrolled === 'web_1_1').length,
      color: '#8B5CF6'
    }
  ];

  const batchStats = batches.map(batch => ({
    name: batch.name,
    students: students.filter(s => s.batch_id === batch.id).length,
    active: students.filter(s => s.batch_id === batch.id && s.is_active).length
  }));

  const performanceData = [
    { month: 'Jan', students: 15, performance: 85, satisfaction: 92 },
    { month: 'Feb', students: 18, performance: 88, satisfaction: 89 },
    { month: 'Mar', students: 22, performance: 91, satisfaction: 94 },
    { month: 'Apr', students: 25, performance: 89, satisfaction: 91 },
    { month: 'May', students: 28, performance: 93, satisfaction: 96 },
    { month: 'Jun', students: 30, performance: 95, satisfaction: 98 }
  ];

  if (studentsLoading || teachersLoading || batchesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen p-6 bg-dot-subtle">
      {/* Premium Header with enhanced gradients */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-premium hover:shadow-premium-lg transition-all duration-600 ease-out hover:scale-[1.005]">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:rotate-6 hover:scale-110 transition-all duration-500 ease-out">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Digital Literacy Dashboard</h2>
            <p className="text-blue-100">Real-time insights and analytics</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Students', value: students.length, icon: Users, delay: 0 },
            { label: 'Teachers', value: teachers.length, icon: GraduationCap, delay: 100 },
            { label: 'Active Batches', value: batches.length, icon: BookOpen, delay: 200 },
            { label: 'Attendance Rate', value: `${Math.round(attendanceStats.attendanceRate)}%`, icon: Target, delay: 300 }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-500 ease-out group perspective-1000"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="flex items-center justify-between group-hover:transform group-hover:rotateY-3 transition-transform duration-500 ease-out">
                <div>
                  <div className="text-2xl font-bold group-hover:text-yellow-300 transition-colors duration-500">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
                <stat.icon className="w-7 h-7 text-white/80 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Quick Actions */}
      <Card className="shadow-premium hover:shadow-premium-lg transition-all duration-500 ease-out hover:scale-[1.002]">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Navigate to different sections efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'add-student', label: 'Add Student', icon: Users, color: 'bg-emerald-500 hover:bg-emerald-600', shadow: 'hover:shadow-glow-green-soft', delay: 0 },
              { id: 'mark-attendance', label: 'Mark Attendance', icon: CheckCircle, color: 'bg-blue-500 hover:bg-blue-600', shadow: 'hover:shadow-glow-soft', delay: 75 },
              { id: 'view-reports', label: 'Daily Reports', icon: BookOpen, color: 'bg-purple-500 hover:bg-purple-600', shadow: 'hover:shadow-glow-purple-soft', delay: 150 },
              { id: 'manage-batches', label: 'Manage Batches', icon: GraduationCap, color: 'bg-orange-500 hover:bg-orange-600', shadow: 'hover:shadow-glow-orange-soft', delay: 225 }
            ].map((action, index) => (
              <Button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className={`h-24 ${action.color} ${action.shadow} text-white border-0 rounded-xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-premium-lg group perspective-1000`}
                style={{ animationDelay: `${action.delay}ms` }}
              >
                <div className="flex flex-col items-center space-y-3 group-hover:transform group-hover:rotateX-6 transition-transform duration-500 ease-out">
                  <action.icon className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Interactive Graph Section */}
      <div className="hover:scale-[1.002] transition-all duration-700 ease-out">
        <EnhancedGraphs />
      </div>

      {/* Premium Today's Schedule */}
      <Card className="shadow-premium hover:shadow-premium-lg transition-all duration-500 ease-out hover:scale-[1.002]">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            Today's Schedule
          </CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((session, index) => (
              <div 
                key={session.id} 
                className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border hover:bg-gray-100 transition-all duration-500 ease-out card-hover-premium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-105 transition-all duration-500 ease-out">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-500">{session.title}</h4>
                    <p className="text-gray-600">{session.time} • {session.room}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-500">
                    {session.students} students
                  </Badge>
                  <Badge variant={session.type === 'coding' ? 'default' : 'secondary'} className="group-hover:scale-105 transition-transform duration-500">
                    {session.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-premium hover:shadow-premium-lg transition-all duration-600 ease-out hover:scale-[1.01] group">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Activity className="w-6 h-6 mr-3 text-purple-600 group-hover:scale-110 transition-transform duration-500" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly progress and satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent className="group-hover:transform group-hover:scale-[1.005] transition-transform duration-500">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 16px 64px rgba(0,0,0,0.15)'
                  }} 
                />
                <Area type="monotone" dataKey="performance" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPerformance)" />
                <Area type="monotone" dataKey="satisfaction" stroke="#10B981" fillOpacity={1} fill="url(#colorSatisfaction)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-premium hover:shadow-premium-lg transition-all duration-600 ease-out hover:scale-[1.01] group">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="w-6 h-6 mr-3 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
              Course Distribution
            </CardTitle>
            <CardDescription>Student enrollment by course type</CardDescription>
          </CardHeader>
          <CardContent className="group-hover:transform group-hover:scale-[1.005] transition-transform duration-500">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 16px 64px rgba(0,0,0,0.15)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Premium Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Active Students', 
            value: students.filter(s => s.is_active).length, 
            icon: Users, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            percentage: Math.round((students.filter(s => s.is_active).length / students.length) * 100),
            delay: 0
          },
          { 
            title: 'Attendance Rate', 
            value: `${Math.round(attendanceStats.attendanceRate)}%`, 
            icon: CheckCircle, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50',
            subtext: `${attendanceStats.totalRecords} records`,
            delay: 150
          },
          { 
            title: 'Daily Reports', 
            value: reports.length, 
            icon: BookOpen, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50',
            action: true,
            delay: 300
          }
        ].map((stat, index) => (
          <Card 
            key={stat.title} 
            className={`shadow-premium ${stat.bg} hover:shadow-premium-lg card-hover-premium group perspective-1000`}
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <CardContent className="p-8 group-hover:transform group-hover:rotateY-3 transition-transform duration-500 ease-out">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color} group-hover:scale-105 transition-transform duration-500`}>
                    {stat.value}
                  </p>
                  {stat.percentage && (
                    <p className="text-xs text-gray-500 mt-1">{stat.percentage}% of total</p>
                  )}
                  {stat.subtext && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-white/50 group-hover:bg-white group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-out">
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
              {stat.action && (
                <Button 
                  onClick={handleAddQuickReport}
                  size="sm" 
                  className="mt-4 w-full bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-all duration-500 ease-out"
                >
                  Add Quick Report
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Recent Activity */}
      <Card className="shadow-premium hover:shadow-premium-lg transition-all duration-500 ease-out hover:scale-[1.002]">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.slice(0, 5).map((report, index) => (
              <div 
                key={report.id} 
                className="flex items-center space-x-4 p-5 bg-gray-50 rounded-xl border hover:bg-gray-100 transition-all duration-500 ease-out card-hover-premium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-105 transition-all duration-500 ease-out">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-500">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
                <Badge variant="outline" className="group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors duration-500">
                  {report.date}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDashboard;
