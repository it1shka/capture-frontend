import { z } from 'zod'

export const documentSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  textContent: z.string().nullable(),
  canvasContent: z.record(z.any()).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Document = z.infer<typeof documentSchema>

export const documentArraySchema = z.array(documentSchema)
