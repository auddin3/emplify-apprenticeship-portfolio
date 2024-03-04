import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Portfolios from '../pages/Portfolios'
import Portfolio from './portfolios/PortfolioSummary'
import Library from '../pages/Library'
import Profile from '../pages/Profile'
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
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/portfolios/:pid" element={<Portfolio />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
