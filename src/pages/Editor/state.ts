import { create } from 'zustand'

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
  lines: Line[]
}

interface EditorActions {
  setTextContent: (newTextContent: string) => void
  setBrushColor: (newBrushColor: string) => void
  setStrokeWidth: (newStrokeWidth: number) => void
  setTool: (newTool: Tool) => void
  addLine: (newLine: Line) => void
  updateLine: (updatedLine: Line) => void
  eraseLines: () => void
}

type EditorState = EditorVars & EditorActions

export const MIN_STROKE_WIDTH = 1
export const MAX_STROKE_WIDTH = 20

const initialState = {
  textContent: '',
  brushColor: '#0f0f0f',
  strokeWidth: 5,
  tool: 'pen',
  lines: [],
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
    set(prev => ({
      ...prev,
      lines: [...prev.lines, newLine],
    }))
  },

  updateLine: updatedLine => {
    set(prev => {
      const preserve = prev.lines.slice(0, prev.lines.length - 1)
      return {
        ...prev,
        lines: [...preserve, updatedLine],
      }
    })
  },

  eraseLines: () => {
    set(prev => ({
      ...prev,
      lines: [],
    }))
  },
}))
