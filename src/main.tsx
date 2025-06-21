import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAutoSignin } from 'react-oidc-context'
import { routeTree } from './routeTree.gen'
import { WebStorageStateStore } from 'oidc-client-ts'
import AuthLoading from './pages/auth/AuthLoading'
import AuthError from './pages/auth/AuthError'
import AuthFailed from './pages/auth/AuthFailed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const oidcConfig = Object.freeze({
  authority: import.meta.env.VITE_KEYCLOAK_URL,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
})

const queryClient = new QueryClient()

const AuthWrapper = () => {
  const { isLoading, isAuthenticated, error } = useAutoSignin({
    signinMethod: 'signinRedirect',
  })

  if (error) {
    return <AuthError />
  }

  if (isLoading) {
    return <AuthLoading />
  }

  if (!isAuthenticated) {
    return <AuthFailed />
  }

  return <RouterProvider router={router} />
}

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('Failed to find #root element')
}
if (rootElement.innerHTML === '') {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider {...oidcConfig}>
          <AuthWrapper />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
