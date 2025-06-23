import { useQuery } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'
import { documentSchema } from './documentSchema'

const HTTP_POLLING_INTERVAL = 500

export const useGetDocumentPollingQuery = (documentId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_DOCUMENT, documentId],
    queryFn: async () => {
      const response = await apiClient.get(`/document/${documentId}`)
      return documentSchema.parse(response.data)
    },
    refetchInterval: HTTP_POLLING_INTERVAL,
    placeholderData: previous => previous,
    notifyOnChangeProps: ['data'],
    staleTime: 0,
  })
}
