
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Users, GraduationCap, BookOpen, Calendar as CalendarIcon, TrendingUp, AlertCircle, CheckCircle, Clock, Phone, Mail } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardOverview = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Real-time calculations
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

  // Chart data
  const batchData = batches.map(batch => ({
    name: batch.name,
    students: sampleStudents.filter(s => s.batchId === batch.id).length,
    capacity: batch.maxStudents
  }));

  const courseData = [
    { name: 'Coding', value: sampleStudents.filter(s => s.course === 'Programming & Coding').length, color: '#3B82F6' },
    { name: 'Web Advanced', value: sampleStudents.filter(s => s.course === 'Web Development Advanced').length, color: '#10B981' },
    { name: 'Web Basic + Tally', value: sampleStudents.filter(s => s.course === 'Web Development Basic + Tally').length, color: '#F59E0B' }
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 95 },
    { day: 'Thu', attendance: 89 },
    { day: 'Fri', attendance: 94 },
    { day: 'Sat', attendance: 87 }
  ];

  // Today's schedule
  const todaySchedule = [
    { time: '11:00 AM - 1:00 PM', batch: 'Coding Batch', teacher: 'Raj Sir', students: 18, room: 'Lab A' },
    { time: '1:00 PM - 3:00 PM', batch: 'Web 1.2 Batch', teacher: 'Raj Sir', students: 22, room: 'Lab A' },
    { time: '4:00 PM - 6:00 PM', batch: 'Web 1.1 + Tally', teacher: 'Achal Ma\'am & Chirangiv Sir', students: 25, room: 'Lab B' }
  ];

  // Recent activities
  const recentActivities = [
    { type: 'admission', message: 'New student Priya Sharma admitted to Coding Batch', time: '2 hours ago', icon: Users },
    { type: 'completion', message: 'Web 1.2 Batch completed Module 3', time: '4 hours ago', icon: CheckCircle },
    { type: 'alert', message: 'Low attendance alert for 3 students', time: '6 hours ago', icon: AlertCircle },
    { type: 'update', message: 'Batch timings updated for next week', time: '1 day ago', icon: Clock }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Bharat Sir!</h1>
            <p className="text-blue-100 text-lg">Digital Literacy Program Dashboard</p>
            <p className="text-blue-200 text-sm mt-1">Today is {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalStudents}</div>
              <div className="text-blue-200 text-sm">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{activeBatches}</div>
              <div className="text-blue-200 text-sm">Active Batches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Students</p>
                <p className="text-3xl font-bold text-blue-900">{activeStudents}</p>
                <p className="text-blue-500 text-xs mt-1">of {totalStudents} total</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Teachers</p>
                <p className="text-3xl font-bold text-green-900">{totalTeachers}</p>
                <p className="text-green-500 text-xs mt-1">Active faculty</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Avg Attendance</p>
                <p className="text-3xl font-bold text-purple-900">{avgAttendance}%</p>
                <Progress value={avgAttendance} className="mt-2 h-2" />
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Course Progress</p>
                <p className="text-3xl font-bold text-orange-900">{avgProgress}%</p>
                <Progress value={avgProgress} className="mt-2 h-2" />
              </div>
              <div className="p-3 bg-orange-500 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Live batch schedule for {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          {schedule.time}
                        </Badge>
                        <h3 className="font-semibold text-gray-900">{schedule.batch}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        👨‍🏫 {schedule.teacher} • 📍 {schedule.room} • 👥 {schedule.students} students
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Calendar & Recent Activities */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 4).map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-500 mt-0.5" />
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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Students by Batch</CardTitle>
            <CardDescription>Current enrollment vs capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={batchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3B82F6" name="Enrolled" />
                <Bar dataKey="capacity" fill="#E5E7EB" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Students enrolled by course type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Attendance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Trend</CardTitle>
          <CardDescription>Average attendance percentage by day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle>Janhit Sanstha Contact Information</CardTitle>
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
