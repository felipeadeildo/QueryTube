import { SourceIn } from '@/types/source'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface HistoryItem {
  name: string
  sources: SourceIn[]
}

interface HistoryContextType {
  history: HistoryItem[]
  addToHistory: (item: HistoryItem) => void
  removeFromHistory: (name: string) => void
  getHistoryItem: (name: string) => HistoryItem | undefined
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

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev])
  }

  const removeFromHistory = (name: string) => {
    setHistory((prev) => prev.filter((item) => item.name !== name))
  }

  const getHistoryItem = (name: string) => {
    return history.find((item) => item.name === name)
  }

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        removeFromHistory,
        getHistoryItem,
      }}
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
