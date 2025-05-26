import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAuth } from 'react-oidc-context'
import LogoutIcon from '@mui/icons-material/Logout'
import { useConfirmDialogState } from '../ConfirmDialog/state'

const LogoutButton = () => {
  const auth = useAuth()
  const logoutAction = () => {
    auth.signoutRedirect()
  }

  const { openConfirmDialog } = useConfirmDialogState()
  const handleLogout = () => {
    openConfirmDialog({
      title: 'Are you sure you want to log out?',
      message: 'Please confirm this action before moving on',
      action: logoutAction,
    })
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
