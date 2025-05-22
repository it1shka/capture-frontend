import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { useNewDocumentFormState } from './state'
import { useNewDocumentForm } from './form'

const NewDocumentForm = () => {
  const { isOpen, closeForm } = useNewDocumentFormState()

  const form = useNewDocumentForm()

  return (
    <Dialog
      open={isOpen}
      onClose={closeForm}
      aria-labelledby="New Document"
      aria-describedby="Form for creation of a new document"
    >
      <Box
        sx={{
          p: 3,
          width: 400,
        }}
        component="form"
        onSubmit={event => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Typography variant="h6" gutterBottom>
          New Document
        </Typography>
        <form.Field
          name="documentName"
          children={field => {
            return (
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Document name</InputLabel>
                <OutlinedInput
                  id={field.name}
                  name={field.name}
                  label="Document name"
                  placeholder="Document name: "
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={event => {
                    field.handleChange(event.target.value)
                  }}
                  error={!field.state.meta.isValid}
                />
              </FormControl>
            )
          }}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button type="submit" variant="contained" disabled={!canSubmit}>
                  Create
                </Button>
              </>
            )}
          />
          <Button onClick={closeForm} sx={{ mr: 2 }} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default NewDocumentForm
