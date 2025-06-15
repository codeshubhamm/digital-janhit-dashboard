
-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Enable read access for all users" ON public.students FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.students FOR DELETE USING (true);

-- Create policies for teachers table
CREATE POLICY "Enable read access for all users" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.teachers FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.teachers FOR DELETE USING (true);

-- Create policies for batches table
CREATE POLICY "Enable read access for all users" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.batches FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.batches FOR DELETE USING (true);

-- Create policies for attendance table
CREATE POLICY "Enable read access for all users" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.attendance FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.attendance FOR DELETE USING (true);

-- Create policies for daily_reports table
CREATE POLICY "Enable read access for all users" ON public.daily_reports FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.daily_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.daily_reports FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.daily_reports FOR DELETE USING (true);

-- Create policies for export_logs table
CREATE POLICY "Enable read access for all users" ON public.export_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.export_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.export_logs FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.export_logs FOR DELETE USING (true);

-- Add foreign key constraints
ALTER TABLE public.students ADD CONSTRAINT fk_students_batch FOREIGN KEY (batch_id) REFERENCES public.batches(id);
ALTER TABLE public.attendance ADD CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES public.students(id);
ALTER TABLE public.attendance ADD CONSTRAINT fk_attendance_batch FOREIGN KEY (batch_id) REFERENCES public.batches(id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_batch_id ON public.students(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_batch_id ON public.attendance(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);

-- Create a function to calculate attendance percentage
CREATE OR REPLACE FUNCTION calculate_attendance_percentage(student_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
    total_days INTEGER;
    present_days INTEGER;
    percentage NUMERIC;
BEGIN
    -- Get total attendance records for the student
    SELECT COUNT(*) INTO total_days
    FROM public.attendance
    WHERE student_id = student_uuid;
    
    -- Get present days for the student
    SELECT COUNT(*) INTO present_days
    FROM public.attendance
    WHERE student_id = student_uuid AND status = 'present';
    
    -- Calculate percentage
    IF total_days > 0 THEN
        percentage := ROUND((present_days::NUMERIC / total_days::NUMERIC) * 100, 2);
    ELSE
        percentage := 0;
    END IF;
    
    RETURN percentage;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for all tables
ALTER TABLE public.students REPLICA IDENTITY FULL;
ALTER TABLE public.teachers REPLICA IDENTITY FULL;
ALTER TABLE public.batches REPLICA IDENTITY FULL;
ALTER TABLE public.attendance REPLICA IDENTITY FULL;
ALTER TABLE public.daily_reports REPLICA IDENTITY FULL;
ALTER TABLE public.export_logs REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.teachers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.batches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.export_logs;
