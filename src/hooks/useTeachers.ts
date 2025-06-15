
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Teacher {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specialization?: string[];
  address?: string;
  profile_photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTeacher = async (teacherData: Omit<Teacher, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .insert([teacherData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Teacher added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast({
        title: "Error",
        description: "Failed to add teacher",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Teacher updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast({
        title: "Error",
        description: "Failed to update teacher",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTeachers();

    // Set up real-time subscription
    const subscription = supabase
      .channel('teachers-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'teachers' },
        () => {
          fetchTeachers();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    teachers,
    loading,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    refetch: fetchTeachers,
  };
};
