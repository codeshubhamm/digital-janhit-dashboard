
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  // Mock data for charts
  const monthlyAdmissions = [
    { month: 'Jan', admissions: 12, completed: 8 },
    { month: 'Feb', admissions: 15, completed: 10 },
    { month: 'Mar', admissions: 18, completed: 12 },
    { month: 'Apr', admissions: 22, completed: 15 },
    { month: 'May', admissions: 28, completed: 18 },
    { month: 'Jun', admissions: 25, completed: 20 },
  ];

  const courseData = [
    { name: 'Web Development', value: 45, color: '#3b82f6' },
    { name: 'Coding', value: 35, color: '#10b981' },
    { name: 'Tally', value: 28, color: '#f59e0b' },
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 95 },
    { day: 'Thu', attendance: 87 },
    { day: 'Fri', attendance: 91 },
    { day: 'Sat', attendance: 89 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back, Mr. Bharat Dorshettiwar</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Clock className="w-3 h-3 mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">108</p>
                <p className="text-xs text-gray-500">+12 this month</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Batches</p>
                <p className="text-3xl font-bold text-green-600">8</p>
                <p className="text-xs text-gray-500">2 starting next week</p>
              </div>
              <BookOpen className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teachers</p>
                <p className="text-3xl font-bold text-yellow-600">6</p>
                <p className="text-xs text-gray-500">All active</p>
              </div>
              <GraduationCap className="h-12 w-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-3xl font-bold text-purple-600">89%</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <Calendar className="h-12 w-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Admissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Admissions & Completions
            </CardTitle>
            <CardDescription>Student enrollment and course completion trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyAdmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Course Distribution
            </CardTitle>
            <CardDescription>Current enrollment by course type</CardDescription>
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

      {/* Weekly Attendance & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Weekly Attendance Trend
            </CardTitle>
            <CardDescription>Daily attendance percentage for current week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Mark Today's Attendance</p>
              <p className="text-xs text-blue-600">3 batches pending</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Review Applications</p>
              <p className="text-xs text-green-600">5 new applications</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Schedule Batch</p>
              <p className="text-xs text-yellow-600">Web Dev batch starting Mon</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Generate Reports</p>
              <p className="text-xs text-purple-600">Monthly summary pending</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
