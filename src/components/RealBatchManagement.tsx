
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Clock, Users, GraduationCap, Calendar, Edit, Eye, UserCheck } from 'lucide-react';
import { batches, teachers, sampleStudents } from '@/data/programData';
import { useToast } from '@/hooks/use-toast';

const RealBatchManagement = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const { toast } = useToast();

  const getBatchStudents = (batchId: string) => {
    return sampleStudents.filter(student => student.batchId === batchId);
  };

  const getTeacherById = (teacherId: string) => {
    return teachers.find(teacher => teacher.id === teacherId);
  };

  const BatchCard = ({ batch }) => {
    const batchStudents = getBatchStudents(batch.id);
    const teacher = getTeacherById(batch.teacherId);
    
    return (
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">{batch.name}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">{batch.course}</CardDescription>
            </div>
            <Badge variant={batch.status === 'Active' ? 'default' : 'secondary'} className="text-sm">
              {batch.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Timing</p>
                <p className="font-medium">{batch.timing}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Teacher</p>
                <p className="font-medium">{batch.teacher}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="font-medium">{batchStudents.length} / {batch.maxStudents}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium">{batch.startDate}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedBatch(batch)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{batch.name} - Detailed View</DialogTitle>
                  <DialogDescription>Complete batch information and student list</DialogDescription>
                </DialogHeader>
                <BatchDetails batch={batch} students={batchStudents} teacher={teacher} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Batch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BatchDetails = ({ batch, students, teacher }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            <p className="text-sm text-gray-600">Enrolled Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">
              {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length || 0)}%
            </p>
            <p className="text-sm text-gray-600">Avg Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length || 0)}%
            </p>
            <p className="text-sm text-gray-600">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Name</Label>
              <p className="font-medium">{teacher?.name}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Contact</Label>
              <p className="font-medium">{teacher?.contact}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Subjects</Label>
              <p className="font-medium">{teacher?.subjects.join(', ')}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Experience</Label>
              <p className="font-medium">{teacher?.experience}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.contact} • {student.aadhaar}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Attendance: {student.attendance}%</p>
                  <p className="text-sm text-gray-600">Progress: {student.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AddBatchForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="batchName">Batch Name *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select batch type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coding">Coding Batch</SelectItem>
              <SelectItem value="web-12">Web 1.2 Batch</SelectItem>
              <SelectItem value="web-11-tally">Web 1.1 + Tally Batch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coding">Programming & Coding</SelectItem>
              <SelectItem value="web-advanced">Web Development Advanced</SelectItem>
              <SelectItem value="web-basic-tally">Web Development Basic + Tally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timing">Batch Timing *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning-coding">11:00 AM - 1:00 PM (Coding)</SelectItem>
              <SelectItem value="afternoon-web">1:00 PM - 3:00 PM (Web 1.2)</SelectItem>
              <SelectItem value="evening-combined">4:00 PM - 6:00 PM (Web 1.1 + Tally)</SelectItem>
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
              <SelectItem value="T001">Raj Sir (Coding, Web 1.2)</SelectItem>
              <SelectItem value="T002">Achal Ma'am (Web 1.1)</SelectItem>
              <SelectItem value="T003">Chirangiv Sir (Tally)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxStudents">Maximum Students</Label>
          <Input id="maxStudents" type="number" placeholder="25" />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Batch</Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Batch Management</h2>
          <p className="text-gray-600">Manage all course batches and schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Batch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
              <DialogDescription>Add a new batch to the program</DialogDescription>
            </DialogHeader>
            <AddBatchForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Daily Schedule Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Clock className="w-5 h-5 mr-2" />
            Daily Schedule Overview
          </CardTitle>
          <CardDescription className="text-blue-600">
            All 3 batches running daily at Janhit Sanstha Digital Literacy Program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {batches.map((batch, index) => (
              <div key={batch.id} className={`p-4 rounded-lg border-2 ${
                index === 0 ? 'bg-green-50 border-green-200' :
                index === 1 ? 'bg-yellow-50 border-yellow-200' :
                'bg-purple-50 border-purple-200'
              }`}>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-800">{batch.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{batch.course}</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-700">{batch.timing}</p>
                    <p className="text-sm text-gray-700">👨‍🏫 {batch.teacher}</p>
                    <p className="text-xs text-gray-600">
                      {getBatchStudents(batch.id).length} / {batch.maxStudents} students
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Batch Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{batches.length}</p>
            <p className="text-sm text-gray-600">Total Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">
              {batches.reduce((acc, batch) => acc + getBatchStudents(batch.id).length, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{teachers.length}</p>
            <p className="text-sm text-gray-600">Active Teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-orange-600">6</p>
            <p className="text-sm text-gray-600">Hours Daily</p>
          </CardContent>
        </Card>
      </div>

      {/* All Batches */}
      <Card>
        <CardHeader>
          <CardTitle>All Batches</CardTitle>
          <CardDescription>Complete list of program batches with detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            {batches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealBatchManagement;
