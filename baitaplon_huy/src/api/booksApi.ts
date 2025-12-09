import { supabase } from '../lib/supabaseClient'
import { Book } from './mockData'

export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('title')
    
    if (error) throw error
    return data as Book[]
  },

  getById: async (id: string): Promise<Book | null> => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data as Book
  },

  create: async (book: Omit<Book, 'id'>): Promise<Book> => {
    const { data, error } = await supabase
      .from('books')
      .insert([{
        code: book.code,
        title: book.title,
        author: book.author,
        category_id: book.categoryId,
        total_quantity: book.totalQuantity,
        available_quantity: book.availableQuantity,
        is_hidden: book.isHidden
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Book
  },

  update: async (id: string, updates: Partial<Book>): Promise<Book> => {
    const { data, error } = await supabase
      .from('books')
      .update({
        code: updates.code,
        title: updates.title,
        author: updates.author,
        category_id: updates.categoryId,
        total_quantity: updates.totalQuantity,
        available_quantity: updates.availableQuantity,
        is_hidden: updates.isHidden
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Book
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  search: async (query: string): Promise<Book[]> => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
    
    if (error) throw error
    return data as Book[]
  }
}
