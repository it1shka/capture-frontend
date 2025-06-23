import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useTokenDialogState } from './state'

const TokenDialog = () => {
  const { isOpen, token, closeTokenDialog } = useTokenDialogState()

  const handleCopy = () => {
    if (token === null) {
      return
    }
    navigator.clipboard.writeText(token)
  }

  return (
    <Dialog open={isOpen} onClose={closeTokenDialog}>
      <DialogTitle>Access Token</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is your access token that allows other people read and/or edit
          your document
        </DialogContentText>
        <Alert severity="warning" sx={{ my: 1 }}>
          Please, don't share this token with malicious people!
        </Alert>
        <TextField
          fullWidth
          value={token}
          InputProps={{
            readOnly: true,
            sx: { fontFamily: 'monospace' },
          }}
          variant="outlined"
          size="small"
        />
        <DialogActions>
          <Button variant="outlined" onClick={closeTokenDialog}>
            Close
          </Button>
          <Button variant="contained" onClick={handleCopy}>
            Copy
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default TokenDialog
