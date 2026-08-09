import axios from 'axios'

const API = axios.create({ baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000/api' })

export function setAuthToken(token?: string){
  if(token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete API.defaults.headers.common['Authorization']
}

export default API
