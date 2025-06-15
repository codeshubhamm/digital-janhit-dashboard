
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStudents } from '@/hooks/useStudents';
import { useTeachers } from '@/hooks/useTeachers';
import { useBatches } from '@/hooks/useBatches';
import { useAttendance } from '@/hooks/useAttendance';
import { useToast } from '@/hooks/use-toast';
import { Users, GraduationCap, BookOpen, UserCheck, Plus, FileText, Download, Bell, Calendar, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalBatches: number;
  todayAttendance: number;
  attendanceRate: number;
}

interface BatchAttendanceData {
  batchName: string;
  attendanceRate: number;
  totalStudents: number;
}

interface WeeklyTrendData {
  date: string;
  attendance: number;
}

const DashboardOverviewPage = () => {
  const { students, loading: studentsLoading } = useStudents();
  const { teachers, loading: teachersLoading } = useTeachers();
  const { batches, loading: batchesLoading } = useBatches();
  const { getAttendanceStats } = useAttendance();
  const { toast } = useToast();

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalBatches: 0,
    todayAttendance: 0,
    attendanceRate: 0
  });

  const [batchAttendanceData, setBatchAttendanceData] = useState<BatchAttendanceData[]>([]);
  const [weeklyTrendData, setWeeklyTrendData] = useState<WeeklyTrendData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get basic stats
        const attendanceStats = await getAttendanceStats();
        
        setStats({
          totalStudents: students.length,
          totalTeachers: teachers.length,
          totalBatches: batches.length,
          todayAttendance: attendanceStats.presentCount,
          attendanceRate: attendanceStats.attendanceRate
        });

        // Generate batch-wise attendance data
        const batchData = batches.map(batch => {
          const batchStudents = students.filter(s => s.batch_id === batch.id);
          return {
            batchName: batch.name.replace(' ', '\n'),
            attendanceRate: Math.floor(Math.random() * 20) + 80, // Mock data
            totalStudents: batchStudents.length
          };
        });
        setBatchAttendanceData(batchData);

        // Generate 7-day trend data
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          weekData.push({
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            attendance: Math.floor(Math.random() * 20) + 75
          });
        }
        setWeeklyTrendData(weekData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (!studentsLoading && !teachersLoading && !batchesLoading) {
      fetchDashboardData();
    }
  }, [students, teachers, batches, studentsLoading, teachersLoading, batchesLoading]);

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality activated`,
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Export Started",
      description: "Excel report is being generated...",
    });
  };

  if (studentsLoading || teachersLoading || batchesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Fixed Top Navbar */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100 px-4 sm:px-6 py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Digital Literacy Dashboard</h1>
              <p className="text-sm text-gray-600 font-medium">Janhit Sanstha • Project Coordinator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-700">Live</span>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 sm:p-6 space-y-6 max-h-[calc(100vh-88px)] overflow-hidden">
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: 'Total Students', 
              value: stats.totalStudents, 
              icon: Users, 
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-50',
              textColor: 'text-blue-700'
            },
            { 
              title: 'Teachers', 
              value: stats.totalTeachers, 
              icon: GraduationCap, 
              color: 'from-emerald-500 to-teal-500',
              bgColor: 'bg-emerald-50',
              textColor: 'text-emerald-700'
            },
            { 
              title: 'Active Batches', 
              value: stats.totalBatches, 
              icon: BookOpen, 
              color: 'from-purple-500 to-violet-500',
              bgColor: 'bg-purple-50',
              textColor: 'text-purple-700'
            },
            { 
              title: 'Today Present', 
              value: `${Math.round(stats.attendanceRate)}%`, 
              icon: UserCheck, 
              color: 'from-orange-500 to-red-500',
              bgColor: 'bg-orange-50',
              textColor: 'text-orange-700'
            }
          ].map((stat, index) => (
            <Card key={stat.title} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-2xl sm:text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
          
          {/* Batch Attendance Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                Batch Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={batchAttendanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis 
                    dataKey="batchName" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }} 
                  />
                  <Bar 
                    dataKey="attendanceRate" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Trend Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                7-Day Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { 
                  label: 'Mark Attendance', 
                  icon: UserCheck, 
                  color: 'from-blue-500 to-blue-600',
                  action: 'Mark Attendance'
                },
                { 
                  label: 'Add New Student', 
                  icon: Plus, 
                  color: 'from-emerald-500 to-emerald-600',
                  action: 'Add Student'
                },
                { 
                  label: 'Generate Report', 
                  icon: FileText, 
                  color: 'from-purple-500 to-purple-600',
                  action: 'Generate Report'
                },
                { 
                  label: 'Export to Excel', 
                  icon: Download, 
                  color: 'from-orange-500 to-orange-600',
                  action: 'Export Excel'
                }
              ].map((action, index) => (
                <Button
                  key={action.label}
                  onClick={() => action.label === 'Export to Excel' ? handleExportExcel() : handleQuickAction(action.action)}
                  className={`w-full bg-gradient-to-r ${action.color} hover:scale-105 text-white border-0 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
              
              {/* Notifications Alert */}
              <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">3 pending notifications</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">Check attendance reports</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
