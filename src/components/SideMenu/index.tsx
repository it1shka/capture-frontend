import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import AddIcon from '@mui/icons-material/Add'
import { useSideMenuState } from './state'
import RouterLink from '../RouterLink'
import { useNewDocumentFormState } from '../NewDocumentForm/state'

const SideMenu = () => {
  const { isOpen, closeMenu } = useSideMenuState()
  const openNewDocumentForm = useNewDocumentFormState(state => state.openForm)

  return (
    <Drawer anchor="left" open={isOpen} onClose={closeMenu}>
      <List
        component="nav"
        sx={{ width: 260, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Navigate to:</ListSubheader>}
      >
        <ListItemButton onClick={openNewDocumentForm}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Document" />
        </ListItemButton>
        <ListItemButton LinkComponent={RouterLink} href="/">
          <ListItemIcon>
            <TextSnippetIcon />
          </ListItemIcon>
          <ListItemText primary="All Documents" />
        </ListItemButton>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Recent documents:</ListSubheader>}
        ></List>
      </List>
    </Drawer>
  )
}

export default SideMenu
