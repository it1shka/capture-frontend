import { z } from 'zod'
import { useForm } from '@tanstack/react-form'

export const useNewDocumentForm = () => {
  const form = useForm({
    defaultValues: {
      documentName: '',
    },
    validators: {
      onChange: z.object({
        documentName: z
          .string()
          .trim()
          .min(4, 'Title should be at least 4 characters long')
          .max(35, 'Title should be at most 35 characters long'),
      }),
    },
    onSubmit: ({ value }) => {
      // TODO: create document on the backend
      console.log(value)
    },
  })
  return form
}
