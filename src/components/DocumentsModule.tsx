
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Download, Upload, FileText, Image, File, Eye, Trash2, Filter } from 'lucide-react';

const DocumentsModule = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Priya_Sharma_Aadhaar.pdf',
      type: 'PDF',
      category: 'Aadhaar',
      studentName: 'Priya Sharma',
      studentId: 'WD001',
      batch: 'WD-B01',
      uploadDate: '2024-06-10',
      fileSize: '2.3 MB',
      status: 'Verified'
    },
    {
      id: 2,
      name: 'Rahul_Patil_Admission_Form.pdf',
      type: 'PDF',
      category: 'Admission Form',
      studentName: 'Rahul Patil',
      studentId: 'WD002',
      batch: 'WD-B01',
      uploadDate: '2024-06-09',
      fileSize: '1.8 MB',
      status: 'Pending Review'
    },
    {
      id: 3,
      name: 'WD-B01_Completion_Certificate_Template.docx',
      type: 'DOCX',
      category: 'Certificate Template',
      batchCode: 'WD-B01',
      uploadDate: '2024-06-08',
      fileSize: '0.5 MB',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sunita_Jadhav_Photo.jpg',
      type: 'JPG',
      category: 'Student Photo',
      studentName: 'Sunita Jadhav',
      studentId: 'TL001',
      batch: 'TL-B01',
      uploadDate: '2024-06-07',
      fileSize: '0.8 MB',
      status: 'Verified'
    },
    {
      id: 5,
      name: 'Course_Completion_Certificate_Priya.pdf',
      type: 'PDF',
      category: 'Completion Certificate',
      studentName: 'Priya Sharma',
      studentId: 'WD001',
      batch: 'WD-B01',
      uploadDate: '2024-06-05',
      fileSize: '1.2 MB',
      status: 'Issued'
    },
    {
      id: 6,
      name: 'Batch_TL-B01_Group_Photo.jpg',
      type: 'JPG',
      category: 'Batch Photo',
      batchCode: 'TL-B01',
      uploadDate: '2024-06-01',
      fileSize: '3.1 MB',
      status: 'Active'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.studentName && doc.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (doc.batchCode && doc.batchCode.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'JPG':
      case 'PNG':
        return <Image className="w-8 h-8 text-blue-500" />;
      case 'DOCX':
      case 'DOC':
        return <File className="w-8 h-8 text-blue-600" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Verified': 'default',
      'Pending Review': 'secondary',
      'Active': 'default',
      'Issued': 'secondary'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const UploadDocumentForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="documentType">Document Category *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select document category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
              <SelectItem value="admission-form">Admission Form</SelectItem>
              <SelectItem value="student-photo">Student Photo</SelectItem>
              <SelectItem value="completion-certificate">Completion Certificate</SelectItem>
              <SelectItem value="certificate-template">Certificate Template</SelectItem>
              <SelectItem value="batch-photo">Batch Photo</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="relatedTo">Related To</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select student or batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Specific Student</SelectItem>
              <SelectItem value="batch">Specific Batch</SelectItem>
              <SelectItem value="general">General/Program</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentSelect">Select Student (if applicable)</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WD001">Priya Sharma (WD001)</SelectItem>
              <SelectItem value="WD002">Rahul Patil (WD002)</SelectItem>
              <SelectItem value="TL001">Sunita Jadhav (TL001)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="batchSelect">Select Batch (if applicable)</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WD-B01">WD-B01 (Web Development)</SelectItem>
              <SelectItem value="CD-B02">CD-B02 (Coding)</SelectItem>
              <SelectItem value="TL-B01">TL-B01 (Tally)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentFile">Upload Document *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <div className="space-y-2">
            <Input id="documentFile" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="max-w-xs mx-auto" />
            <p className="text-sm text-gray-500">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max: 10MB)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input id="description" placeholder="Brief description of the document" />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>
    </form>
  );

  const StudentDocumentsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments
          .filter(doc => doc.studentName)
          .map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doc.studentName} ({doc.studentId}) - {doc.batch}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.category} • {doc.fileSize} • Uploaded: {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(doc.status)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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

  const BatchDocumentsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments
          .filter(doc => doc.batchCode)
          .map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">Batch: {doc.batchCode}</p>
                      <p className="text-xs text-gray-500">
                        {doc.category} • {doc.fileSize} • Uploaded: {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(doc.status)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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

  const CertificatesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments
          .filter(doc => doc.category.includes('Certificate'))
          .map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doc.studentName ? `${doc.studentName} (${doc.studentId})` : `Batch: ${doc.batchCode}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.category} • {doc.fileSize} • Uploaded: {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(doc.status)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600">Manage student documents and certificates</p>
        </div>
        <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload student documents, certificates, or batch-related files.
              </DialogDescription>
            </DialogHeader>
            <UploadDocumentForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents by name, student, or batch..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="JPG">Images</SelectItem>
                <SelectItem value="DOCX">Documents</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Aadhaar">Aadhaar</SelectItem>
                <SelectItem value="Admission Form">Admission Forms</SelectItem>
                <SelectItem value="Student Photo">Student Photos</SelectItem>
                <SelectItem value="Completion Certificate">Certificates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
            <p className="text-sm text-gray-600">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <File className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{documents.filter(d => d.studentName).length}</p>
            <p className="text-sm text-gray-600">Student Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Image className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{documents.filter(d => d.category.includes('Certificate')).length}</p>
            <p className="text-sm text-gray-600">Certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.status === 'Pending Review').length}</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Student Documents</TabsTrigger>
          <TabsTrigger value="batches">Batch Documents</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentDocumentsTab />
        </TabsContent>

        <TabsContent value="batches">
          <BatchDocumentsTab />
        </TabsContent>

        <TabsContent value="certificates">
          <CertificatesTab />
        </TabsContent>
      </Tabs>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentsModule;
