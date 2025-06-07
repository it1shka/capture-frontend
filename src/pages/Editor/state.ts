import { create } from 'zustand'

export type Tool = 'pen' | 'eraser'

interface EditorVars {
  textContent: string
  brushColor: string
  strokeWidth: number
  tool: Tool
}

interface EditorActions {
  setTextContent: (newTextContent: string) => void
  setBrushColor: (newBrushColor: string) => void
  setStrokeWidth: (newStrokeWidth: number) => void
  setTool: (newTool: Tool) => void
}

type EditorState = EditorVars & EditorActions

export const MIN_STROKE_WIDTH = 1
export const MAX_STROKE_WIDTH = 20

const initialState = {
  textContent: '',
  brushColor: '#0f0f0f',
  strokeWidth: 5,
  tool: 'pen',
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
}))
