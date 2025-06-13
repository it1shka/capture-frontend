import { create } from 'zustand'

export type MenuTab = 'all' | 'recent'

interface MenuVars {
  search: string
  tab: MenuTab
}

interface MenuActions {
  setSearch: (newSearch: string) => void
  setTab: (newTab: MenuTab) => void
}

type MenuState = MenuVars & MenuActions

export const useMenuState = create<MenuState>(set => ({
  search: '',
  tab: 'all',

  setSearch: newSearch => {
    set(prev => ({
      ...prev,
      search: newSearch,
    }))
  },

  setTab: newTab => {
    set(prev => ({
      ...prev,
      tab: newTab,
    }))
  },
}))
