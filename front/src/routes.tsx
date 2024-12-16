import { Route, Routes } from 'react-router'
import { RootLayout } from './components/layout'
import ChatSession from './pages/chat-session'
import Home from './pages/home'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="chat/:id" element={<ChatSession />} />
      </Route>
    </Routes>
  )
}
