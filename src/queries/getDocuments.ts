import { useQuery } from '@tanstack/react-query'
import { QueryKey } from './queryKeys'
import { apiClient } from './apiClient'
import { documentArraySchema } from './documentSchema'

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 20

interface GetDocumentsQueryProps {
  search: string
  page?: number
  pageSize?: number
}

export const useGetDocumentsQuery = ({
  search,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
}: GetDocumentsQueryProps) => {
  return useQuery({
    queryKey: [QueryKey.GET_DOCUMENTS, search, page, pageSize],
    queryFn: async () => {
      const response = await apiClient.get('/document', {
        params: {
          search,
          page,
          pageSize,
        },
      })
      return documentArraySchema.parse(response.data)
    },
  })
}
