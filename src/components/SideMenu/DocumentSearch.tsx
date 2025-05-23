import {
  IconButton,
  InputAdornment,
  List,
  ListSubheader,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useSideMenuState } from './state'

const DocumentSearch = () => {
  const { search, setSearch, clearSearch } = useSideMenuState()

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
    ></List>
  )
}

export default DocumentSearch
