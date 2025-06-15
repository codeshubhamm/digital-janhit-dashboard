
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen p-6">
      {/* Enhanced Header with 3D Effects */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Digital Literacy Dashboard</h2>
              <p className="text-blue-100 text-lg">Real-time insights and analytics</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Students', value: students.length, icon: Users, color: 'from-emerald-400 to-cyan-400' },
              { label: 'Teachers', value: teachers.length, icon: GraduationCap, color: 'from-purple-400 to-pink-400' },
              { label: 'Active Batches', value: batches.length, icon: BookOpen, color: 'from-amber-400 to-orange-400' },
              { label: 'Attendance Rate', value: `${Math.round(attendanceStats.attendanceRate)}%`, icon: Target, color: 'from-rose-400 to-red-400' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                  <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions with 3D Hover Effects */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Navigate to different sections with enhanced interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'add-student', label: 'Add Student', icon: Users, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25' },
              { id: 'mark-attendance', label: 'Mark Attendance', icon: CheckCircle, gradient: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/25' },
              { id: 'view-reports', label: 'Daily Reports', icon: BookOpen, gradient: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-500/25' },
              { id: 'manage-batches', label: 'Manage Batches', icon: GraduationCap, gradient: 'from-orange-500 to-red-600', shadow: 'shadow-orange-500/25' }
            ].map((action) => (
              <Button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className={`group relative h-24 bg-gradient-to-br ${action.gradient} hover:scale-110 hover:rotate-2 transform transition-all duration-300 ${action.shadow} hover:shadow-2xl border-0 rounded-2xl overflow-hidden`}
                onMouseEnter={() => setHoveredCard(action.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center justify-center space-y-2 text-white">
                  <action.icon className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold text-sm">{action.label}</span>
                  {hoveredCard === action.id && (
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Graph Section */}
      <EnhancedGraphs />

      {/* Enhanced Today's Schedule */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            Today's Schedule
          </CardTitle>
          <CardDescription className="text-lg">
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
                className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-6">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{session.title}</h4>
                    <p className="text-gray-600 font-medium">{session.time} • {session.room}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="px-3 py-1 text-sm font-semibold">
                    {session.students} students
                  </Badge>
                  <Badge 
                    variant={session.type === 'coding' ? 'default' : 'secondary'}
                    className="px-3 py-1 text-sm font-semibold"
                  >
                    {session.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Analytics with Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Activity className="w-5 h-5 mr-2 text-purple-600" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly progress and satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
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
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area type="monotone" dataKey="performance" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPerformance)" />
                <Area type="monotone" dataKey="satisfaction" stroke="#10B981" fillOpacity={1} fill="url(#colorSatisfaction)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Award className="w-5 h-5 mr-2 text-amber-600" />
              Course Distribution
            </CardTitle>
            <CardDescription>Student enrollment by course type</CardDescription>
          </CardHeader>
          <CardContent>
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
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Active Students', 
            value: students.filter(s => s.is_active).length, 
            icon: Users, 
            color: 'text-emerald-600', 
            bg: 'from-emerald-50 to-teal-50',
            percentage: Math.round((students.filter(s => s.is_active).length / students.length) * 100)
          },
          { 
            title: 'Attendance Rate', 
            value: `${Math.round(attendanceStats.attendanceRate)}%`, 
            icon: CheckCircle, 
            color: 'text-blue-600', 
            bg: 'from-blue-50 to-cyan-50',
            subtext: `${attendanceStats.totalRecords} records`
          },
          { 
            title: 'Daily Reports', 
            value: reports.length, 
            icon: BookOpen, 
            color: 'text-purple-600', 
            bg: 'from-purple-50 to-violet-50',
            action: true
          }
        ].map((stat, index) => (
          <Card 
            key={stat.title}
            className={`group shadow-xl border-0 bg-gradient-to-br ${stat.bg} hover:scale-105 transform transition-all duration-500 cursor-pointer`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </p>
                  {stat.percentage && (
                    <p className="text-xs text-gray-500 mt-2">{stat.percentage}% of total</p>
                  )}
                  {stat.subtext && (
                    <p className="text-xs text-gray-500 mt-2">{stat.subtext}</p>
                  )}
                </div>
                <div className={`p-4 rounded-2xl bg-white/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              {stat.action && (
                <Button 
                  onClick={handleAddQuickReport}
                  size="sm" 
                  className="mt-4 w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 border-0 rounded-xl"
                >
                  Add Quick Report
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Recent Activity */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-lg">Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.slice(0, 5).map((report, index) => (
              <div 
                key={report.id} 
                className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                    {report.title}
                  </p>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
                <Badge variant="outline" className="px-3 py-1 font-medium">
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
