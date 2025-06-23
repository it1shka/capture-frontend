import { Alert, Snackbar } from '@mui/material'
import { useCurrentNotification } from './state'

const AUTO_CLOSE_TIME = 3000

const NotificationSystem = () => {
  const { isOpen, current, close } = useCurrentNotification()

  return (
    <Snackbar
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'clickaway') return
        close()
      }}
      autoHideDuration={AUTO_CLOSE_TIME}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Alert
        onClose={close}
        severity={current?.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {current?.message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationSystem
