import { create } from 'zustand'

interface ActivateTokenDialogState {
  isOpen: boolean

  openTokenDialog: () => void
  closeTokenDialog: () => void
}

export const useActivateTokenDialogState = create<ActivateTokenDialogState>(
  set => ({
    isOpen: false,

    openTokenDialog: () => {
      set(prev => ({
        ...prev,
        isOpen: true,
      }))
    },

    closeTokenDialog: () => {
      set(prev => ({
        ...prev,
        isOpen: false,
      }))
    },
  }),
)
