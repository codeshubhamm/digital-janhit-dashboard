
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, Download, Filter, Save, Check, X, Clock, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const AttendanceModule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [attendanceData, setAttendanceData] = useState({});

  const batches = [
    { id: 'wd-b01', name: 'WD-B01', course: 'Web Development', students: 25 },
    { id: 'cd-b02', name: 'CD-B02', course: 'Coding', students: 20 },
    { id: 'tl-b01', name: 'TL-B01', course: 'Tally', students: 15 },
  ];

  const students = [
    { id: 1, name: 'Priya Sharma', batch: 'WD-B01', rollNo: 'WD001' },
    { id: 2, name: 'Rahul Patil', batch: 'WD-B01', rollNo: 'WD002' },
    { id: 3, name: 'Sunita Jadhav', batch: 'WD-B01', rollNo: 'WD003' },
    { id: 4, name: 'Amit Singh', batch: 'WD-B01', rollNo: 'WD004' },
    { id: 5, name: 'Kavita Desai', batch: 'WD-B01', rollNo: 'WD005' },
    { id: 6, name: 'Ravi Kumar', batch: 'CD-B02', rollNo: 'CD001' },
    { id: 7, name: 'Neha Patel', batch: 'CD-B02', rollNo: 'CD002' },
    { id: 8, name: 'Vikram Joshi', batch: 'TL-B01', rollNo: 'TL001' },
  ];

  const attendanceHistory = [
    { date: '2024-06-10', batch: 'WD-B01', present: 23, absent: 2, percentage: 92 },
    { date: '2024-06-09', batch: 'WD-B01', present: 22, absent: 3, percentage: 88 },
    { date: '2024-06-08', batch: 'WD-B01', present: 24, absent: 1, percentage: 96 },
    { date: '2024-06-10', batch: 'CD-B02', present: 18, absent: 2, percentage: 90 },
    { date: '2024-06-09', batch: 'CD-B02', present: 17, absent: 3, percentage: 85 },
  ];

  const filteredStudents = selectedBatch === 'all' 
    ? students 
    : students.filter(student => student.batch === selectedBatch);

  const handleAttendanceToggle = (studentId, isPresent) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const saveAttendance = () => {
    console.log('Saving attendance for', format(selectedDate, 'yyyy-MM-dd'), attendanceData);
    // Here you would typically save to your backend
    alert('Attendance saved successfully!');
  };

  const exportAttendance = () => {
    // Mock export functionality
    alert('Attendance data exported to Excel!');
  };

  const AttendanceStats = () => {
    const totalStudents = filteredStudents.length;
    const presentCount = Object.values(attendanceData).filter(status => status === true).length;
    const absentCount = Object.values(attendanceData).filter(status => status === false).length;
    const percentage = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-sm text-gray-600">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <X className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-sm text-gray-600">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
            <p className="text-sm text-gray-600">Attendance %</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const MarkAttendanceTab = () => (
    <div className="space-y-6">
      {/* Date and Batch Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(selectedDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Select Batch</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="WD-B01">WD-B01 (Web Development)</SelectItem>
                  <SelectItem value="CD-B02">CD-B02 (Coding)</SelectItem>
                  <SelectItem value="TL-B01">TL-B01 (Tally)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={saveAttendance} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      <AttendanceStats />

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance - {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
          <CardDescription>
            {selectedBatch === 'all' ? 'All Batches' : selectedBatch} - Click to mark attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNo} - {student.batch}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={attendanceData[student.id] === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceToggle(student.id, true)}
                      className={attendanceData[student.id] === true ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      variant={attendanceData[student.id] === false ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleAttendanceToggle(student.id, false)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                  <Badge variant={
                    attendanceData[student.id] === true ? "default" :
                    attendanceData[student.id] === false ? "destructive" : "outline"
                  }>
                    {attendanceData[student.id] === true ? "Present" :
                     attendanceData[student.id] === false ? "Absent" : "Not Marked"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AttendanceHistoryTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>View past attendance records and trends</CardDescription>
          </div>
          <Button onClick={exportAttendance} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{record.batch}</p>
                    <p className="text-sm text-gray-600">{record.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{record.present}</p>
                    <p className="text-xs text-gray-500">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{record.absent}</p>
                    <p className="text-xs text-gray-500">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{record.percentage}%</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <Badge variant={record.percentage >= 90 ? "default" : record.percentage >= 75 ? "secondary" : "destructive"}>
                    {record.percentage >= 90 ? "Excellent" : record.percentage >= 75 ? "Good" : "Poor"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
      </div>

      <Tabs defaultValue="mark" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mark" className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Mark Attendance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            View History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mark">
          <MarkAttendanceTab />
        </TabsContent>

        <TabsContent value="history">
          <AttendanceHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceModule;
