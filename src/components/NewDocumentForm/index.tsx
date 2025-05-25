import {
  Box,
  Button,
  Dialog,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNewDocumentFormState } from './state'
import { useNewDocumentForm } from './form'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

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
            console.log(field.state.meta.errors)
            return (
              <TextField
                size="small"
                fullWidth
                label="Document name"
                placeholder="Document name: "
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={event => {
                  field.handleChange(event.target.value)
                }}
                error={!field.state.meta.isValid}
                helperText={
                  field.state.meta.isValid
                    ? undefined
                    : field.state.meta.errors[0]?.message
                }
              />
            )
          }}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit /* isSubmitting */]) => (
              // TODO: use LoadingButton instead
              <Button type="submit" variant="contained" disabled={!canSubmit}>
                Create
              </Button>
            )}
          />
          <Button onClick={closeForm} variant="outlined">
            Cancel
          </Button>
          {/* TODO: */}
          <Tooltip title="Suggest title based on description">
            <Button
              disabled
              variant="outlined"
              color="secondary"
              endIcon={<HelpOutlineIcon />}
            >
              Suggest
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Dialog>
  )
}

export default NewDocumentForm
