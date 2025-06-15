
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  contact_phone?: string;
  aadhaar: string;
  guardian_name?: string;
  guardian_phone?: string;
  address?: string;
  course_enrolled: 'coding' | 'web_development' | 'tally' | 'web_1_1';
  batch_id?: string;
  admission_date?: string;
  is_active?: boolean;
  profile_photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getStudentsByBatch = async (batchId: string) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('batch_id', batchId)
        .eq('is_active', true);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching students by batch:', error);
      return [];
    }
  };

  const getStudentAttendancePercentage = async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('calculate_attendance_percentage', { student_uuid: studentId });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error calculating attendance:', error);
      return 0;
    }
  };

  useEffect(() => {
    fetchStudents();

    // Set up real-time subscription
    const subscription = supabase
      .channel('students-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'students' },
        () => {
          fetchStudents();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentsByBatch,
    getStudentAttendancePercentage,
    refetch: fetchStudents,
  };
};
