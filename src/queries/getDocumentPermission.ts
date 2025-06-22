import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'

const roleEnum = z.enum(['AUTHOR', 'EDITOR', 'VIEWER'])

export const useGetDocumentPermissionQuery = (documentId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_DOCUMENT_PERMISSION, documentId],
    queryFn: async () => {
      const response = await apiClient.get(`/document/${documentId}/permission`)
      return roleEnum.parse(response.data)
    },
  })
}
