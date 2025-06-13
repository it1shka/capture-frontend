import { Stack } from '@mui/material'
import SearchBar from './SearchBar'
import DocumentList from './DocumentList'

const MenuPage = () => {
  return (
    <Stack
      flex={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flex={1} direction="column" width="min(1020px, 100vw)">
        <SearchBar />
        <DocumentList />
      </Stack>
    </Stack>
  )
}

export default MenuPage
