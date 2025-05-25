import { Avatar, Button, Stack, Typography } from '@mui/material'
import { useAuth } from 'react-oidc-context'
import LogoutIcon from '@mui/icons-material/Logout'
import { stringAvatar } from '../../lib'

const ProfileInfo = () => {
  const auth = useAuth()

  const name = auth.user?.profile.name ?? 'Unknown User'
  const username = auth.user?.profile.preferred_username ?? 'unknown'

  return (
    <Stack direction="row" spacing={1.25}>
      <Stack direction="column" spacing={0}>
        <Typography variant="body1">{name}</Typography>
        <Typography textAlign="right" variant="body2">
          {'@' + username}
        </Typography>
      </Stack>
      <Avatar {...stringAvatar(name)} />
      <Stack direction="column" justifyContent="center">
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          endIcon={<LogoutIcon />}
        >
          Log Out
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProfileInfo
