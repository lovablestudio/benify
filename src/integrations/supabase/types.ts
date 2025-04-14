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
      available_benefits: {
        Row: {
          category: string
          company_id: string | null
          created_at: string
          description: string
          icon_name: string
          id: string
          logo_url: string | null
          name: string
          price: number
          status: string
          visibility: string
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string
          description: string
          icon_name: string
          id?: string
          logo_url?: string | null
          name: string
          price?: number
          status?: string
          visibility?: string
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          logo_url?: string | null
          name?: string
          price?: number
          status?: string
          visibility?: string
        }
        Relationships: []
      }
      call_bookings: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          selected_date: string
          status: string | null
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          selected_date: string
          status?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          selected_date?: string
          status?: string | null
        }
        Relationships: []
      }
      employee_balances: {
        Row: {
          balance_amount: number
          created_at: string
          employee_id: string
          id: string
          updated_at: string
        }
        Insert: {
          balance_amount?: number
          created_at?: string
          employee_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          balance_amount?: number
          created_at?: string
          employee_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          company_logo_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string | null
          id: string
          joining_date: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          salary: number | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          company_logo_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          joining_date?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          salary?: number | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          company_logo_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          joining_date?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          salary?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      purchased_benefits: {
        Row: {
          amount_paid: number
          benefit_id: string
          id: string
          purchase_date: string
          status: string
          user_id: string
        }
        Insert: {
          amount_paid: number
          benefit_id: string
          id?: string
          purchase_date?: string
          status?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          benefit_id?: string
          id?: string
          purchase_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchased_benefits_benefit_id_fkey"
            columns: ["benefit_id"]
            isOneToOne: false
            referencedRelation: "available_benefits"
            referencedColumns: ["id"]
          },
        ]
      }
      user_allowance: {
        Row: {
          created_at: string
          current_amount: number
          id: string
          monthly_renewal_amount: number
          next_renewal_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_amount?: number
          id?: string
          monthly_renewal_amount?: number
          next_renewal_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_amount?: number
          id?: string
          monthly_renewal_amount?: number
          next_renewal_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_company_employee_balances: {
        Args: {
          company_name: string
        }
        Returns: {
          id: string
          full_name: string
          department: string
          balance_amount: number
        }[]
      }
      get_company_employees: {
        Args: {
          company_name: string
        }
        Returns: {
          company: string | null
          company_logo_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string | null
          id: string
          joining_date: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          salary: number | null
          updated_at: string
        }[]
      }
      get_current_user_company: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_profile: {
        Args: {
          user_id: string
        }
        Returns: {
          company: string | null
          company_logo_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string | null
          id: string
          joining_date: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          salary: number | null
          updated_at: string
        }
      }
      is_employer: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "employee" | "admin" | "employer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
