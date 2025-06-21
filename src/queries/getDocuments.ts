import { useQuery } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

// TODO:
export const useGetDocumentsQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_DOCUMENTS],
    queryFn: async () => {
      const response = await apiClient.get('/document')
      console.log(response.data)
      return response.data
    },
  })
}
