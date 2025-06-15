
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, Edit, Eye, Download, Upload, User, Phone, MapPin, FileUp } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useBatches } from '@/hooks/useBatches';
import { useExcelUtils } from '@/hooks/useExcelUtils';
import { useToast } from '@/hooks/use-toast';

const RealStudentManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [formData, setFormData] = useState({});

  const { students, loading, addStudent, updateStudent, deleteStudent, getStudentAttendancePercentage } = useStudents();
  const { batches } = useBatches();
  const { importStudentsFromExcel, exportStudentsToExcel } = useExcelUtils();
  const { toast } = useToast();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.contact_phone?.includes(searchTerm) ||
                         student.aadhaar.includes(searchTerm);
    const matchesCourse = filterCourse === 'all' || student.course_enrolled === filterCourse;
    const matchesBatch = filterBatch === 'all' || student.batch_id === filterBatch;
    return matchesSearch && matchesCourse && matchesBatch;
  });

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setShowAddForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importStudentsFromExcel(file);
    } catch (error) {
      console.error('Error importing file:', error);
    }
  };

  const handleExport = async () => {
    try {
      await exportStudentsToExcel(filteredStudents);
    } catch (error) {
      console.error('Error exporting students:', error);
    }
  };

  const AddStudentForm = () => (
    <form onSubmit={handleAddStudent} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input 
            id="name" 
            placeholder="Enter full name"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Enter age"
            value={formData.age || ''}
            onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
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
          <Label htmlFor="phone">Contact Number</Label>
          <Input 
            id="phone" 
            placeholder="Enter contact number"
            value={formData.contact_phone || ''}
            onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aadhaar">Aadhaar Number *</Label>
          <Input 
            id="aadhaar" 
            placeholder="1234-5678-9012"
            value={formData.aadhaar || ''}
            onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guardian">Guardian Name</Label>
          <Input 
            id="guardian" 
            placeholder="Enter guardian name"
            value={formData.guardian_name || ''}
            onChange={(e) => setFormData({...formData, guardian_name: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea 
          id="address" 
          placeholder="Enter complete address"
          value={formData.address || ''}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="course">Course *</Label>
          <Select value={formData.course_enrolled} onValueChange={(value) => setFormData({...formData, course_enrolled: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coding">Programming & Coding</SelectItem>
              <SelectItem value="web_development_advanced">Web Development Advanced</SelectItem>
              <SelectItem value="web_development_basic_tally">Web Development Basic + Tally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="batch">Assign Batch</Label>
          <Select value={formData.batch_id} onValueChange={(value) => setFormData({...formData, batch_id: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.name} ({batch.start_time} - {batch.end_time})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading students...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage all student records and information</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
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
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="coding">Programming & Coding</SelectItem>
                <SelectItem value="web_development_advanced">Web Development Advanced</SelectItem>
                <SelectItem value="web_development_basic_tally">Web Development Basic + Tally</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Excel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">
              {students.filter(s => s.is_active).length}
            </p>
            <p className="text-sm text-gray-600">Active Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">
              {students.filter(s => s.gender === 'female').length}
            </p>
            <p className="text-sm text-gray-600">Female Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-orange-600">
              {filteredStudents.length}
            </p>
            <p className="text-sm text-gray-600">Filtered Results</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={student.profile_photo_url} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      {student.course_enrolled?.replace('_', ' ')} 
                      {student.batch_id && ` - Batch: ${batches.find(b => b.id === student.batch_id)?.name}`}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {student.contact_phone || 'N/A'}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {student.address?.split(',')[0] || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">ID: {student.aadhaar}</p>
                    <p className="text-sm text-gray-600">
                      Joined: {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <Badge variant={student.is_active ? 'default' : 'secondary'}>
                    {student.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
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

export default RealStudentManagement;
