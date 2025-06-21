import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

interface CreateDocumentMutationProps {
  title: string
  description?: string
}

// TODO:
export const useCreateDocumentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QueryKey.CREATE_DOCUMENT],
    mutationFn: async (params: CreateDocumentMutationProps) => {
      const response = await apiClient.post('/document', params)
      // TODO:
      console.log(response.data)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_DOCUMENTS] })
    },
  })
}
