import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useActivateTokenDialogState } from './state'
import { useActivateTokenForm } from './form'

const ActivateTokenDialog = () => {
  const { isOpen, closeTokenDialog } = useActivateTokenDialogState()

  const form = useActivateTokenForm()

  return (
    <Dialog open={isOpen} onClose={closeTokenDialog}>
      <Stack
        direction="column"
        gap={1}
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
        <Typography variant="h6">Token Activation</Typography>
        <form.Field
          name="token"
          children={field => {
            return (
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                label="Access token"
                placeholder="Access token: "
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
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                loading={isSubmitting}
                variant="contained"
                disabled={!canSubmit}
              >
                Activate
              </Button>
            )}
          />
          <Button variant="outlined" onClick={closeTokenDialog}>
            Close
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}

export default ActivateTokenDialog
