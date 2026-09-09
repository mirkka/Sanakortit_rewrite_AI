import { GoogleOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { signInWithGoogle } from '../services/authService'

const SignInPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) message.error('Sign-in was cancelled or failed. Please try again.')
  }, [error])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <Button icon={<GoogleOutlined />} size="large" onClick={() => signInWithGoogle()}>
        Sign in with Google
      </Button>
    </div>
  )
}

export default SignInPage
