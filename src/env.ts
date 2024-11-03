import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_COGNA_URL: z.string().url(),
  VITE_API_TOKEN: z.string(),
})

export const env = envSchema.parse(import.meta.env)
