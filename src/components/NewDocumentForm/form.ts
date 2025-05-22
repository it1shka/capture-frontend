import { z } from 'zod'
import { useForm } from '@tanstack/react-form'

export const useNewDocumentForm = () => {
  const form = useForm({
    defaultValues: {
      documentName: '',
    },
    validators: {
      onChange: z.object({
        documentName: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      // TODO: create document on the backend
      console.log(value)
    },
  })
  return form
}
