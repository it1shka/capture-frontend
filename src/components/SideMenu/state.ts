import { create } from 'zustand'

type SideMenuState = {
  isOpen: boolean
  search: string
  openMenu(): void
  closeMenu(): void
  setSearch(newSearch: string): void
  clearSearch(): void
}

export const useSideMenuState = create<SideMenuState>(set => ({
  search: '',
  isOpen: false,

  openMenu: () => {
    set(prev => ({
      ...prev,
      isOpen: true,
    }))
  },

  closeMenu: () => {
    set(prev => ({
      ...prev,
      isOpen: false,
    }))
  },

  setSearch: newSearch => {
    set(prev => ({
      ...prev,
      search: newSearch,
    }))
  },

  clearSearch: () => {
    set(prev => ({
      ...prev,
      search: '',
    }))
  },
}))
