import { create } from 'zustand'

type SideMenuState = {
  isOpen: boolean
  openMenu(): void
  closeMenu(): void
}

export const useSideMenuState = create<SideMenuState>(set => ({
  isOpen: false,

  openMenu: () =>
    set(prev => ({
      ...prev,
      isOpen: true,
    })),

  closeMenu: () =>
    set(prev => ({
      ...prev,
      isOpen: false,
    })),
}))
