import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../store/authSlice'

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!isAuthenticated) return <Navigate to="/sign-in" replace />

  return <>{children}</>
}

export default RequireAuth
