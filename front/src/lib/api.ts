import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:8000/api' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
