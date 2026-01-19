import React from 'react'
import { Outlet } from 'react-router'

const LandingLayout = () => {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default LandingLayout