
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Download, FileSpreadsheet, Users, Calendar } from 'lucide-react';
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
  const { toast } = useToast();

  const exportData = () => {
    let dataToExport = sampleStudents;
    
    if (exportType === 'batch' && selectedBatch) {
      dataToExport = sampleStudents.filter(student => student.batchId === selectedBatch);
    }

    // Simulate Excel export
    const fileName = exportType === 'all' 
      ? `All_Students_${new Date().toISOString().split('T')[0]}.xlsx`
      : `${batches.find(b => b.id === selectedBatch)?.name}_Students_${new Date().toISOString().split('T')[0]}.xlsx`;

    toast({
      title: "Export Started",
      description: `Exporting ${dataToExport.length} student records to ${fileName}`,
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${fileName} has been downloaded successfully!`,
      });
    }, 2000);
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
        <h2 className="text-2xl font-bold text-gray-900">Export to Excel</h2>
        <p className="text-gray-600">Download student data in Excel format</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Export Options
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>History of your exported files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'All_Students_2024-06-14.xlsx', date: '2024-06-14', students: 65, type: 'All Students' },
              { name: 'Coding_Batch_2024-06-13.xlsx', date: '2024-06-13', students: 18, type: 'Coding Batch' },
              { name: 'Web_1.2_Batch_2024-06-12.xlsx', date: '2024-06-12', students: 22, type: 'Web 1.2 Batch' },
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">{export_.name}</p>
                    <p className="text-sm text-gray-600">{export_.type} • {export_.students} students</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{export_.date}</span>
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
