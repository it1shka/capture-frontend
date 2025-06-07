import type { ReactNode } from 'react'

export interface Size {
  width: number
  height: number
}

export interface SizeTrackerProps {
  children: (props: Size) => ReactNode
}
