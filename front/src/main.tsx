import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import Routes from './routes'

const queryClient = new QueryClient()

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </BrowserRouter>
)
