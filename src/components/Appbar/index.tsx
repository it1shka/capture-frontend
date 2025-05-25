import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useSideMenuState } from '../SideMenu/state'
import ProfileInfo from './ProfileInfo'

const Appbar = () => {
  const openMenu = useSideMenuState(state => state.openMenu)

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          onClick={openMenu}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Capture
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <ProfileInfo />
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
