import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  TAG_MANAGER: z.string(),
})

export const env = envSchema.parse(import.meta.env)
