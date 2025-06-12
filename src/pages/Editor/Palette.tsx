import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import {
  MAX_STROKE_WIDTH,
  MIN_STROKE_WIDTH,
  useEditorState,
  useEditorStateComputedProps,
  useEraseLinesWithConfirmation,
} from './state'

const Palette = () => {
  const [openColor, setOpenColor] = useState(false)
  const {
    brushColor,
    strokeWidth,
    tool,
    setBrushColor,
    setStrokeWidth,
    setTool,
    undoLine,
    redoLine,
  } = useEditorState()

  const { canUndo, canRedo } = useEditorStateComputedProps()

  const handleErase = useEraseLinesWithConfirmation()

  return (
    <Stack direction="row" padding={1} gap={1} alignItems="center">
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="tool-label">Tool</InputLabel>
        <Select
          labelId="tool-label"
          label="Tool"
          value={tool}
          onChange={event => {
            const { value } = event.target
            setTool(value)
          }}
        >
          <MenuItem value="pen">Pen</MenuItem>
          <MenuItem value="eraser">Eraser</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="stroke-width-label">Width</InputLabel>
        <Select
          labelId="stroke-width-label"
          label="Width"
          value={strokeWidth}
          onChange={event => {
            setStrokeWidth(event.target.value)
          }}
        >
          {Array(MAX_STROKE_WIDTH - MIN_STROKE_WIDTH + 1)
            .fill(null)
            .map((_, index) => (
              <MenuItem key={index} value={index + MIN_STROKE_WIDTH}>
                {index + MIN_STROKE_WIDTH}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Box position="relative">
        <Button
          onClick={() => {
            setOpenColor(prev => !prev)
          }}
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

      <Tooltip title="Ctrl+Z">
        <Button
          onClick={undoLine}
          variant="outlined"
          disabled={!canUndo}
          endIcon={<UndoIcon />}
        >
          Undo
        </Button>
      </Tooltip>

      <Tooltip title="Ctrl+U">
        <Button
          onClick={redoLine}
          variant="outlined"
          disabled={!canRedo}
          endIcon={<RedoIcon />}
        >
          Redo
        </Button>
      </Tooltip>

      <Tooltip title="Ctrl+X">
        <Button
          onClick={handleErase}
          variant="outlined"
          color="error"
          endIcon={<DeleteOutlineIcon />}
        >
          Erase
        </Button>
      </Tooltip>
    </Stack>
  )
}

export default Palette
