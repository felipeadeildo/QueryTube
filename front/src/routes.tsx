import { Route, Routes } from 'react-router'
import Home from './pages/home'

export default function _() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
