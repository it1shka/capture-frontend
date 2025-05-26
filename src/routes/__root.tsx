import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CssBaseline } from '@mui/material'
import Appbar from '../components/Appbar'
import SideMenu from '../components/SideMenu'
import NewDocumentForm from '../components/NewDocumentForm'
import ConfirmDialog from '../components/ConfirmDialog'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Appbar />
        <SideMenu />
        <ConfirmDialog />
        <NewDocumentForm />
        <Outlet />
        <CssBaseline />
        <TanStackRouterDevtools />
      </>
    )
  },
})
