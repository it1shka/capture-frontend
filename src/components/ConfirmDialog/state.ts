import { create } from 'zustand'

export interface ConfirmDialogConfig {
  title: string
  message: string
  action: () => void
}

interface ConfirmDialogState {
  isOpen: boolean
  config: ConfirmDialogConfig | null

  openConfirmDialog: (config: ConfirmDialogConfig) => void
  closeConfirmDialog: () => void
}

export const useConfirmDialogState = create<ConfirmDialogState>(set => ({
  isOpen: false,
  config: null,

  openConfirmDialog: config => {
    set(prev => ({
      ...prev,
      isOpen: true,
      config,
    }))
  },

  closeConfirmDialog: () => {
    set(prev => ({
      ...prev,
      isOpen: false,
    }))
  },
}))
