
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, Edit, Eye, Download, Upload, User, Phone, MapPin, Calendar, BookOpen, Award } from 'lucide-react';

const StudentManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 22,
      gender: 'Female',
      phone: '9876543210',
      aadhaar: '1234-5678-9012',
      guardian: 'Raj Sharma',
      address: 'Village Khadkala, Dist. Ahmednagar',
      course: 'Web Development',
      batch: 'WD-B01',
      admissionDate: '2024-01-15',
      status: 'Active',
      attendance: 95,
      progress: 75,
      photo: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Rahul Patil',
      age: 24,
      gender: 'Male',
      phone: '9876543211',
      aadhaar: '1234-5678-9013',
      guardian: 'Suresh Patil',
      address: 'Village Nimgaon, Dist. Pune',
      course: 'Coding',
      batch: 'CD-B02',
      admissionDate: '2024-02-01',
      status: 'Active',
      attendance: 88,
      progress: 60,
      photo: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Sunita Jadhav',
      age: 26,
      gender: 'Female',
      phone: '9876543212',
      aadhaar: '1234-5678-9014',
      guardian: 'Mohan Jadhav',
      address: 'Village Sangamner, Dist. Ahmednagar',
      course: 'Tally',
      batch: 'TL-B01',
      admissionDate: '2024-01-20',
      status: 'Completed',
      attendance: 92,
      progress: 100,
      photo: '/placeholder.svg'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm) ||
                         student.aadhaar.includes(searchTerm);
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const AddStudentForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" placeholder="Enter full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input id="age" type="number" placeholder="Enter age" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Contact Number *</Label>
          <Input id="phone" placeholder="Enter contact number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aadhaar">Aadhaar Number *</Label>
          <Input id="aadhaar" placeholder="1234-5678-9012" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guardian">Guardian Name *</Label>
          <Input id="guardian" placeholder="Enter guardian name" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea id="address" placeholder="Enter complete address" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="course">Course *</Label>
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
          <Label htmlFor="batch">Assign Batch</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wd-b01">WD-B01 (Morning)</SelectItem>
              <SelectItem value="cd-b02">CD-B02 (Evening)</SelectItem>
              <SelectItem value="tl-b01">TL-B01 (Morning)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Student Photo</Label>
        <div className="flex items-center space-x-2">
          <Input id="photo" type="file" accept="image/*" />
          <Button type="button" variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Add Student
        </Button>
      </div>
    </form>
  );

  const StudentDetails = ({ student }) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={student.photo} />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{student.name}</h3>
          <p className="text-gray-600">{student.course} - {student.batch}</p>
          <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
            {student.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm text-gray-600">Age</Label>
              <p className="font-medium">{student.age} years</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Gender</Label>
              <p className="font-medium">{student.gender}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Guardian</Label>
              <p className="font-medium">{student.guardian}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Aadhaar Number</Label>
              <p className="font-medium">{student.aadhaar}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm text-gray-600">Phone</Label>
              <p className="font-medium">{student.phone}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Address</Label>
              <p className="font-medium">{student.address}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Admission Date</Label>
              <p className="font-medium">{student.admissionDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{student.attendance}%</p>
            <p className="text-sm text-gray-600">Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{student.progress}%</p>
            <p className="text-sm text-gray-600">Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">B+</p>
            <p className="text-sm text-gray-600">Grade</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage all student records and information</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Fill in the student information to create a new profile.
              </DialogDescription>
            </DialogHeader>
            <AddStudentForm />
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
                  placeholder="Search by name, phone, or Aadhaar..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Coding">Coding</SelectItem>
                <SelectItem value="Tally">Tally</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={student.photo} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.course} - {student.batch}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {student.phone}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {student.address.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Attendance: {student.attendance}%</p>
                    <p className="text-sm text-gray-600">Progress: {student.progress}%</p>
                  </div>
                  <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Student Details</DialogTitle>
                        </DialogHeader>
                        <StudentDetails student={student} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentManagement;
