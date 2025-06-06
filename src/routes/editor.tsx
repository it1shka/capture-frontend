import { createFileRoute } from '@tanstack/react-router'
import { withAuthenticationRequired } from 'react-oidc-context'
import Editor from '../pages/Editor'
import AuthRedirect from '../pages/auth/AuthRedirect'

export const Route = createFileRoute('/editor')({
  component: withAuthenticationRequired(Editor, {
    OnRedirecting: AuthRedirect,
  }),
})
