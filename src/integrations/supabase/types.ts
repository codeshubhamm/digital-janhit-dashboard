export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          batch_id: string | null
          created_at: string | null
          date: string
          id: string
          marked_by: string | null
          notes: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          student_id: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          marked_by?: string | null
          notes?: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          student_id?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          marked_by?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_attendance_batch"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_attendance_student"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          batch_type: Database["public"]["Enums"]["batch_type"]
          created_at: string | null
          end_time: string
          id: string
          name: string
          room: string | null
          secondary_teacher_id: string | null
          start_time: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          batch_type: Database["public"]["Enums"]["batch_type"]
          created_at?: string | null
          end_time: string
          id?: string
          name: string
          room?: string | null
          secondary_teacher_id?: string | null
          start_time: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_type?: Database["public"]["Enums"]["batch_type"]
          created_at?: string | null
          end_time?: string
          id?: string
          name?: string
          room?: string | null
          secondary_teacher_id?: string | null
          start_time?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_secondary_teacher_id_fkey"
            columns: ["secondary_teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batches_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          id: string
          task_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
          task_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          task_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      export_logs: {
        Row: {
          created_at: string | null
          export_type: string
          exported_by: string | null
          file_name: string
          file_url: string | null
          id: string
          record_count: number | null
        }
        Insert: {
          created_at?: string | null
          export_type: string
          exported_by?: string | null
          file_name: string
          file_url?: string | null
          id?: string
          record_count?: number | null
        }
        Update: {
          created_at?: string | null
          export_type?: string
          exported_by?: string | null
          file_name?: string
          file_url?: string | null
          id?: string
          record_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          aadhaar: string
          address: string | null
          admission_date: string | null
          age: number | null
          batch_id: string | null
          contact_phone: string | null
          course_enrolled: Database["public"]["Enums"]["course_type"]
          created_at: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          is_active: boolean | null
          name: string
          profile_photo_url: string | null
          updated_at: string | null
        }
        Insert: {
          aadhaar: string
          address?: string | null
          admission_date?: string | null
          age?: number | null
          batch_id?: string | null
          contact_phone?: string | null
          course_enrolled: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          profile_photo_url?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhaar?: string
          address?: string | null
          admission_date?: string | null
          age?: number | null
          batch_id?: string | null
          contact_phone?: string | null
          course_enrolled?: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          profile_photo_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_students_batch"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          profile_photo_url: string | null
          specialization: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          profile_photo_url?: string | null
          specialization?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          profile_photo_url?: string | null
          specialization?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_attendance_percentage: {
        Args: { student_uuid: string }
        Returns: number
      }
    }
    Enums: {
      attendance_status: "present" | "absent" | "late"
      batch_type: "coding_batch" | "web_dev_1_2" | "web_1_1_tally"
      course_type: "coding" | "web_development" | "tally" | "web_1_1"
      gender_type: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attendance_status: ["present", "absent", "late"],
      batch_type: ["coding_batch", "web_dev_1_2", "web_1_1_tally"],
      course_type: ["coding", "web_development", "tally", "web_1_1"],
      gender_type: ["male", "female", "other"],
    },
  },
} as const
