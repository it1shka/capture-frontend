import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAuth } from 'react-oidc-context'
import LogoutIcon from '@mui/icons-material/Logout'

const LogoutButton = () => {
  const auth = useAuth()

  const handleLogout = () => {
    auth.signoutRedirect()
  }

  return (
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  )
}

export default LogoutButton
