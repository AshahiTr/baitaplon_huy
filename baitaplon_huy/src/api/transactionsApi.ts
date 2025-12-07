import { Transaction } from './mockData';

export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  },

  getByReaderId: async (readerId: string): Promise<Transaction[]> => {
    const transactions = await transactionsApi.getAll();
    return transactions.filter(t => t.readerId === readerId);
  },

  create: async (data: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    const transactions = await transactionsApi.getAll();
    const newTransaction: Transaction = {
      ...data,
      id: `trans-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return newTransaction;
  },

  update: async (id: string, updates: Partial<Transaction>): Promise<Transaction> => {
    const transactions = await transactionsApi.getAll();
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Transaction not found');
    
    transactions[index] = { ...transactions[index], ...updates };
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return transactions[index];
  },

  delete: async (id: string): Promise<void> => {
    const transactions = await transactionsApi.getAll();
    const filtered = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(filtered));
  },

  getPending: async (): Promise<Transaction[]> => {
    const transactions = await transactionsApi.getAll();
    return transactions.filter(t => t.status === 'pending');
  },

  getOverdue: async (): Promise<Transaction[]> => {
    const transactions = await transactionsApi.getAll();
    const now = new Date();
    return transactions.filter(t => {
      if (t.status === 'returned') return false;
      const dueDate = new Date(t.dueDate);
      return dueDate < now;
    });
  },
};
