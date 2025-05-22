import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CssBaseline } from '@mui/material'
import Appbar from '../components/Appbar'
import SideMenu from '../components/SideMenu'
import NewDocumentForm from '../components/NewDocumentForm'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Appbar />
        <SideMenu />
        <NewDocumentForm />
        <Outlet />
        <CssBaseline />
        <TanStackRouterDevtools />
      </>
    )
  },
})
