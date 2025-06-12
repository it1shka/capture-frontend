import { type KeyboardEvent } from 'react'
import type { KeyListenerProps } from './types'
import { parseHotKeys } from './hotkeys'

const KeyListener = ({
  children,
  hotkeys = {},
  style = {
    width: '100%',
    height: '100%',
  },
}: KeyListenerProps) => {
  const parsedHotkeys = parseHotKeys(hotkeys)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey of parsedHotkeys) {
      if (hotkey.key !== event.key) continue
      if (hotkey.meta && !event.metaKey) continue
      if (hotkey.ctrl && !event.ctrlKey) continue
      if (hotkey.prevent) {
        event.preventDefault()
      }
      if (hotkey.stop) {
        event.stopPropagation()
      }
      hotkey.handler(event)
    }
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} style={style}>
      {children}
    </div>
  )
}

export default KeyListener
