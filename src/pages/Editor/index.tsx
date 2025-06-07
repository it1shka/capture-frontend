import { Box, Divider, Paper, Stack } from '@mui/material'
import { Resizable } from 're-resizable'
import TextEditor from './TextEditor'
import VisualCanvas from './VisualCanvas'
import Palette from './Palette'

const Editor = () => {
  return (
    <Stack flex={1} overflow="hidden" direction="row" bgcolor="grey.100">
      <Resizable
        defaultSize={{
          height: '100%',
          width: '60%',
        }}
        minWidth="30%"
        maxWidth="80%"
      >
        <Box sx={{ width: '100%', height: '100%', p: 2 }}>
          <Paper sx={{ width: '100%', height: '100%' }} elevation={3}>
            <Stack sx={{ width: '100%', height: '100%' }} direction="column">
              <Palette />
              <Divider />
              <Box flex={1}>
                <VisualCanvas />
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Resizable>
      <Box flex={1} sx={{ pt: 2, pr: 2 }}>
        <TextEditor />
      </Box>
    </Stack>
  )
}

export default Editor
