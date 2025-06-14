
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Eye, Users, Calendar, Clock, BookOpen, GraduationCap } from 'lucide-react';

const BatchManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const batches = [
    {
      id: 1,
      batchCode: 'WD-B01',
      courseName: 'Web Development',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      timing: 'Morning (9:00 AM - 12:00 PM)',
      teacher: 'Prof. Amit Kumar',
      totalStudents: 25,
      activeStudents: 23,
      status: 'Active',
      progress: 75,
      location: 'Lab A'
    },
    {
      id: 2,
      batchCode: 'CD-B02',
      courseName: 'Coding',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      timing: 'Evening (2:00 PM - 5:00 PM)',
      teacher: 'Mr. Rahul Patil',
      totalStudents: 20,
      activeStudents: 18,
      status: 'Active',
      progress: 60,
      location: 'Lab B'
    },
    {
      id: 3,
      batchCode: 'TL-B01',
      courseName: 'Tally',
      startDate: '2023-12-01',
      endDate: '2024-03-01',
      timing: 'Morning (10:00 AM - 1:00 PM)',
      teacher: 'Mrs. Priya Desai',
      totalStudents: 15,
      activeStudents: 14,
      status: 'Completed',
      progress: 100,
      location: 'Lab C'
    },
    {
      id: 4,
      batchCode: 'WD-B03',
      courseName: 'Web Development',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      timing: 'Evening (3:00 PM - 6:00 PM)',
      teacher: 'Prof. Amit Kumar',
      totalStudents: 22,
      activeStudents: 22,
      status: 'Active',
      progress: 40,
      location: 'Lab A'
    }
  ];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const AddBatchForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="batchCode">Batch Code *</Label>
          <Input id="batchCode" placeholder="e.g., WD-B04" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="courseName">Course *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="tally">Tally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input id="endDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timing">Batch Timing *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
              <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher">Assign Teacher *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amit-kumar">Prof. Amit Kumar</SelectItem>
              <SelectItem value="priya-desai">Mrs. Priya Desai</SelectItem>
              <SelectItem value="rahul-patil">Mr. Rahul Patil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g., Lab A" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Student Capacity</Label>
          <Input id="capacity" type="number" placeholder="e.g., 25" />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Batch
        </Button>
      </div>
    </form>
  );

  const BatchDetails = ({ batch }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{batch.batchCode}</h3>
          <p className="text-gray-600">{batch.courseName}</p>
        </div>
        <Badge variant={batch.status === 'Active' ? 'default' : batch.status === 'Completed' ? 'secondary' : 'outline'}>
          {batch.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm text-gray-600">Start Date</Label>
              <p className="font-medium">{batch.startDate}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">End Date</Label>
              <p className="font-medium">{batch.endDate}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Timing</Label>
              <p className="font-medium">{batch.timing}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Location</Label>
              <p className="font-medium">{batch.location}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Teacher & Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm text-gray-600">Assigned Teacher</Label>
              <p className="font-medium">{batch.teacher}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Course Progress</Label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{batch.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{batch.totalStudents}</p>
            <p className="text-sm text-gray-600">Total Enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{batch.activeStudents}</p>
            <p className="text-sm text-gray-600">Active Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{batch.progress}%</p>
            <p className="text-sm text-gray-600">Progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Mock student list */}
            {['Priya Sharma', 'Rahul Patil', 'Sunita Jadhav', 'Amit Singh', 'Kavita Desai'].map((student, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{student}</span>
                <Badge variant="outline" className="text-xs">Present</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              View All Students
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Batch Management</h2>
          <p className="text-gray-600">Manage course batches and schedules</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Batch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
              <DialogDescription>
                Set up a new batch with course details and schedule.
              </DialogDescription>
            </DialogHeader>
            <AddBatchForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by batch code, course, or teacher..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Batch Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{batches.length}</p>
            <p className="text-sm text-gray-600">Total Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{batches.filter(b => b.status === 'Active').length}</p>
            <p className="text-sm text-gray-600">Active Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{batches.reduce((sum, b) => sum + b.totalStudents, 0)}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">{batches.filter(b => b.status === 'Completed').length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Batch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{batch.batchCode}</CardTitle>
                  <CardDescription>{batch.courseName}</CardDescription>
                </div>
                <Badge variant={batch.status === 'Active' ? 'default' : batch.status === 'Completed' ? 'secondary' : 'outline'}>
                  {batch.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-600">Teacher</Label>
                  <p className="font-medium">{batch.teacher}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Timing</Label>
                  <p className="font-medium">{batch.timing.split(' ')[0]}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Students</Label>
                  <p className="font-medium">{batch.activeStudents}/{batch.totalStudents}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Progress</Label>
                  <p className="font-medium">{batch.progress}%</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{batch.startDate} - {batch.endDate}</span>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Batch Details</DialogTitle>
                      </DialogHeader>
                      <BatchDetails batch={batch} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBatches.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No batches found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BatchManagement;
