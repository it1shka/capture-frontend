import { create } from 'zustand'

const START_PAGES = 1

export type MenuTab = 'all' | 'recent'

interface MenuVars {
  search: string
  tab: MenuTab
  pages: number
}

interface MenuActions {
  setSearch: (newSearch: string) => void
  setTab: (newTab: MenuTab) => void
  fetchMore: () => void
  resetPages: () => void
}

type MenuState = MenuVars & MenuActions

export const useMenuState = create<MenuState>(set => ({
  search: '',
  tab: 'all',
  pages: START_PAGES,

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

  fetchMore: () => {
    set(prev => ({
      ...prev,
      pages: prev.pages + 1,
    }))
  },

  resetPages: () => {
    set(prev => ({
      ...prev,
      pages: START_PAGES,
    }))
  },
}))
