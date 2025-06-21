import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const useApiClientTokenSync = () => {
  const auth = useAuth()
  const access_token = auth.user?.access_token

  useEffect(() => {
    if (access_token === undefined) {
      delete apiClient.defaults.headers.common['Authorization']
      return
    }
    apiClient.defaults.headers.common['Authorization'] =
      `Bearer ${access_token}`
  }, [access_token])
}
