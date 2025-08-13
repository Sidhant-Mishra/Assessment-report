import { Outlet } from "react-router-dom";

import React from 'react'
import Header from "./components/Header";

function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
    <Header/>
    <div className="mt-10">
      <Outlet />
    </div>
    </div>
  )
}

export default Layout
