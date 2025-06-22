import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

interface GenerateTokenMutationProps {
  documentId: string
  accessLevel: 'EDITOR' | 'VIEWER'
}

const tokenSchema = z.string()

export const useGenerateTokenMutation = () => {
  return useMutation({
    mutationKey: [QueryKey.GENERATE_TOKEN],
    mutationFn: async (params: GenerateTokenMutationProps) => {
      const response = await apiClient.post(`/access-token/generate`, params)
      const token = tokenSchema.parse(response.data)
      return token
    },
  })
}
