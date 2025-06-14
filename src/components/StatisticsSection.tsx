
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, GraduationCap, BookOpen, TrendingUp, MapPin, Award, Target, Clock, Phone } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const StatisticsSection = () => {
  // Data calculations
  const totalStudents = sampleStudents.length;
  const activeStudents = sampleStudents.filter(s => s.status === 'Active').length;
  const maleStudents = sampleStudents.filter(s => s.gender === 'Male').length;
  const femaleStudents = sampleStudents.filter(s => s.gender === 'Female').length;
  
  const activeBatches = batches.filter(b => b.status === 'Active').length;
  const totalCapacity = batches.reduce((acc, b) => acc + b.maxStudents, 0);
  const totalEnrolled = batches.reduce((acc, b) => acc + b.currentStudents, 0);
  
  const avgAttendance = Math.round(sampleStudents.reduce((acc, s) => acc + s.attendance, 0) / totalStudents);
  const avgProgress = Math.round(sampleStudents.reduce((acc, s) => acc + s.progress, 0) / totalStudents);
  
  const courseStats = [
    { 
      name: 'Programming & Coding', 
      students: sampleStudents.filter(s => s.course === 'Programming & Coding').length,
      color: '#3B82F6',
      progress: 85
    },
    { 
      name: 'Web Development Advanced', 
      students: sampleStudents.filter(s => s.course === 'Web Development Advanced').length,
      color: '#10B981',
      progress: 78
    },
    { 
      name: 'Web Development Basic + Tally', 
      students: sampleStudents.filter(s => s.course === 'Web Development Basic + Tally').length,
      color: '#F59E0B',
      progress: 92
    }
  ];
  
  const performanceData = [
    { metric: 'Excellent (90%+)', count: sampleStudents.filter(s => s.progress >= 90).length, color: '#10B981' },
    { metric: 'Good (75-89%)', count: sampleStudents.filter(s => s.progress >= 75 && s.progress < 90).length, color: '#3B82F6' },
    { metric: 'Average (60-74%)', count: sampleStudents.filter(s => s.progress >= 60 && s.progress < 75).length, color: '#F59E0B' },
    { metric: 'Below Average (<60%)', count: sampleStudents.filter(s => s.progress < 60).length, color: '#EF4444' }
  ];
  
  const monthlyTrend = [
    { month: 'Jan', enrollments: 15, completions: 0, attendance: 88 },
    { month: 'Feb', enrollments: 12, completions: 2, attendance: 92 },
    { month: 'Mar', enrollments: 8, completions: 5, attendance: 90 },
    { month: 'Apr', enrollments: 10, completions: 3, attendance: 89 },
    { month: 'May', enrollments: 6, completions: 7, attendance: 93 },
    { month: 'Jun', enrollments: 4, completions: 8, attendance: 91 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Program Analytics</h2>
            <p className="text-indigo-100">Comprehensive insights and performance metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{totalStudents}</div>
            <div className="text-indigo-200 text-sm">Total Students</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{activeBatches}</div>
            <div className="text-indigo-200 text-sm">Active Batches</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{avgAttendance}%</div>
            <div className="text-indigo-200 text-sm">Avg Attendance</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold">{Math.round((totalEnrolled/totalCapacity) * 100)}%</div>
            <div className="text-indigo-200 text-sm">Capacity Usage</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <Badge variant="outline">{Math.round((femaleStudents/totalStudents)*100)}% Female</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Student Demographics</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Male:</span>
                <span className="font-medium">{maleStudents}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Female:</span>
                <span className="font-medium">{femaleStudents}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
              <Badge variant="outline">{totalEnrolled}/{totalCapacity}</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Batch Utilization</h3>
            <Progress value={(totalEnrolled/totalCapacity) * 100} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {Math.round((totalEnrolled/totalCapacity) * 100)}% capacity utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <Badge variant="outline">Active</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Teaching Staff</h3>
            <div className="text-2xl font-bold text-purple-600">
              {teachers.filter(t => t.status === 'Active').length}
            </div>
            <p className="text-sm text-gray-600">Active Instructors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-orange-600" />
              <Badge variant="outline">{avgProgress}%</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Avg Performance</h3>
            <Progress value={avgProgress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              Overall student progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Student enrollment and progress by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">{course.name}</h4>
                    <Badge style={{ backgroundColor: course.color, color: 'white' }}>
                      {course.students} students
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
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
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Student classification by progress scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Enrollment, completion, and attendance trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="enrollments" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Enrollments" />
              <Area type="monotone" dataKey="completions" stackId="1" stroke="#10B981" fill="#10B981" name="Completions" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Program Duration</h3>
            <div className="text-2xl font-bold text-blue-600">6 Months</div>
            <p className="text-gray-600 text-sm">Average completion time</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Success Rate</h3>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((sampleStudents.filter(s => s.progress >= 75).length / totalStudents) * 100)}%
            </div>
            <p className="text-gray-600 text-sm">Students with 75%+ progress</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Support</h3>
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <p className="text-gray-600 text-sm">Student support availability</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsSection;
