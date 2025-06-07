import { Box, Button, Stack } from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { useEditorState } from './state'

const Palette = () => {
  const [openColor, setOpenColor] = useState(false)
  const { brushColor, setBrushColor } = useEditorState()

  return (
    <Stack direction="row" padding={0.5}>
      <Box position="relative">
        <Button
          onClick={() => {
            setOpenColor(prev => !prev)
          }}
          size="small"
          variant="outlined"
          endIcon={
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: brushColor,
              }}
            />
          }
        >
          Color:
        </Button>
        {openColor && (
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(100% + 2px)',
              left: 0,
              zIndex: 1,
            }}
          >
            <SketchPicker
              color={brushColor}
              onChange={color => {
                setBrushColor(color.hex)
              }}
            />
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export default Palette
