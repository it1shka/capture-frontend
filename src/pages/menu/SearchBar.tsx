import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { useMenuState } from './state'
import { useNewDocumentFormState } from '../../components/NewDocumentForm/state'

const SearchBar = () => {
  const { search, setSearch } = useMenuState()

  const openNewDocumentForm = useNewDocumentFormState(store => store.openForm)

  return (
    <Stack mt={4} spacing={2}>
      <Typography variant="h5">Access all your documents at once ✨</Typography>
      <TextField
        value={search}
        onChange={event => {
          setSearch(event.target.value)
        }}
        id="large-menu-document-search"
        placeholder="Search by document title..."
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box>
        <Button
          onClick={openNewDocumentForm}
          startIcon={<AddIcon />}
          variant="contained"
          color="success"
        >
          New Document
        </Button>
      </Box>
    </Stack>
  )
}

export default SearchBar
