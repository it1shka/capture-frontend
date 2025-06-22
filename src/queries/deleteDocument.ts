import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

const KEYS_TO_INVALIDATE = [
  QueryKey.DELETE_DOCUMENT,
  QueryKey.GET_DOCUMENTS,
  QueryKey.GET_DOCUMENT,
]

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QueryKey.DELETE_DOCUMENT],
    mutationFn: async (documentId: string) => {
      const response = await apiClient.delete(`/document/${documentId}`)
      return response.data
    },
    onSuccess: () => {
      for (const key of KEYS_TO_INVALIDATE) {
        queryClient.invalidateQueries({
          queryKey: [key],
        })
      }
    },
  })
}
