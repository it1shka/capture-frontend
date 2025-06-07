import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useConfirmDialogState } from './state'

const ConfirmDialog = () => {
  const { isOpen, config, closeConfirmDialog } = useConfirmDialogState()

  const title = config?.title ?? 'Are you sure?'
  const message = config?.message ?? 'This action cannot be undone'
  const action = config?.action ?? closeConfirmDialog

  const handleAgree = () => {
    action()
    closeConfirmDialog()
  }

  return (
    <Dialog open={isOpen} onClose={closeConfirmDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={closeConfirmDialog}>
          Cancel
        </Button>
        <Button color="error" onClick={handleAgree} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
