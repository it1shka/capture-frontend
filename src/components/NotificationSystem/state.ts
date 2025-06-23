import { useState } from 'react'
import { create } from 'zustand'

const NOTIFICATION_LIMIT = 5

interface SnackNotification {
  message: string
  severity: 'success' | 'warning' | 'error' | 'info'
}

type SnackNotificationWithID = SnackNotification & {
  id: number
}

interface NotificationSystemStore {
  notifications: SnackNotificationWithID[]
  push: (newNotification: SnackNotification) => void
  pop: () => void
}

export const useNotificationSystemStore = create<NotificationSystemStore>(
  set => ({
    notifications: [],

    push: newNotification => {
      set(prev => ({
        ...prev,
        notifications:
          prev.notifications.length >= NOTIFICATION_LIMIT
            ? prev.notifications
            : [
                ...prev.notifications,
                {
                  ...newNotification,
                  id: Date.now(),
                },
              ],
      }))
    },

    pop: () => {
      set(prev => {
        const [_, ...tail] = prev.notifications
        return {
          ...prev,
          notifications: tail,
        }
      })
    },
  }),
)

const NOTIFICATION_DELAY = 300

export const useCurrentNotification = () => {
  const { notifications, pop } = useNotificationSystemStore()
  const [isClosing, setClosing] = useState(false)

  const close = () => {
    if (isClosing) return
    setClosing(true)
    setTimeout(() => {
      pop()
      setClosing(false)
    }, NOTIFICATION_DELAY)
  }

  return {
    isOpen: notifications.length > 0 && !isClosing,
    current: notifications[0],
    close,
  } as const
}
