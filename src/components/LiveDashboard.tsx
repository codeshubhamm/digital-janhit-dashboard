
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
    <div className="space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen p-6">
      {/* Simplified Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Digital Literacy Dashboard</h2>
            <p className="text-blue-100">Real-time insights and analytics</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: students.length, icon: Users },
            { label: 'Teachers', value: teachers.length, icon: GraduationCap },
            { label: 'Active Batches', value: batches.length, icon: BookOpen },
            { label: 'Attendance Rate', value: `${Math.round(attendanceStats.attendanceRate)}%`, icon: Target }
          ].map((stat) => (
            <div key={stat.label} className="p-3 bg-white/10 rounded-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
                <stat.icon className="w-6 h-6 text-white/80" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Navigate to different sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'add-student', label: 'Add Student', icon: Users, color: 'bg-emerald-500 hover:bg-emerald-600' },
              { id: 'mark-attendance', label: 'Mark Attendance', icon: CheckCircle, color: 'bg-blue-500 hover:bg-blue-600' },
              { id: 'view-reports', label: 'Daily Reports', icon: BookOpen, color: 'bg-purple-500 hover:bg-purple-600' },
              { id: 'manage-batches', label: 'Manage Batches', icon: GraduationCap, color: 'bg-orange-500 hover:bg-orange-600' }
            ].map((action) => (
              <Button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className={`h-20 ${action.color} text-white border-0 rounded-lg transition-colors duration-200`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Graph Section */}
      <EnhancedGraphs />

      {/* Today's Schedule */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
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
          <div className="space-y-3">
            {todaySchedule.map((session) => (
              <div 
                key={session.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <p className="text-gray-600">{session.time} • {session.room}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {session.students} students
                  </Badge>
                  <Badge variant={session.type === 'coding' ? 'default' : 'secondary'}>
                    {session.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
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
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px' 
                  }} 
                />
                <Area type="monotone" dataKey="performance" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPerformance)" />
                <Area type="monotone" dataKey="satisfaction" stroke="#10B981" fillOpacity={1} fill="url(#colorSatisfaction)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
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
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Active Students', 
            value: students.filter(s => s.is_active).length, 
            icon: Users, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            percentage: Math.round((students.filter(s => s.is_active).length / students.length) * 100)
          },
          { 
            title: 'Attendance Rate', 
            value: `${Math.round(attendanceStats.attendanceRate)}%`, 
            icon: CheckCircle, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50',
            subtext: `${attendanceStats.totalRecords} records`
          },
          { 
            title: 'Daily Reports', 
            value: reports.length, 
            icon: BookOpen, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50',
            action: true
          }
        ].map((stat) => (
          <Card key={stat.title} className={`shadow-lg ${stat.bg}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  {stat.percentage && (
                    <p className="text-xs text-gray-500 mt-1">{stat.percentage}% of total</p>
                  )}
                  {stat.subtext && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-white/50">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              {stat.action && (
                <Button 
                  onClick={handleAddQuickReport}
                  size="sm" 
                  className="mt-3 w-full bg-purple-500 hover:bg-purple-600"
                >
                  Add Quick Report
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div 
                key={report.id} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
                <Badge variant="outline">
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
