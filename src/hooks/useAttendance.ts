
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  batch_id?: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
  marked_by?: string;
  created_at?: string;
}

export const useAttendance = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAttendance = async (date?: string, batchId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('attendance')
        .select(`
          *,
          students(name, aadhaar),
          batches(name)
        `)
        .order('created_at', { ascending: false });

      if (date) {
        query = query.eq('date', date);
      }
      if (batchId) {
        query = query.eq('batch_id', batchId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAttendance(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch attendance records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (attendanceData: Omit<AttendanceRecord, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .upsert([attendanceData], {
          onConflict: 'student_id,date'
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      });
      throw error;
    }
  };

  const bulkMarkAttendance = async (attendanceRecords: Omit<AttendanceRecord, 'id' | 'created_at'>[]) => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .upsert(attendanceRecords, {
          onConflict: 'student_id,date'
        })
        .select();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Attendance marked for ${attendanceRecords.length} students`,
      });
      
      return data;
    } catch (error) {
      console.error('Error bulk marking attendance:', error);
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getAttendanceStats = async (batchId?: string, startDate?: string, endDate?: string) => {
    try {
      let query = supabase
        .from('attendance')
        .select('status, student_id, students(name)');

      if (batchId) query = query.eq('batch_id', batchId);
      if (startDate) query = query.gte('date', startDate);
      if (endDate) query = query.lte('date', endDate);

      const { data, error } = await query;
      if (error) throw error;

      const stats = {
        totalRecords: data?.length || 0,
        presentCount: data?.filter(r => r.status === 'present').length || 0,
        absentCount: data?.filter(r => r.status === 'absent').length || 0,
        lateCount: data?.filter(r => r.status === 'late').length || 0,
      };

      return {
        ...stats,
        attendanceRate: stats.totalRecords > 0 ? (stats.presentCount / stats.totalRecords) * 100 : 0
      };
    } catch (error) {
      console.error('Error getting attendance stats:', error);
      return {
        totalRecords: 0,
        presentCount: 0,
        absentCount: 0,
        lateCount: 0,
        attendanceRate: 0
      };
    }
  };

  useEffect(() => {
    fetchAttendance();

    // Set up real-time subscription
    const subscription = supabase
      .channel('attendance-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'attendance' },
        () => {
          fetchAttendance();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    attendance,
    loading,
    markAttendance,
    bulkMarkAttendance,
    getAttendanceStats,
    refetch: fetchAttendance,
  };
};
