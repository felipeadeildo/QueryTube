import { SourceIn } from '@/types/source'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface HistoryItem {
  id: string
  name: string
  sources: SourceIn[]
  createdAt: Date
}

interface HistoryContextType {
  history: HistoryItem[]
  addToHistory: (name: string, sources: SourceIn[]) => void
  removeFromHistory: (id: string) => void
  getHistoryItem: (id: string) => HistoryItem | undefined
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

const STORAGE_KEY = 'querytube-history'

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const addToHistory = (name: string, sources: SourceIn[]) => {
    const newItem: HistoryItem = {
      id: uuidv4(),
      name,
      sources,
      createdAt: new Date(),
    }
    setHistory((prev) => [newItem, ...prev])
    return newItem.id
  }

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const getHistoryItem = (id: string) => {
    return history.find((item) => item.id === id)
  }

  return (
    <HistoryContext.Provider
      value={{ history, addToHistory, removeFromHistory, getHistoryItem }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
