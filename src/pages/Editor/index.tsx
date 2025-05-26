import { Box, Paper, Stack } from '@mui/material'
import { Resizable } from 're-resizable'
import TextEditor from './TextEditor'

const Editor = () => {
  return (
    <Stack flex={1} overflow="hidden" direction="row">
      <Resizable
        defaultSize={{
          height: '100%',
          width: '70%',
        }}
        minWidth="30%"
        maxWidth="80%"
      >
        <Box sx={{ width: '100%', height: '100%', p: 2, bgcolor: 'grey.100' }}>
          <Paper sx={{ width: '100%', height: '100%' }} elevation={3}>
            {/* TODO: add canvas drawing tool */}
          </Paper>
        </Box>
      </Resizable>
      <Box
        flex={1}
        sx={{
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'grey.200',
        }}
      >
        <TextEditor />
      </Box>
    </Stack>
  )
}

export default Editor
