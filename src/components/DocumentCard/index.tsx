import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Chip,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import type { DocumentCardProps } from './types'
import { formatDate } from '../../lib'
import { useGetDocumentPermissionQuery } from '../../queries/getDocumentPermission'
import RouterLink from '../RouterLink'
import { useDeleteDocumentMutation } from '../../queries/deleteDocument'
import { useConfirmDialogState } from '../ConfirmDialog/state'

const DocumentCard = ({ document }: DocumentCardProps) => {
  const { data: permission, isPending: isPermissionPending } =
    useGetDocumentPermissionQuery(document.id)

  const getPermissionChipColor = (permission: string) => {
    switch (permission) {
      case 'AUTHOR':
        return 'info'
      case 'EDITOR':
        return 'warning'
      case 'VIEWER':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const { mutate, isPending } = useDeleteDocumentMutation()
  const handleDelete = () => {
    mutate(document.id)
  }

  const openConfirmDialog = useConfirmDialogState(
    store => store.openConfirmDialog,
  )
  const handleCarefullyDelete = () => {
    openConfirmDialog({
      title: 'Are you sure?',
      message: 'Your document will be deleted permanently',
      action: handleDelete,
    })
  }

  return (
    <Card
      variant="outlined"
      sx={{
        '& > .card-actions': {
          opacity: 0,
          transition: '0.1s ease-in-out opacity',
        },
        '&:hover': {
          '& > .card-actions': {
            opacity: 1,
          },
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden', flex: 1, whiteSpace: 'nowrap' }}
          >
            {document.title}
          </Typography>
          {permission && !isPermissionPending && (
            <Chip
              label={permission.toLowerCase()}
              color={getPermissionChipColor(permission)}
              size="small"
              sx={{ ml: 1, textTransform: 'capitalize' }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Updated {formatDate(document.updatedAt)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {document.description || 'No description'}
        </Typography>
      </CardContent>

      <CardActions className="card-actions">
        <Button LinkComponent={RouterLink} href={`/editor/${document.id}`}>
          Edit
        </Button>
        <Button
          color="error"
          loading={isPending}
          onClick={handleCarefullyDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default DocumentCard
