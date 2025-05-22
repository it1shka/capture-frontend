import { create } from 'zustand'

interface NewDocumentFormState {
  isOpen: boolean
  openForm(): void
  closeForm(): void
}

export const useNewDocumentFormState = create<NewDocumentFormState>(set => ({
  isOpen: false,

  openForm: () => {
    set(prev => ({
      ...prev,
      isOpen: true,
    }))
  },

  closeForm: () => {
    set(prev => ({
      ...prev,
      isOpen: false,
    }))
  },
}))
