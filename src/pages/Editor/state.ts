import { create } from 'zustand'

interface EditorState {
  textContent: string
  setTextContent: (newTextContent: string) => void
}

export const useEditorState = create<EditorState>(set => ({
  textContent: '',
  setTextContent: newTextContent => {
    set(prev => ({
      ...prev,
      textContent: newTextContent,
    }))
  },
}))
