import { Dropdown } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as ClubsIcon } from '../assets/clubs.svg'
import { signOut } from '../services/authService'
import { selectEmail, selectIsAuthenticated } from '../store/authSlice'
import * as styles from './AppLayout.module.scss'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const email = useSelector(selectEmail)
  const { pathname } = useLocation()
  const menuItems = { items: [{ key: 'signout', label: 'Sign out', onClick: () => signOut() }] }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <ClubsIcon className={styles.logo} aria-label="Sanakortit" />
        </div>
        <div className={styles.authArea}>
          {isAuthenticated ? (
            <Dropdown menu={menuItems} trigger={['click']}>
              <div className={styles.email}>{email}</div>
            </Dropdown>
          ) : (
            pathname !== '/sign-in' && <Link to="/sign-in">Sign in</Link>
          )}
        </div>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default AppLayout
