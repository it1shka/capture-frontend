import {
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material'
import { useGetDocumentQuery } from '../../queries/getDocument'
import KeyIcon from '@mui/icons-material/Key'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { useGenerateTokenMutation } from '../../queries/generateToken'
import { useTokenDialogState } from '../TokenDialog/state'
import { useGetDocumentPermissionQuery } from '../../queries/getDocumentPermission'
import { canDelete, canEdit } from '../../lib'
import { useNotificationSystemStore } from '../NotificationSystem/state'

interface DocumentWidgetProps {
  documentId: string
}

const DocumentWidget = ({ documentId }: DocumentWidgetProps) => {
  const { data: document, isPending } = useGetDocumentQuery(documentId)
  const { data: permission } = useGetDocumentPermissionQuery(documentId)
  const deletionEnabled = canDelete(permission)
  const editionEnabled = canEdit(permission)

  const { mutateAsync: generateToken, isPending: tokenPending } =
    useGenerateTokenMutation()

  const openTokenDialog = useTokenDialogState(store => store.openTokenDialog)
  const pushNotification = useNotificationSystemStore(store => store.push)

  const handleGenerateToken = (role: 'EDITOR' | 'VIEWER') => {
    if (document === undefined) {
      return
    }
    generateToken({
      documentId: document.id,
      accessLevel: role,
    })
      .then(token => {
        openTokenDialog(token)
      })
      .catch(() => {
        pushNotification({
          severity: 'error',
          message: 'Failed to generate access token',
        })
      })
  }

  return (
    <List
      sx={{ width: 260, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Current Document:</ListSubheader>}
    >
      <Stack direction="column" gap={1} px={2} py={1}>
        {isPending && <CircularProgress sx={{ alignSelf: 'center' }} />}
        {!isPending && document !== undefined && (
          <>
            <Typography variant="h6">{document.title}</Typography>
            <Typography variant="body2">
              {document.description || 'No description'}
            </Typography>
          </>
        )}
      </Stack>
      {editionEnabled && (
        <ListItemButton>
          <ListItemIcon>
            <ChangeCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Rename" />
        </ListItemButton>
      )}
      {deletionEnabled && (
        <ListItemButton
          onClick={() => handleGenerateToken('VIEWER')}
          disabled={isPending || tokenPending}
        >
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText primary="Generate viewer token" />
        </ListItemButton>
      )}
      {deletionEnabled && (
        <ListItemButton
          onClick={() => handleGenerateToken('EDITOR')}
          disabled={isPending || tokenPending}
        >
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText primary="Generate editor token" />
        </ListItemButton>
      )}
    </List>
  )
}

export default DocumentWidget
