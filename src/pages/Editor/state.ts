import { create } from 'zustand'

interface EditorState {
  textContent: string
  brushColor: string
  setTextContent: (newTextContent: string) => void
  setBrushColor: (newBrushColor: string) => void
}

export const useEditorState = create<EditorState>(set => ({
  textContent: '',
  brushColor: '#0f0f0f',
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
}))
