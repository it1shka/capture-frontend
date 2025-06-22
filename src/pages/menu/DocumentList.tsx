import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useMenuState, type MenuTab } from './state'
import GeneralList from './GeneralList'
import RecentList from './RecentList'

const isMenuTab = (maybeTab: unknown): maybeTab is MenuTab => {
  return (
    typeof maybeTab === 'string' &&
    (maybeTab === 'all' || maybeTab === 'recent')
  )
}

const DocumentList = () => {
  const { tab, setTab } = useMenuState()

  const handleTabChange = (_: unknown, newTab: unknown) => {
    if (!isMenuTab(newTab)) {
      return
    }
    setTab(newTab)
  }

  return (
    <Stack flex={1} mt={4} direction="column">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="All" value="all" />
          <Tab label="Recent" value="recent" />
        </Tabs>
      </Box>

      {tab === 'all' && <GeneralList />}

      {tab === 'recent' && <RecentList />}
    </Stack>
  )
}

export default DocumentList
