import { useMenuState } from './state'
import { useGetDocumentsQuery } from '../../queries/getDocuments'
import {
  Alert,
  CircularProgress,
  Stack,
  Grid,
  Box,
  Button,
} from '@mui/material'
import DocumentCard from '../../components/DocumentCard'
import { useDebounce } from '../../lib'
import { useEffect } from 'react'

const SEARCH_DEBOUNCE = 300
const PAGE_SIZE = 20

const GeneralList = () => {
  const { search, pages, fetchMore, resetPages } = useMenuState()

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE)

  useEffect(() => {
    resetPages()
  }, [debouncedSearch])

  const { data, isPending } = useGetDocumentsQuery({
    search: debouncedSearch,
    page: 0,
    pageSize: PAGE_SIZE * pages,
  })

  if (data === undefined || data.length <= 0) {
    return (
      <Stack
        mt={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {!isPending && <Alert severity="info">No documents found</Alert>}
        {isPending && <CircularProgress />}
      </Stack>
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        flex: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'scroll',
        }}
      >
        <Grid mt={1} container spacing={1}>
          {data.map(document => (
            <Grid key={document.id} size={3}>
              <DocumentCard document={document} />
            </Grid>
          ))}
          <Grid size={3}>
            <Button onClick={fetchMore}>More</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default GeneralList
