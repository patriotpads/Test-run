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
      amenities: {
        Row: {
          category: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          bathrooms: number
          bedrooms: number
          created_at: string
          details: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          images: string[] | null
          latitude: number | null
          location_city: string
          location_country: string | null
          location_state: string
          longitude: number | null
          max_guests: number
          price_per_night: number
          property_highlights: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          details?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location_city: string
          location_country?: string | null
          location_state: string
          longitude?: number | null
          max_guests?: number
          price_per_night: number
          property_highlights?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          details?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location_city?: string
          location_country?: string | null
          location_state?: string
          longitude?: number | null
          max_guests?: number
          price_per_night?: number
          property_highlights?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity_id: string | null
          created_at: string
          id: string
          property_id: string | null
        }
        Insert: {
          amenity_id?: string | null
          created_at?: string
          id?: string
          property_id?: string | null
        }
        Update: {
          amenity_id?: string | null
          created_at?: string
          id?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
