
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Download, FileSpreadsheet, Users, Calendar, Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { sampleStudents, batches } from '@/data/programData';
import { useToast } from '@/hooks/use-toast';

const ExcelExport = () => {
  const [exportType, setExportType] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [includeFields, setIncludeFields] = useState({
    personal: true,
    contact: true,
    academic: true,
    attendance: true,
    progress: true
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const exportData = () => {
    let dataToExport = sampleStudents;
    
    if (exportType === 'batch' && selectedBatch) {
      dataToExport = sampleStudents.filter(student => student.batchId === selectedBatch);
    }

    // Simulate real Excel export with progress
    const fileName = exportType === 'all' 
      ? `All_Students_${new Date().toISOString().split('T')[0]}.xlsx`
      : `${batches.find(b => b.id === selectedBatch)?.name}_Students_${new Date().toISOString().split('T')[0]}.xlsx`;

    toast({
      title: "Export Started",
      description: `Preparing ${dataToExport.length} student records for export...`,
    });

    // Simulate export progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        // Create and download actual CSV file
        const csvContent = createCSVContent(dataToExport);
        downloadCSV(csvContent, fileName);
        
        toast({
          title: "Export Complete",
          description: `${fileName} has been downloaded successfully!`,
        });
      }
    }, 300);
  };

  const createCSVContent = (data: typeof sampleStudents) => {
    const headers = [];
    if (includeFields.personal) headers.push('Name', 'Age', 'Gender', 'Aadhaar');
    if (includeFields.contact) headers.push('Contact', 'Address', 'Guardian', 'Guardian Contact');
    if (includeFields.academic) headers.push('Course', 'Batch', 'Admission Date');
    if (includeFields.attendance) headers.push('Attendance %');
    if (includeFields.progress) headers.push('Progress %');

    const rows = data.map(student => {
      const row = [];
      if (includeFields.personal) row.push(student.name, student.age, student.gender, student.aadhaar);
      if (includeFields.contact) row.push(student.contact, student.address, student.guardian, student.guardianContact);
      if (includeFields.academic) row.push(student.course, batches.find(b => b.id === student.batchId)?.name || '', student.admissionDate);
      if (includeFields.attendance) row.push(student.attendance);
      if (includeFields.progress) row.push(student.progress);
      return row;
    });

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.csv')) {
        setUploadedFile(file);
        simulateUpload(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an Excel (.xlsx, .xls) or CSV file only.",
          variant: "destructive"
        });
      }
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('idle');

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('success');
          toast({
            title: "Upload Successful",
            description: `${file.name} has been processed successfully!`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getExportCount = () => {
    if (exportType === 'all') return sampleStudents.length;
    if (exportType === 'batch' && selectedBatch) {
      return sampleStudents.filter(student => student.batchId === selectedBatch).length;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Management</h2>
        <p className="text-gray-600">Export student data or import from Excel files</p>
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="export" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileSpreadsheet className="w-5 h-5 mr-2" />
                  Export Configuration
                </CardTitle>
                <CardDescription>Configure your export settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Export Type</Label>
                  <Select value={exportType} onValueChange={setExportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select export type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="batch">Specific Batch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {exportType === 'batch' && (
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Select Batch</Label>
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {batches.map((batch) => (
                          <SelectItem key={batch.id} value={batch.id}>
                            {batch.name} ({batch.timing})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-3">
                  <Label className="text-base font-medium">Include Fields</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="personal" 
                        checked={includeFields.personal}
                        onCheckedChange={(checked) => 
                          setIncludeFields(prev => ({ ...prev, personal: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="personal">Personal Information (Name, Age, Gender, Aadhaar)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="contact" 
                        checked={includeFields.contact}
                        onCheckedChange={(checked) => 
                          setIncludeFields(prev => ({ ...prev, contact: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="contact">Contact Information (Phone, Address, Guardian)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="academic" 
                        checked={includeFields.academic}
                        onCheckedChange={(checked) => 
                          setIncludeFields(prev => ({ ...prev, academic: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="academic">Academic Details (Course, Batch, Admission Date)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="attendance" 
                        checked={includeFields.attendance}
                        onCheckedChange={(checked) => 
                          setIncludeFields(prev => ({ ...prev, attendance: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="attendance">Attendance Percentage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="progress" 
                        checked={includeFields.progress}
                        onCheckedChange={(checked) => 
                          setIncludeFields(prev => ({ ...prev, progress: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="progress">Course Progress</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Export Summary
                </CardTitle>
                <CardDescription>Review your export details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Students to Export</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{getExportCount()}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Export Details:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Export Type: {exportType === 'all' ? 'All Students' : 'Specific Batch'}</li>
                      {exportType === 'batch' && selectedBatch && (
                        <li>• Batch: {batches.find(b => b.id === selectedBatch)?.name}</li>
                      )}
                      <li>• Format: Microsoft Excel (.xlsx)</li>
                      <li>• Date: {new Date().toLocaleDateString()}</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Included Fields:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {includeFields.personal && <div>✓ Personal Information</div>}
                      {includeFields.contact && <div>✓ Contact Information</div>}
                      {includeFields.academic && <div>✓ Academic Details</div>}
                      {includeFields.attendance && <div>✓ Attendance Data</div>}
                      {includeFields.progress && <div>✓ Progress Data</div>}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={exportData} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={getExportCount() === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Import Student Data
                </CardTitle>
                <CardDescription>Upload Excel or CSV files to import student information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Upload Excel File</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Drag and drop or click to select your Excel (.xlsx, .xls) or CSV file
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="max-w-xs"
                    />
                  </div>
                </div>

                {uploadedFile && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <File className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {uploadStatus === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {uploadStatus === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Required Format:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Name, Aadhaar, Age, Gender columns required</li>
                    <li>• Contact and Guardian information</li>
                    <li>• Course assignment for batch allocation</li>
                    <li>• Use the downloaded template for best results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Import Guidelines</CardTitle>
                <CardDescription>Follow these guidelines for successful data import</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Download Template</h4>
                      <p className="text-sm text-gray-600">Use our pre-formatted template to ensure compatibility</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Fill Required Fields</h4>
                      <p className="text-sm text-gray-600">Ensure all mandatory fields are completed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Upload File</h4>
                      <p className="text-sm text-gray-600">Select your completed Excel or CSV file</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800">Supported Formats:</h4>
                  <ul className="text-sm text-green-700 mt-1">
                    <li>• Excel (.xlsx, .xls)</li>
                    <li>• CSV (.csv)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Exports History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>History of your exported and imported files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'All_Students_2024-06-14.xlsx', date: '2024-06-14', students: 65, type: 'Export', action: 'All Students' },
              { name: 'New_Admissions.xlsx', date: '2024-06-14', students: 5, type: 'Import', action: 'Student Import' },
              { name: 'Coding_Batch_2024-06-13.xlsx', date: '2024-06-13', students: 18, type: 'Export', action: 'Coding Batch' },
              { name: 'Web_1.2_Batch_2024-06-12.xlsx', date: '2024-06-12', students: 22, type: 'Export', action: 'Web 1.2 Batch' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  {activity.type === 'Export' ? (
                    <Download className="w-5 h-5 text-green-600" />
                  ) : (
                    <Upload className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.action} • {activity.students} students</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{activity.date}</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcelExport;
