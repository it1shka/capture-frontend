import Editor from './Editor'
import { Route } from '../../routes/editor/$documentId'
import { useGetDocumentQuery } from '../../queries/getDocument'
import { Alert, CircularProgress, Stack } from '@mui/material'

const EditorPage = () => {
  const { documentId } = Route.useParams()

  const { data: document, isPending } = useGetDocumentQuery(documentId)

  if (document === undefined) {
    return (
      <Stack
        direction="column"
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        {isPending && <CircularProgress />}
        {!isPending && (
          <Alert severity="info">No such document was found</Alert>
        )}
      </Stack>
    )
  }

  return <Editor />
}

export default EditorPage
