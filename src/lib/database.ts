import { supabase } from './supabase'
import type { Diet, Workout, NutritionAnalysis, WaterIntake } from './supabase'

// Funções para Dietas
export async function getDiets(goal?: string) {
  let query = supabase.from('diets').select('*').order('created_at', { ascending: false })
  
  if (goal) {
    query = query.eq('goal', goal)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as Diet[]
}

export async function getDietById(id: string) {
  const { data, error } = await supabase
    .from('diets')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Diet
}

export async function createDiet(diet: Omit<Diet, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('diets')
    .insert(diet)
    .select()
    .single()
  
  if (error) throw error
  return data as Diet
}

export async function updateDiet(id: string, diet: Partial<Diet>) {
  const { data, error } = await supabase
    .from('diets')
    .update({ ...diet, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Diet
}

export async function deleteDiet(id: string) {
  const { error } = await supabase
    .from('diets')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Funções para Treinos
export async function getWorkouts(goal?: string) {
  let query = supabase.from('workouts').select('*').order('created_at', { ascending: false })
  
  if (goal) {
    query = query.ilike('goal', `%${goal}%`)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as Workout[]
}

export async function getWorkoutById(id: string) {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Workout
}

export async function createWorkout(workout: Omit<Workout, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('workouts')
    .insert(workout)
    .select()
    .single()
  
  if (error) throw error
  return data as Workout
}

export async function updateWorkout(id: string, workout: Partial<Workout>) {
  const { data, error } = await supabase
    .from('workouts')
    .update({ ...workout, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Workout
}

export async function deleteWorkout(id: string) {
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Funções para Análises Nutricionais
export async function getNutritionAnalyses(userId?: string) {
  let query = supabase.from('nutrition_analyses').select('*').order('created_at', { ascending: false })
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as NutritionAnalysis[]
}

export async function createNutritionAnalysis(analysis: Omit<NutritionAnalysis, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('nutrition_analyses')
    .insert(analysis)
    .select()
    .single()
  
  if (error) throw error
  return data as NutritionAnalysis
}

// Funções para Consumo de Água
export async function getWaterIntake(userId?: string, date?: string) {
  let query = supabase.from('water_intake').select('*')
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  if (date) {
    query = query.eq('date', date)
  }
  
  query = query.order('date', { ascending: false })
  
  const { data, error } = await query
  
  if (error) throw error
  return data as WaterIntake[]
}

export async function createWaterIntake(intake: Omit<WaterIntake, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('water_intake')
    .insert(intake)
    .select()
    .single()
  
  if (error) throw error
  return data as WaterIntake
}

export async function updateWaterIntake(id: string, consumed_liters: number) {
  const { data, error } = await supabase
    .from('water_intake')
    .update({ consumed_liters })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as WaterIntake
}
