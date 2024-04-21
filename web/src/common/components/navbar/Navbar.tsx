import React from 'react'
import { NavbarUser } from './NavbarUser'
import { NavigationOptions } from './NavigationOptions'

export const Navbar: React.FC = () => {
  return (
    <>
      <NavigationOptions />
      <NavbarUser />
    </>
  )
}

