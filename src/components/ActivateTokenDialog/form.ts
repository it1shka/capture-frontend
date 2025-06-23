import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useActivateTokenMutation } from '../../queries/activateToken'
import { useActivateTokenDialogState } from './state'

const tokenValidation = z.object({
  token: z.string().trim().nonempty(),
})

export const useActivateTokenForm = () => {
  const { mutateAsync: activateToken } = useActivateTokenMutation()
  const closeDialog = useActivateTokenDialogState(
    store => store.closeTokenDialog,
  )

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
      } catch {
        // TODO:
      }
    },
  })
  return form
}
