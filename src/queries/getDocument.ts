import { useQuery } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'
import { documentSchema } from './documentSchema'

export const useGetDocumentQuery = (documentId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_DOCUMENT, documentId],
    queryFn: async () => {
      const response = await apiClient.get(`/document/${documentId}`)
      return documentSchema.parse(response.data)
    },
  })
}
