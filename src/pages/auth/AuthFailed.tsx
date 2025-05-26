import { Alert, Button, Stack } from '@mui/material'

const AuthFailed = () => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      spacing={1}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Alert severity="warning">Authentication failed</Alert>

      <Button variant="outlined" href="/">
        Go to the main page
      </Button>
    </Stack>
  )
}

export default AuthFailed
