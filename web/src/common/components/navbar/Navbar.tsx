import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavbarUser } from './NavbarUser'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const showNavbar = location.pathname !== ROUTING_PATH.completeProfile
  return showNavbar && <NavbarUser />
}
