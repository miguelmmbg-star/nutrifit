import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o banco de dados
export type Diet = {
  id: string
  user_id?: string
  name: string
  description: string
  goal: 'perder peso' | 'ganhar massa' | 'definir' | 'manter peso'
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  meals: {
    breakfast: Meal
    lunch: Meal
    snack: Meal
    dinner: Meal
  }
  created_at: string
  updated_at: string
}

export type Meal = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type Workout = {
  id: string
  user_id?: string
  name: string
  goal: string
  exercises: Exercise[]
  created_at: string
  updated_at: string
}

export type Exercise = {
  exercise: string
  sets: number
  reps: string
  rest: number
  tips: string
}

export type NutritionAnalysis = {
  id: string
  user_id?: string
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  confidence: number
  image_url?: string
  created_at: string
}

export type WaterIntake = {
  id: string
  user_id?: string
  date: string
  target_liters: number
  consumed_liters: number
  weight_kg: number
  activity_level: 'light' | 'moderate' | 'intense'
  created_at: string
}
