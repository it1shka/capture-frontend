import { z } from 'zod'

export const lineSchema = z.object({
  tool: z.enum(['pen', 'eraser']),
  width: z.number().positive(),
  color: z.string(),
  points: z.array(z.number()),
})

export const documentSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  textContent: z.string().nullable(),
  canvasContent: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Document = z.infer<typeof documentSchema>

export const documentArraySchema = z.array(documentSchema)
