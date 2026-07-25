import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Contracts from './pages/Contracts'
import FindFreelancers from './pages/FindFreelancers'
import Layout from './components/Layout'
import Contact from "./pages/Contact";
import PrivacyPolicy from './pages/PrivacyPolicy'
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import TimeTracking from './pages/TimeTracking'
import Analytics from './pages/Analytics'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-900 dark:text-dark-50 bg-white dark:bg-dark-950">Loading...</div>

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/dashboard" />} />

        <Route element={<Layout user={user} setUser={setUser} />}>
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />
      
  </Route>

   <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route element={user ? <Layout user={user} setUser={setUser} /> : <Navigate to="/" />}>
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="projects" element={<Projects user={user} />} />
          <Route path="projects/:id" element={<ProjectDetail user={user} />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route path="messages" element={<Messages user={user} />} />
          <Route path="contracts" element={<Contracts user={user} />} />
          <Route path="contracts/:contractId/time-tracking" element={<TimeTracking />} />
          <Route path="find-freelancers" element={<FindFreelancers user={user} />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
