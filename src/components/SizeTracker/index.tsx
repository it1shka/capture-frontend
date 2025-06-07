import { useEffect, useRef, useState } from 'react'
import type { Size, SizeTrackerProps } from './types'

const SizeTracker = ({ children }: SizeTrackerProps) => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (rootRef.current === null) {
      return
    }
    const observer = new ResizeObserver(entries => {
      if (entries.length <= 0) return
      const [entry] = entries
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(rootRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} style={{ width: '100%', height: '100%' }}>
      {children(size)}
    </div>
  )
}

export default SizeTracker
