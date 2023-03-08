import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar';
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <ToastContainer autoClose={4000}/>
    </Fragment>
  )
}

export default Layout