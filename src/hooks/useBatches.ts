
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Batch {
  id: string;
  name: string;
  batch_type: 'coding' | 'web_12' | 'web_11_tally';
  start_time: string;
  end_time: string;
  teacher_id?: string;
  secondary_teacher_id?: string;
  room?: string;
  created_at?: string;
  updated_at?: string;
}

export const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('batches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBatches(data || []);
    } catch (error) {
      console.error('Error fetching batches:', error);
      toast({
        title: "Error",
        description: "Failed to fetch batches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addBatch = async (batchData: Omit<Batch, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('batches')
        .insert([batchData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Batch created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding batch:', error);
      toast({
        title: "Error",
        description: "Failed to create batch",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateBatch = async (id: string, updates: Partial<Batch>) => {
    try {
      const { data, error } = await supabase
        .from('batches')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Batch updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating batch:', error);
      toast({
        title: "Error",
        description: "Failed to update batch",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteBatch = async (id: string) => {
    try {
      const { error } = await supabase
        .from('batches')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Batch deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting batch:', error);
      toast({
        title: "Error",
        description: "Failed to delete batch",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchBatches();

    // Set up real-time subscription
    const subscription = supabase
      .channel('batches-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'batches' },
        () => {
          fetchBatches();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    batches,
    loading,
    addBatch,
    updateBatch,
    deleteBatch,
    refetch: fetchBatches,
  };
};
