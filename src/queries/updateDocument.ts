import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

type UpdateDocumentMutationProps = {
  id: string
} & Partial<{
  title: string
  description: string
  textContent: string
  canvasContent: string
}>

export const useUpdateDocumentWithoutInvalidationMutation = () => {
  return useMutation({
    mutationKey: [QueryKey.UPDATE_DOCUMENT],
    mutationFn: async (params: UpdateDocumentMutationProps) => {
      const { id, ...updateParams } = params
      const response = await apiClient.put(`/document/${id}`, updateParams)
      return response.data
    },
  })
}

export const useUpdateDocumentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QueryKey.UPDATE_DOCUMENT],
    mutationFn: async (params: UpdateDocumentMutationProps) => {
      const { id, ...updateParams } = params
      const response = await apiClient.put(`/document/${id}`, updateParams)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_DOCUMENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_DOCUMENT],
      })
    },
  })
}
