import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { completeSignIn } from '../services/authService'
import { AppDispatch } from '../store'
import { setAuthenticated } from '../store/authSlice'

const AuthCallbackGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const [pending, setPending] = useState(Boolean(code || error))

  useEffect(() => {
    if (error) {
      navigate('/sign-in?error=1', { replace: true })
      return
    }

    if (!code || !state) return

    completeSignIn(code, state)
      .then((email) => dispatch(setAuthenticated(email)))
      .catch(() => navigate('/sign-in?error=1', { replace: true }))
      .finally(() => {
        setPending(false)
        navigate('/', { replace: true })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (pending) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )

  return <>{children}</>
}

export default AuthCallbackGate
