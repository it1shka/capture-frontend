import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CssBaseline, Stack } from '@mui/material'
import Appbar from '../components/Appbar'
import SideMenu from '../components/SideMenu'
import NewDocumentForm from '../components/NewDocumentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import { useApiClientTokenSync } from '../queries/apiClient'
import TokenDialog from '../components/TokenDialog'
import ActivateTokenDialog from '../components/ActivateTokenDialog'

export const Route = createRootRoute({
  component: () => {
    useApiClientTokenSync()

    return (
      <>
        <SideMenu />
        <ConfirmDialog />
        <TokenDialog />
        <ActivateTokenDialog />
        <NewDocumentForm />
        <Stack direction="column" width="100vw" height="100vh">
          <Appbar />
          <Outlet />
        </Stack>
        <CssBaseline />
        <TanStackRouterDevtools />
      </>
    )
  },
})
