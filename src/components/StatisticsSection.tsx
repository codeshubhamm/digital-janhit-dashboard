
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, Clock, MapPin, Phone, Award, Target } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const StatisticsSection = () => {
  // Comprehensive data analysis
  const totalStudents = sampleStudents.length;
  const activeStudents = sampleStudents.filter(s => s.status === 'Active').length;
  const maleStudents = sampleStudents.filter(s => s.gender === 'Male').length;
  const femaleStudents = sampleStudents.filter(s => s.gender === 'Female').length;
  
  const activeBatches = batches.filter(b => b.status === 'Active').length;
  const totalCapacity = batches.reduce((acc, b) => acc + b.maxStudents, 0);
  const totalEnrolled = batches.reduce((acc, b) => acc + b.currentStudents, 0);
  
  const avgAttendance = Math.round(sampleStudents.reduce((acc, s) => acc + s.attendance, 0) / totalStudents);
  const avgProgress = Math.round(sampleStudents.reduce((acc, s) => acc + s.progress, 0) / totalStudents);
  
  // Age group analysis
  const ageGroups = [
    { name: '18-22', count: sampleStudents.filter(s => s.age >= 18 && s.age <= 22).length },
    { name: '23-25', count: sampleStudents.filter(s => s.age >= 23 && s.age <= 25).length },
    { name: '26+', count: sampleStudents.filter(s => s.age >= 26).length }
  ];
  
  // Course distribution
  const courseStats = [
    { 
      name: 'Programming & Coding', 
      students: sampleStudents.filter(s => s.course === 'Programming & Coding').length,
      color: '#3B82F6',
      progress: Math.round(sampleStudents.filter(s => s.course === 'Programming & Coding').reduce((acc, s) => acc + s.progress, 0) / sampleStudents.filter(s => s.course === 'Programming & Coding').length)
    },
    { 
      name: 'Web Development Advanced', 
      students: sampleStudents.filter(s => s.course === 'Web Development Advanced').length,
      color: '#10B981',
      progress: Math.round(sampleStudents.filter(s => s.course === 'Web Development Advanced').reduce((acc, s) => acc + s.progress, 0) / sampleStudents.filter(s => s.course === 'Web Development Advanced').length)
    },
    { 
      name: 'Web Development Basic + Tally', 
      students: sampleStudents.filter(s => s.course === 'Web Development Basic + Tally').length,
      color: '#F59E0B',
      progress: Math.round(sampleStudents.filter(s => s.course === 'Web Development Basic + Tally').reduce((acc, s) => acc + s.progress, 0) / sampleStudents.filter(s => s.course === 'Web Development Basic + Tally').length)
    }
  ];
  
  // Location analysis
  const locationStats = sampleStudents.reduce((acc, student) => {
    const village = student.address.split(',')[0].replace('Village ', '');
    acc[village] = (acc[village] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topLocations = Object.entries(locationStats)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Performance metrics
  const performanceData = [
    { metric: 'Excellent (90%+)', count: sampleStudents.filter(s => s.progress >= 90).length, color: '#10B981' },
    { metric: 'Good (75-89%)', count: sampleStudents.filter(s => s.progress >= 75 && s.progress < 90).length, color: '#3B82F6' },
    { metric: 'Average (60-74%)', count: sampleStudents.filter(s => s.progress >= 60 && s.progress < 75).length, color: '#F59E0B' },
    { metric: 'Below Average (<60%)', count: sampleStudents.filter(s => s.progress < 60).length, color: '#EF4444' }
  ];
  
  // Monthly trend (simulated data)
  const monthlyTrend = [
    { month: 'Jan', enrollments: 15, completions: 0, attendance: 88 },
    { month: 'Feb', enrollments: 12, completions: 2, attendance: 92 },
    { month: 'Mar', enrollments: 8, completions: 5, attendance: 90 },
    { month: 'Apr', enrollments: 10, completions: 3, attendance: 89 },
    { month: 'May', enrollments: 6, completions: 7, attendance: 93 },
    { month: 'Jun', enrollments: 4, completions: 8, attendance: 91 }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Comprehensive Statistics</h2>
            <p className="text-indigo-100">Complete analytics and insights for Digital Literacy Program</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalStudents}</div>
            <div className="text-indigo-200 text-sm">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{activeBatches}</div>
            <div className="text-indigo-200 text-sm">Active Batches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <div className="text-indigo-200 text-sm">Avg Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{Math.round((totalEnrolled/totalCapacity) * 100)}%</div>
            <div className="text-indigo-200 text-sm">Capacity Utilization</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Student Demographics</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Male:</span>
                    <span className="font-bold">{maleStudents} ({Math.round((maleStudents/totalStudents)*100)}%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Female:</span>
                    <span className="font-bold">{femaleStudents} ({Math.round((femaleStudents/totalStudents)*100)}%)</span>
                  </div>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Batch Utilization</p>
                <p className="text-2xl font-bold text-green-900">{totalEnrolled}/{totalCapacity}</p>
                <Progress value={(totalEnrolled/totalCapacity) * 100} className="mt-2 h-2" />
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Teaching Staff</p>
                <p className="text-2xl font-bold text-purple-900">{teachers.filter(t => t.status === 'Active').length}</p>
                <p className="text-purple-500 text-xs mt-1">Active Instructors</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Avg Performance</p>
                <p className="text-2xl font-bold text-orange-900">{avgProgress}%</p>
                <Progress value={avgProgress} className="mt-2 h-2" />
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Age Group Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Distribution</CardTitle>
            <CardDescription>Student enrollment by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#10B981" />
                  <Cell fill="#F59E0B" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Course Performance Analysis</CardTitle>
            <CardDescription>Students and progress by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">{course.name}</h4>
                    <Badge style={{ backgroundColor: course.color, color: 'white' }}>
                      {course.students} students
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Average Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Distribution</CardTitle>
            <CardDescription>Classification based on progress scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top student locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">{location.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{location.count} students</span>
                    <Badge variant="outline">{Math.round((location.count/totalStudents)*100)}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Enrollments, completions, and attendance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="enrollments" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="completions" stackId="1" stroke="#10B981" fill="#10B981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#F59E0B" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Program Duration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">6 Months</div>
              <p className="text-blue-600 text-sm">Average course completion time</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Success Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {Math.round((sampleStudents.filter(s => s.progress >= 75).length / totalStudents) * 100)}%
              </div>
              <p className="text-green-600 text-sm">Students with 75%+ progress</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-purple-600" />
              <span>Support Coverage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">24/7</div>
              <p className="text-purple-600 text-sm">Student support availability</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsSection;
