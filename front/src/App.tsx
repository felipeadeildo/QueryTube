import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen bg-gray-200 text-2xl">
        Em desenvolvimento...
      </div>
    </QueryClientProvider>
  )
}

export default App
