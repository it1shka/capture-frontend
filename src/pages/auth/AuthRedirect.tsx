import { CircularProgress, Stack, Typography } from '@mui/material'

const AuthRedirect = () => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <CircularProgress />
      <Typography variant="h5">Redirecting...</Typography>
    </Stack>
  )
}

export default AuthRedirect
