import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useCreateDocumentMutation } from '../../queries/createDocument'
import { useNewDocumentFormState } from './state'

interface NewDocumentFormData {
  documentName: string
  documentDescription?: string
}

const defaultValues: NewDocumentFormData = {
  documentName: '',
  documentDescription: '',
}

const formValidation = z.object({
  documentName: z
    .string()
    .trim()
    .min(4, 'Title should be at least 4 characters long')
    .max(35, 'Title should be at most 35 characters long'),
  documentDescription: z
    .string()
    .max(400, 'Description should be at most 400 characters long')
    .optional(),
})

export const useNewDocumentForm = () => {
  const { mutateAsync } = useCreateDocumentMutation()
  const closeForm = useNewDocumentFormState(store => store.closeForm)

  const form = useForm({
    defaultValues,
    validators: {
      onChange: formValidation,
    },
    onSubmit: async ({ value }) => {
      const { documentName, documentDescription } = value
      try {
        await mutateAsync({
          title: documentName,
          description: documentDescription,
        })
        form.reset()
        closeForm()
      } catch {
        // TODO:
      }
    },
  })
  return form
}
