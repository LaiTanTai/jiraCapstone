import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <AuthHeader/>
        <Outlet/>
        <AuthFooter/>
    </div>
  )
}

export default MainLayout