
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Edit, Eye, Download, Upload, User, Phone, MapPin, Calendar, BookOpen, Award, Users } from 'lucide-react';
import { sampleStudents, batches } from '@/data/programData';
import { useToast } from '@/hooks/use-toast';

const RealStudentManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const filteredStudents = sampleStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.contact.includes(searchTerm) ||
                         student.aadhaar.includes(searchTerm);
    const matchesBatch = filterBatch === 'all' || student.batchId === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const getBatchName = (batchId: string) => {
    const batch = batches.find(b => b.id === batchId);
    return batch ? batch.name : 'Unknown Batch';
  };

  const exportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Student data is being exported to Excel...",
    });
    // Simulate export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Student data exported successfully!",
      });
    }, 2000);
  };

  const AddStudentWizard = () => {
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const Step1PersonalInfo = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" placeholder="Enter student's full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number *</Label>
            <Input id="aadhaar" placeholder="1234-5678-9012" maxLength={14} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input id="age" type="number" placeholder="Enter age" min="16" max="35" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number *</Label>
            <Input id="contact" placeholder="Enter mobile number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardian">Guardian Name *</Label>
            <Input id="guardian" placeholder="Enter guardian's name" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="guardianContact">Guardian Contact Number</Label>
          <Input id="guardianContact" placeholder="Enter guardian's mobile number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Complete Address *</Label>
          <Textarea id="address" placeholder="Village, District, State, Pincode" rows={3} />
        </div>
      </div>
    );

    const Step2CourseInfo = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course & Batch Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="course">Select Course *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B001">Programming & Coding (11:00 AM - 1:00 PM)</SelectItem>
                <SelectItem value="B002">Web Development Advanced (1:00 PM - 3:00 PM)</SelectItem>
                <SelectItem value="B003">Web Development Basic + Tally (4:00 PM - 6:00 PM)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">Course will automatically assign student to appropriate batch</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admissionDate">Admission Date *</Label>
            <Input id="admissionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
        </div>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Batch Information</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Coding Batch:</strong> 11:00 AM - 1:00 PM (Raj Sir)</p>
              <p><strong>Web 1.2 Batch:</strong> 1:00 PM - 3:00 PM (Raj Sir)</p>
              <p><strong>Web 1.1 + Tally:</strong> 4:00 PM - 6:00 PM (Achal Ma'am & Chirangiv Sir)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const Step3Documents = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents & Photo</h3>
        <div className="space-y-4">
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
          
          <div className="space-y-2">
            <Label htmlFor="aadhaarDoc">Aadhaar Card Copy</Label>
            <div className="flex items-center space-x-2">
              <Input id="aadhaarDoc" type="file" accept=".pdf,.jpg,.jpeg,.png" />
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationForm">Application Form</Label>
            <div className="flex items-center space-x-2">
              <Input id="applicationForm" type="file" accept=".pdf,.jpg,.jpeg,.png" />
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-900 mb-2">Admission Summary</h4>
            <div className="space-y-1 text-sm text-green-800">
              <p>Please review all information before submitting</p>
              <p>Student will be automatically enrolled in the selected batch</p>
              <p>Admission confirmation will be generated after submission</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
        </div>

        <div className="min-h-[400px]">
          {currentStep === 1 && <Step1PersonalInfo />}
          {currentStep === 2 && <Step2CourseInfo />}
          {currentStep === 3 && <Step3Documents />}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <div className="space-x-2">
            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep}>Next</Button>
            ) : (
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Complete Admission
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const StudentDetails = ({ student }) => {
    const batch = batches.find(b => b.id === student.batchId);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={student.photo} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-gray-600">{batch?.name} • {batch?.course}</p>
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
                <p className="font-medium">{student.contact}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Guardian Contact</Label>
                <p className="font-medium">{student.guardianContact}</p>
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
              <p className="text-sm text-gray-600">Course Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-600">B+</p>
              <p className="text-sm text-gray-600">Current Grade</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Batch Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Batch Name</Label>
                <p className="font-medium">{batch?.name}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Course</Label>
                <p className="font-medium">{batch?.course}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Timing</Label>
                <p className="font-medium">{batch?.timing}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Teacher</Label>
                <p className="font-medium">{batch?.teacher}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage student admissions and records</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportToExcel} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Student Admission Form</DialogTitle>
                <DialogDescription>
                  Complete the admission process for a new student
                </DialogDescription>
              </DialogHeader>
              <AddStudentWizard />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{sampleStudents.length}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">
              {sampleStudents.filter(s => s.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-600">Active Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">
              {sampleStudents.filter(s => s.status === 'Completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-orange-600">
              {Math.round(sampleStudents.reduce((acc, s) => acc + s.attendance, 0) / sampleStudents.length)}%
            </p>
            <p className="text-sm text-gray-600">Avg Attendance</p>
          </CardContent>
        </Card>
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
            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="B001">Coding Batch</SelectItem>
                <SelectItem value="B002">Web 1.2 Batch</SelectItem>
                <SelectItem value="B003">Web 1.1 + Tally</SelectItem>
              </SelectContent>
            </Select>
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
                    <p className="text-sm text-gray-600">{getBatchName(student.batchId)} • {student.course}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {student.contact}
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
    </div>
  );
};

export default RealStudentManagement;
