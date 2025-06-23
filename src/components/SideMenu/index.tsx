import {
  Alert,
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
import DocumentSearch from './DocumentSearch'
import LogoutButton from './LogoutButton'
import { useMatches } from '@tanstack/react-router'
import TokenIcon from '@mui/icons-material/Token'
import DocumentWidget from './DocumentWidget'
import { useActivateTokenDialogState } from '../ActivateTokenDialog/state'

const SideMenu = () => {
  const { isOpen, closeMenu } = useSideMenuState()
  const openNewDocumentForm = useNewDocumentFormState(state => state.openForm)
  const openActivateTokenDialog = useActivateTokenDialogState(
    store => store.openTokenDialog,
  )

  const matches = useMatches()
  const editorMatch = matches.find(
    entry => entry.routeId === '/editor/$documentId',
  )

  return (
    <Drawer anchor="left" open={isOpen} onClose={closeMenu}>
      {editorMatch !== undefined && (
        <DocumentWidget documentId={editorMatch.params.documentId} />
      )}
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
        <ListItemButton onClick={openActivateTokenDialog}>
          <ListItemIcon>
            <TokenIcon />
          </ListItemIcon>
          <ListItemText primary="Activate Token" />
        </ListItemButton>
        <LogoutButton />
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Recent documents:</ListSubheader>}
        >
          <Alert severity="warning">Coming Soon!</Alert>
        </List>
        <DocumentSearch />
      </List>
    </Drawer>
  )
}

export default SideMenu
