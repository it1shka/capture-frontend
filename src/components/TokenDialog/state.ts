import { create } from 'zustand'

interface TokenDialogState {
  isOpen: boolean
  token: string | null

  openTokenDialog: (token: string) => void
  closeTokenDialog: () => void
}

export const useTokenDialogState = create<TokenDialogState>(set => ({
  isOpen: false,
  token: null,

  openTokenDialog: token => {
    set(prev => ({
      ...prev,
      isOpen: true,
      token,
    }))
  },

  closeTokenDialog: () => {
    set(prev => ({
      ...prev,
      isOpen: false,
      token: null,
    }))
  },
}))
