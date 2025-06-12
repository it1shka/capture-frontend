import { create } from 'zustand'
import { useConfirmDialogState } from '../../components/ConfirmDialog/state'

export type Tool = 'pen' | 'eraser'

export interface Line {
  tool: Tool
  width: number
  color: string
  points: number[]
}

interface EditorVars {
  textContent: string
  brushColor: string
  strokeWidth: number
  tool: Tool
  history: Line[]
  historyPointer: number
}

interface EditorActions {
  setTextContent: (newTextContent: string) => void
  setBrushColor: (newBrushColor: string) => void
  setStrokeWidth: (newStrokeWidth: number) => void
  setTool: (newTool: Tool) => void
  addLine: (newLine: Line) => void
  updateLine: (updatedLine: Line) => void
  eraseLines: () => void
  undoLine: () => void
  redoLine: () => void
}

type EditorState = EditorVars & EditorActions

export const MIN_STROKE_WIDTH = 1
export const MAX_STROKE_WIDTH = 20

const initialState = {
  textContent: '',
  brushColor: '#0f0f0f',
  strokeWidth: 5,
  tool: 'pen',
  history: [],
  historyPointer: 0,
} satisfies EditorVars

export const useEditorState = create<EditorState>(set => ({
  ...initialState,

  setTextContent: newTextContent => {
    set(prev => ({
      ...prev,
      textContent: newTextContent,
    }))
  },
  setBrushColor: newBrushColor => {
    set(prev => ({
      ...prev,
      brushColor: newBrushColor,
    }))
  },
  setStrokeWidth: newStrokeWidth => {
    set(prev => ({
      ...prev,
      strokeWidth: newStrokeWidth,
    }))
  },
  setTool: newTool => {
    set(prev => ({
      ...prev,
      tool: newTool,
    }))
  },

  addLine: newLine => {
    set(prev => {
      const activeHistory = prev.history.slice(0, prev.historyPointer)
      return {
        ...prev,
        history: [...activeHistory, newLine],
        historyPointer: prev.historyPointer + 1,
      }
    })
  },

  updateLine: updatedLine => {
    set(prev => {
      const preserve = prev.history.slice(0, prev.history.length - 1)
      return {
        ...prev,
        history: [...preserve, updatedLine],
      }
    })
  },

  eraseLines: () => {
    set(prev => ({
      ...prev,
      history: [],
      historyPointer: 0,
    }))
  },

  undoLine: () => {
    set(prev => ({
      ...prev,
      historyPointer: Math.max(0, prev.historyPointer - 1),
    }))
  },

  redoLine: () => {
    set(prev => ({
      ...prev,
      historyPointer: Math.min(prev.history.length, prev.historyPointer + 1),
    }))
  },
}))

export const useEditorStateComputedProps = () => {
  const { history, historyPointer } = useEditorState()

  const activeLines = history.slice(0, historyPointer)
  const canUndo = historyPointer > 0
  const canRedo = historyPointer < history.length
  const lastLine = history.length > 0 ? history[history.length - 1] : null

  return {
    activeLines,
    canUndo,
    canRedo,
    lastLine,
  } as const
}

export const useEraseLinesWithConfirmation = () => {
  const eraseLines = useEditorState(store => store.eraseLines)
  const openConfirmDialog = useConfirmDialogState(
    store => store.openConfirmDialog,
  )

  return () => {
    openConfirmDialog({
      title: 'Are you sure you want to clean the canvas?',
      message: 'This action cannot be undone',
      action: eraseLines,
    })
  }
}
