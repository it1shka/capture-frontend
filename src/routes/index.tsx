import { createFileRoute } from '@tanstack/react-router'
import MenuPage from '../pages/Menu'
import { withAuthenticationRequired } from 'react-oidc-context'
import AuthRedirect from '../pages/auth/AuthRedirect'

export const Route = createFileRoute('/')({
  component: withAuthenticationRequired(MenuPage, {
    OnRedirecting: AuthRedirect,
  }),
})
