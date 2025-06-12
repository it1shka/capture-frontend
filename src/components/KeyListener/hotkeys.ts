import type { HotKeys, ParsedHotKey } from './types'

const hotkeyPattern = /^(meta|ctrl)\+(.)(\.prevent)?(\.stop)?$/i

export const parseHotKeys = (hotkeys: HotKeys) => {
  const output: ParsedHotKey[] = []
  for (const [hotkey, handler] of Object.entries(hotkeys)) {
    const parseResult = hotkeyPattern.exec(hotkey)
    if (parseResult === null) {
      console.error(`Incorrect hotkey specification: "${hotkey}"`)
      continue
    }
    const [_, metaOrCtrl, key, prevent, stop] = parseResult
    output.push({
      key,
      meta: metaOrCtrl.toLowerCase() === 'meta',
      ctrl: metaOrCtrl.toLowerCase() === 'ctrl',
      prevent: Boolean(prevent),
      stop: Boolean(stop),
      handler,
    })
  }
  return output
}
