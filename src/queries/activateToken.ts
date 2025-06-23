import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

export const useActivateTokenMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QueryKey.ACTIVATE_TOKEN],
    mutationFn: async (token: string) => {
      const response = await apiClient.post('/access-token/redeem', token, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_DOCUMENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_DOCUMENT],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_DOCUMENT_PERMISSION],
      })
    },
  })
}
