
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { BarChart3, TrendingUp, Users, Calendar, BookOpen, Target } from 'lucide-react';
import { sampleStudents, batches, teachers } from '@/data/programData';

const EnhancedGraphs = () => {
  const [selectedGraph, setSelectedGraph] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  // Data for different graph types
  const overviewData = [
    { name: 'Students', value: sampleStudents.length, color: '#3B82F6' },
    { name: 'Batches', value: batches.length, color: '#10B981' },
    { name: 'Teachers', value: teachers.length, color: '#F59E0B' },
    { name: 'Completed', value: sampleStudents.filter(s => s.progress >= 90).length, color: '#8B5CF6' }
  ];

  const attendanceData = [
    { month: 'Jan', attendance: 88, target: 90 },
    { month: 'Feb', attendance: 92, target: 90 },
    { month: 'Mar', attendance: 89, target: 90 },
    { month: 'Apr', attendance: 94, target: 90 },
    { month: 'May', attendance: 91, target: 90 },
    { month: 'Jun', attendance: 93, target: 90 }
  ];

  const performanceData = [
    { course: 'Programming', students: 15, avgScore: 87, completion: 92 },
    { course: 'Web Dev Advanced', students: 12, avgScore: 84, completion: 88 },
    { course: 'Web Dev Basic', students: 18, avgScore: 91, completion: 95 }
  ];

  const enrollmentTrend = [
    { month: 'Jan', new: 15, dropouts: 2, active: 45 },
    { month: 'Feb', new: 12, dropouts: 1, active: 56 },
    { month: 'Mar', new: 8, dropouts: 3, active: 61 },
    { month: 'Apr', new: 10, dropouts: 2, active: 69 },
    { month: 'May', new: 6, dropouts: 1, active: 74 },
    { month: 'Jun', new: 4, dropouts: 0, active: 78 }
  ];

  const graphOptions = [
    { value: 'overview', label: 'Program Overview', icon: BarChart3 },
    { value: 'attendance', label: 'Attendance Trends', icon: Calendar },
    { value: 'performance', label: 'Course Performance', icon: Target },
    { value: 'enrollment', label: 'Enrollment Trends', icon: Users },
    { value: 'progress', label: 'Student Progress', icon: TrendingUp }
  ];

  const renderGraph = () => {
    switch (selectedGraph) {
      case 'overview':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={overviewData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {overviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#10B981" name="Average Score" />
              <Bar dataKey="completion" fill="#3B82F6" name="Completion Rate" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'enrollment':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="active" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Active Students" />
              <Area type="monotone" dataKey="new" stackId="2" stroke="#10B981" fill="#10B981" name="New Enrollments" />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'progress':
        const progressData = [
          { range: '90%+', students: sampleStudents.filter(s => s.progress >= 90).length, color: '#10B981' },
          { range: '75-89%', students: sampleStudents.filter(s => s.progress >= 75 && s.progress < 90).length, color: '#3B82F6' },
          { range: '60-74%', students: sampleStudents.filter(s => s.progress >= 60 && s.progress < 75).length, color: '#F59E0B' },
          { range: '<60%', students: sampleStudents.filter(s => s.progress < 60).length, color: '#EF4444' }
        ];
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8884d8">
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const selectedOption = graphOptions.find(option => option.value === selectedGraph);
  const SelectedIcon = selectedOption?.icon || BarChart3;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <SelectedIcon className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle>Interactive Analytics</CardTitle>
              <CardDescription>Explore different aspects of your program data</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedGraph} onValueChange={setSelectedGraph}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select graph type" />
              </SelectTrigger>
              <SelectContent>
                {graphOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {graphOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={selectedGraph === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGraph(option.value)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
        {renderGraph()}
        <div className="mt-4 text-center">
          <Badge variant="outline" className="text-xs">
            {selectedOption?.label} • {timeRange === '1month' ? 'Last Month' : timeRange === '3months' ? 'Last 3 Months' : timeRange === '6months' ? 'Last 6 Months' : 'Last Year'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGraphs;
