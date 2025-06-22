import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import type { DocumentCardProps } from './types'
import { formatDate } from '../../lib'

const DocumentCard = ({ document }: DocumentCardProps) => {
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
        <Typography
          variant="h6"
          component="div"
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          {document.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Updated {formatDate(document.updatedAt)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxHeight: 20 }}
        >
          {document.description || 'No description'}
        </Typography>
      </CardContent>

      <CardActions className="card-actions">
        <Button>Edit</Button>
        <Button color="error">Delete</Button>
      </CardActions>
    </Card>
  )
}

export default DocumentCard
