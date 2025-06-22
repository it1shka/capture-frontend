import {
  Alert,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListSubheader,
  TextField,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import DescriptionIcon from '@mui/icons-material/Description'
import { useSideMenuState } from './state'
import { useDebounce } from '../../lib'
import { useGetDocumentsQuery } from '../../queries/getDocuments'
import RouterLink from '../RouterLink'

const SEARCH_DEBOUNCE = 300
const SEARCH_SIZE = 5

const DocumentSearch = () => {
  const { search, setSearch, clearSearch } = useSideMenuState()

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE)

  const { data, isPending } = useGetDocumentsQuery({
    search: debouncedSearch,
    page: 0,
    pageSize: SEARCH_SIZE,
  })

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <>
          <ListSubheader sx={{ pb: 0, lineHeight: 'initial' }}>
            Quick search:
          </ListSubheader>
          <TextField
            value={search}
            onChange={event => {
              setSearch(event.target.value)
            }}
            sx={{ p: 1 }}
            fullWidth
            size="small"
            placeholder="Document title: "
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSearch} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </>
      }
    >
      {(data === undefined || data.length <= 0) && (
        <Stack p={2} alignItems="center" direction="column">
          {!isPending && <Alert severity="info">Nothing was found</Alert>}
          {isPending && <CircularProgress />}
        </Stack>
      )}
      {data &&
        data.map(document => (
          <ListItemButton
            LinkComponent={RouterLink}
            key={document.id}
            href={`/editor/${document.id}`}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={document.title} />
          </ListItemButton>
        ))}
    </List>
  )
}

export default DocumentSearch
