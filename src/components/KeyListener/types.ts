import type { ReactNode, CSSProperties, KeyboardEvent } from 'react'

type HotKeyHandler = (event: KeyboardEvent<HTMLDivElement>) => void

export type HotKeys = Record<string, HotKeyHandler>

export interface KeyListenerProps {
  children: ReactNode
  hotkeys?: HotKeys
  style?: CSSProperties
}

export interface ParsedHotKey {
  key: string
  meta: boolean
  ctrl: boolean
  prevent: boolean
  stop: boolean
  handler: HotKeyHandler
}
