import { Route, Routes } from 'react-router'
import { RootLayout } from './components/layout'
import Home from './pages/home'

export default function _() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
