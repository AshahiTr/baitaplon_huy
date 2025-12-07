import { supabase } from '../lib/supabaseClient'
import { User } from './mockData'

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  },

  getById: async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data as User
  },

  create: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: userData.email,
        full_name: userData.fullName,
        phone: userData.phone,
        role: userData.role,
        quota: userData.quota,
        current_borrowing: userData.currentBorrowing,
        penalty_status: userData.penaltyStatus
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  update: async (id: string, updates: Partial<User>): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: updates.fullName,
        phone: updates.phone,
        quota: updates.quota,
        current_borrowing: updates.currentBorrowing,
        penalty_status: updates.penaltyStatus
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  login: async (email: string, password: string): Promise<User> => {
    // Lưu ý: Không nên lưu password plaintext trong production
    // Nên dùng Supabase Auth thay vì tự quản lý
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error || !data) throw new Error('Invalid credentials')
    return data as User
  }
}
