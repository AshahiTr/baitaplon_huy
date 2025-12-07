import { supabase } from '../lib/supabaseClient'
import { Category } from './mockData'

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Category[]
  },

  create: async (name: string): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select()
      .single()
    
    if (error) throw error
    return data as Category
  },

  update: async (id: string, name: string): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Category
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
