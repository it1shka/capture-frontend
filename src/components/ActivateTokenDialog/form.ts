import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useActivateTokenMutation } from '../../queries/activateToken'
import { useActivateTokenDialogState } from './state'
import { useNotificationSystemStore } from '../NotificationSystem/state'

const tokenValidation = z.object({
  token: z.string().trim().nonempty(),
})

export const useActivateTokenForm = () => {
  const { mutateAsync: activateToken } = useActivateTokenMutation()
  const closeDialog = useActivateTokenDialogState(
    store => store.closeTokenDialog,
  )

  const pushNotification = useNotificationSystemStore(store => store.push)

  const form = useForm({
    defaultValues: {
      token: '',
    },
    validators: {
      onChange: tokenValidation,
    },
    onSubmit: async ({ value }) => {
      try {
        const { token } = value
        await activateToken(token)
        form.reset()
        closeDialog()
        pushNotification({
          severity: 'success',
          message: 'Access token was activated',
        })
      } catch {
        pushNotification({
          severity: 'error',
          message: 'Failed to activate access token',
        })
      }
    },
  })
  return form
}
