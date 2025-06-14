
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, GraduationCap, BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, Phone, Mail, Plus, Eye, Edit, BarChart3 } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatisticsSection from './StatisticsSection';

const DashboardOverview = () => {
  const [showStatistics, setShowStatistics] = useState(false);

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

  if (showStatistics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detailed Statistics</h1>
          <Button onClick={() => setShowStatistics(false)} variant="outline">
            Back to Dashboard
          </Button>
        </div>
        <StatisticsSection />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Bharat Sir!</h1>
            <p className="text-blue-100">Here's what's happening with your program today</p>
            <p className="text-blue-200 text-sm mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setShowStatistics(true)} 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
                <p className="text-sm text-green-600">{activeStudents} active</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Batches</p>
                <p className="text-3xl font-bold text-gray-900">{activeBatches}</p>
                <p className="text-sm text-gray-500">of {batches.length} total</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{avgAttendance}%</p>
                <Progress value={avgAttendance} className="mt-2 h-2" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teaching Staff</p>
                <p className="text-3xl font-bold text-gray-900">{totalTeachers}</p>
                <p className="text-sm text-gray-500">active faculty</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
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
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today's Schedule</span>
              <Badge variant="outline">{todaySchedule.length} sessions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={schedule.status === 'ongoing' ? 'default' : 'secondary'}>
                        {schedule.time}
                      </Badge>
                      {schedule.status === 'ongoing' && (
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900">{schedule.batch}</h4>
                    <p className="text-sm text-gray-600">
                      👨‍🏫 {schedule.teacher} • 👥 {schedule.students} students
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
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
