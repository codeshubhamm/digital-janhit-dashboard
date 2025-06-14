
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Edit, Eye, Phone, Mail, BookOpen, Users, Calendar, Star } from 'lucide-react';

const TeacherManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    {
      id: 1,
      name: 'Prof. Amit Kumar',
      email: 'amit.kumar@email.com',
      phone: '9876543210',
      qualification: 'MCA, B.Tech CSE',
      specialization: 'Web Development, Programming',
      experience: '5 years',
      assignedBatches: ['WD-B01', 'WD-B03'],
      totalStudents: 45,
      rating: 4.8,
      status: 'Active',
      joiningDate: '2023-01-15',
      photo: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Mrs. Priya Desai',
      email: 'priya.desai@email.com',
      phone: '9876543211',
      qualification: 'M.Com, CPA',
      specialization: 'Tally, Accounting',
      experience: '8 years',
      assignedBatches: ['TL-B01', 'TL-B02'],
      totalStudents: 32,
      rating: 4.9,
      status: 'Active',
      joiningDate: '2022-08-20',
      photo: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Mr. Rahul Patil',
      email: 'rahul.patil@email.com',
      phone: '9876543212',
      qualification: 'BCS, Diploma in Programming',
      specialization: 'Python, Java, C++',
      experience: '3 years',
      assignedBatches: ['CD-B02'],
      totalStudents: 28,
      rating: 4.6,
      status: 'Active',
      joiningDate: '2023-06-10',
      photo: '/placeholder.svg'
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddTeacherForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacherName">Full Name *</Label>
          <Input id="teacherName" placeholder="Enter teacher name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacherEmail">Email *</Label>
          <Input id="teacherEmail" type="email" placeholder="Enter email address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacherPhone">Contact Number *</Label>
          <Input id="teacherPhone" placeholder="Enter contact number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="joiningDate">Joining Date *</Label>
          <Input id="joiningDate" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification *</Label>
        <Input id="qualification" placeholder="e.g., MCA, B.Tech CSE" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Specialization/Expertise *</Label>
        <Input id="specialization" placeholder="e.g., Web Development, Programming" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Input id="experience" placeholder="e.g., 5 years" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignBatches">Assign to Batches</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select batches to assign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wd-b01">WD-B01 (Web Development Morning)</SelectItem>
            <SelectItem value="wd-b03">WD-B03 (Web Development Evening)</SelectItem>
            <SelectItem value="cd-b02">CD-B02 (Coding Evening)</SelectItem>
            <SelectItem value="tl-b01">TL-B01 (Tally Morning)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Add Teacher
        </Button>
      </div>
    </form>
  );

  const TeacherDetails = ({ teacher }) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={teacher.photo} />
          <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.specialization}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="default">{teacher.status}</Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{teacher.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Joined: {teacher.joiningDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm text-gray-600">Qualification</Label>
              <p className="font-medium">{teacher.qualification}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Experience</Label>
              <p className="font-medium">{teacher.experience}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Specialization</Label>
              <p className="font-medium">{teacher.specialization}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{teacher.assignedBatches.length}</p>
            <p className="text-sm text-gray-600">Assigned Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{teacher.totalStudents}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">{teacher.rating}</p>
            <p className="text-sm text-gray-600">Rating</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assigned Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacher.assignedBatches.map((batch, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{batch}</p>
                <p className="text-sm text-gray-600">
                  {batch.includes('WD') ? 'Web Development' : 
                   batch.includes('CD') ? 'Coding' : 'Tally'}
                </p>
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
          <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
          <p className="text-gray-600">Manage teacher profiles and assignments</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter teacher information to create a new profile.
              </DialogDescription>
            </DialogHeader>
            <AddTeacherForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or specialization..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{teachers.length}</p>
            <p className="text-sm text-gray-600">Total Teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Active Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">105</p>
            <p className="text-sm text-gray-600">Students Taught</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">4.8</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Teacher List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={teacher.photo} />
                    <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                    <p className="text-gray-600">{teacher.specialization}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {teacher.phone}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {teacher.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{teacher.assignedBatches.length}</p>
                    <p className="text-xs text-gray-500">Batches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{teacher.totalStudents}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-lg font-bold text-yellow-600">{teacher.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <Badge variant="default">{teacher.status}</Badge>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Teacher Details</DialogTitle>
                        </DialogHeader>
                        <TeacherDetails teacher={teacher} />
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
    </div>
  );
};

export default TeacherManagement;
