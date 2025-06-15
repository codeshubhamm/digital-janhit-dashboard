
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Student } from './useStudents';

export const useExcelUtils = () => {
  const { toast } = useToast();

  const parseExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = (window as any).XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = (window as any).XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const validateStudentData = (data: any[]): { valid: any[], invalid: any[] } => {
    const valid: any[] = [];
    const invalid: any[] = [];

    data.forEach((row, index) => {
      const student = {
        name: row['Name'] || row['name'] || '',
        age: parseInt(row['Age'] || row['age']) || null,
        gender: (row['Gender'] || row['gender'] || '').toLowerCase(),
        contact_phone: row['Contact'] || row['Phone'] || row['contact_phone'] || '',
        aadhaar: row['Aadhaar'] || row['aadhaar'] || '',
        guardian_name: row['Guardian'] || row['guardian_name'] || '',
        guardian_phone: row['Guardian Phone'] || row['guardian_phone'] || '',
        address: row['Address'] || row['address'] || '',
        course_enrolled: (row['Course'] || row['course_enrolled'] || 'coding').toLowerCase(),
        admission_date: row['Admission Date'] || row['admission_date'] || new Date().toISOString().split('T')[0]
      };

      // Validate required fields
      if (!student.name || !student.aadhaar) {
        invalid.push({ ...student, row: index + 1, error: 'Missing required fields (Name, Aadhaar)' });
      } else if (student.aadhaar.length < 12) {
        invalid.push({ ...student, row: index + 1, error: 'Invalid Aadhaar number' });
      } else {
        valid.push(student);
      }
    });

    return { valid, invalid };
  };

  const importStudentsFromExcel = async (file: File, batchId?: string) => {
    try {
      toast({
        title: "Processing",
        description: "Reading Excel file...",
      });

      const data = await parseExcelFile(file);
      const { valid, invalid } = validateStudentData(data);

      if (invalid.length > 0) {
        toast({
          title: "Validation Errors",
          description: `${invalid.length} rows have errors. Check console for details.`,
          variant: "destructive",
        });
        console.error('Invalid rows:', invalid);
      }

      if (valid.length === 0) {
        throw new Error('No valid student data found');
      }

      // Add batch_id if provided
      const studentsToInsert = valid.map(student => ({
        ...student,
        batch_id: batchId || null,
        is_active: true
      }));

      const { data: insertedStudents, error } = await supabase
        .from('students')
        .insert(studentsToInsert)
        .select();

      if (error) throw error;

      // Log the import
      await supabase
        .from('export_logs')
        .insert([{
          export_type: 'import',
          file_name: file.name,
          record_count: insertedStudents?.length || 0,
        }]);

      toast({
        title: "Success",
        description: `${insertedStudents?.length || 0} students imported successfully`,
      });

      return { success: insertedStudents?.length || 0, errors: invalid.length };
    } catch (error) {
      console.error('Error importing students:', error);
      toast({
        title: "Error",
        description: "Failed to import students from Excel",
        variant: "destructive",
      });
      throw error;
    }
  };

  const exportStudentsToExcel = async (students: Student[], filename?: string) => {
    try {
      const exportData = students.map(student => ({
        'Name': student.name,
        'Age': student.age || '',
        'Gender': student.gender || '',
        'Contact Phone': student.contact_phone || '',
        'Aadhaar': student.aadhaar,
        'Guardian Name': student.guardian_name || '',
        'Guardian Phone': student.guardian_phone || '',
        'Address': student.address || '',
        'Course Enrolled': student.course_enrolled,
        'Admission Date': student.admission_date || '',
        'Active': student.is_active ? 'Yes' : 'No'
      }));

      const worksheet = (window as any).XLSX.utils.json_to_sheet(exportData);
      const workbook = (window as any).XLSX.utils.book_new();
      (window as any).XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

      const fileName = filename || `students_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      (window as any).XLSX.writeFile(workbook, fileName);

      // Log the export
      await supabase
        .from('export_logs')
        .insert([{
          export_type: 'export',
          file_name: fileName,
          record_count: students.length,
        }]);

      toast({
        title: "Success",
        description: `${students.length} students exported to ${fileName}`,
      });

      return fileName;
    } catch (error) {
      console.error('Error exporting students:', error);
      toast({
        title: "Error",
        description: "Failed to export students to Excel",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    importStudentsFromExcel,
    exportStudentsToExcel,
    validateStudentData,
  };
};
