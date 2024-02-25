import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Portfolio from '../pages/Portfolio'
import Library from '../pages/Library'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolios" element={<Portfolio />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
