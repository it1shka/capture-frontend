import { Alert, Button, Stack } from '@mui/material'

const AuthError = () => {
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
      <Alert severity="error">Authentication error occured</Alert>

      <Button variant="outlined" href="/">
        Go to the main page
      </Button>
    </Stack>
  )
}

export default AuthError
