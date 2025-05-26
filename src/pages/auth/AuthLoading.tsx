import { CircularProgress, Stack, Typography } from '@mui/material'

const AuthLoading = () => {
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
      <Typography variant="h5">Loading authentication...</Typography>
    </Stack>
  )
}

export default AuthLoading
