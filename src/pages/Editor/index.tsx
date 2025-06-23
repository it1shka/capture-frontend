import Editor from './Editor'
import { Route } from '../../routes/editor/$documentId'
import { useGetDocumentQuery } from '../../queries/getDocument'
import { Alert, CircularProgress, Stack } from '@mui/material'
import { useEffect } from 'react'
import { z } from 'zod'
import { useEditorState } from './state'
import { lineSchema } from '../../queries/documentSchema'

const linesSchema = z.array(lineSchema)

const EditorPage = () => {
  const { documentId } = Route.useParams()

  const { data: document, isPending } = useGetDocumentQuery(documentId)
  const { setTextContent, setLines } = useEditorState()
  useEffect(() => {
    if (document === undefined) {
      return
    }
    setTextContent(document.textContent ?? '')
    if (document.canvasContent !== null) {
      try {
        const jsonUnknown = JSON.parse(document.canvasContent)
        const jsonContent = linesSchema.parse(jsonUnknown)
        setLines(jsonContent)
      } catch (error) {
        console.log(error)
        setLines([])
      }
    } else {
      setLines([])
    }

    // A hack
    return () => {
      setTextContent('')
    }
  }, [document])

  if (document === undefined || isPending) {
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
