
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DailyReport {
  id: string;
  title: string;
  description?: string;
  task_type?: string;
  date: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const useDailyReports = () => {
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('daily_reports')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching daily reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch daily reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (reportData: Omit<DailyReport, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('daily_reports')
        .insert([reportData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Daily report added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding daily report:', error);
      toast({
        title: "Error",
        description: "Failed to add daily report",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateReport = async (id: string, updates: Partial<DailyReport>) => {
    try {
      const { data, error } = await supabase
        .from('daily_reports')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Daily report updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating daily report:', error);
      toast({
        title: "Error",
        description: "Failed to update daily report",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Daily report deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting daily report:', error);
      toast({
        title: "Error",
        description: "Failed to delete daily report",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchReports();

    // Set up real-time subscription
    const subscription = supabase
      .channel('daily-reports-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'daily_reports' },
        () => {
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    reports,
    loading,
    addReport,
    updateReport,
    deleteReport,
    refetch: fetchReports,
  };
};
