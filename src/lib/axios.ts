import axios from 'axios'
import { env } from '../env'


export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

export const cogna = axios.create({
  baseURL: env.VITE_API_COGNA_URL,
  headers: {
    Authorization: `Bearer ${env.VITE_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  
})



