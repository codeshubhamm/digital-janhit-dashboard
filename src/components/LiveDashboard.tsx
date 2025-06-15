
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, BookOpen, TrendingUp, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useTeachers } from '@/hooks/useTeachers';
import { useBatches } from '@/hooks/useBatches';
import { useAttendance } from '@/hooks/useAttendance';
import { useDailyReports } from '@/hooks/useDailyReports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const LiveDashboard = () => {
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
    // Generate today's schedule from batches
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
    switch (action) {
      case 'add-student':
        toast({
          title: "Navigation",
          description: "Navigate to Student Management to add new students",
        });
        break;
      case 'mark-attendance':
        toast({
          title: "Navigation", 
          description: "Navigate to Attendance Module to mark attendance",
        });
        break;
      case 'view-reports':
        toast({
          title: "Navigation",
          description: "Navigate to Daily Reports to view and add reports",
        });
        break;
      case 'manage-batches':
        toast({
          title: "Navigation",
          description: "Navigate to Batch Management to manage batches",
        });
        break;
    }
  };

  const handleAddQuickReport = async () => {
    try {
      await addReport({
        title: `Daily Update - ${new Date().toLocaleDateString()}`,
        description: 'Quick daily update added from dashboard',
        task_type: 'daily_update',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding quick report:', error);
    }
  };

  const courseDistribution = [
    { 
      name: 'Programming & Coding', 
      value: students.filter(s => s.course_enrolled === 'coding').length,
      color: '#3B82F6'
    },
    { 
      name: 'Web Dev Advanced', 
      value: students.filter(s => s.course_enrolled === 'web_development_advanced').length,
      color: '#10B981'
    },
    { 
      name: 'Web Dev Basic + Tally', 
      value: students.filter(s => s.course_enrolled === 'web_development_basic_tally').length,
      color: '#F59E0B'
    }
  ];

  const batchStats = batches.map(batch => ({
    name: batch.name,
    students: students.filter(s => s.batch_id === batch.id).length,
    active: students.filter(s => s.batch_id === batch.id && s.is_active).length
  }));

  const genderStats = [
    { name: 'Male', value: students.filter(s => s.gender === 'male').length, color: '#3B82F6' },
    { name: 'Female', value: students.filter(s => s.gender === 'female').length, color: '#EC4899' },
    { name: 'Other', value: students.filter(s => s.gender === 'other').length, color: '#8B5CF6' }
  ];

  if (studentsLoading || teachersLoading || batchesLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Digital Literacy Admin Dashboard</h2>
            <p className="text-blue-100">Real-time overview of your program</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{students.length}</div>
            <div className="text-blue-200 text-sm">Total Students</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{teachers.length}</div>
            <div className="text-blue-200 text-sm">Teachers</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{batches.length}</div>
            <div className="text-blue-200 text-sm">Active Batches</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{Math.round(attendanceStats.attendanceRate)}%</div>
            <div className="text-blue-200 text-sm">Attendance Rate</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => handleQuickAction('add-student')}
              className="h-20 flex flex-col items-center justify-center bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              variant="outline"
            >
              <Users className="w-6 h-6 mb-2" />
              Add Student
            </Button>
            <Button 
              onClick={() => handleQuickAction('mark-attendance')}
              className="h-20 flex flex-col items-center justify-center bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              variant="outline"
            >
              <CheckCircle className="w-6 h-6 mb-2" />
              Mark Attendance
            </Button>
            <Button 
              onClick={() => handleQuickAction('view-reports')}
              className="h-20 flex flex-col items-center justify-center bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              variant="outline"
            >
              <BookOpen className="w-6 h-6 mb-2" />
              Daily Reports
            </Button>
            <Button 
              onClick={() => handleQuickAction('manage-batches')}
              className="h-20 flex flex-col items-center justify-center bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
              variant="outline"
            >
              <GraduationCap className="w-6 h-6 mb-2" />
              Manage Batches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
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
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-gray-600">{session.time} • {session.room}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{session.students} students</Badge>
                  <Badge variant={session.type === 'coding' ? 'default' : 'secondary'}>
                    {session.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Student enrollment by course</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Statistics</CardTitle>
            <CardDescription>Students per batch</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={batchStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3B82F6" name="Total Students" />
                <Bar dataKey="active" fill="#10B981" name="Active Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.is_active).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {Math.round((students.filter(s => s.is_active).length / students.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(attendanceStats.attendanceRate)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Based on {attendanceStats.totalRecords} records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Reports</p>
                <p className="text-2xl font-bold text-purple-600">{reports.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <Button 
              onClick={handleAddQuickReport}
              size="sm" 
              variant="outline" 
              className="mt-2 text-xs"
            >
              Add Quick Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
                <Badge variant="outline">{report.date}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDashboard;
