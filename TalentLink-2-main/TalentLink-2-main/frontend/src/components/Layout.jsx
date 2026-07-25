import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../api/axios'
import TopNav from './TopNav'

export default function Layout({ user, setUser }) {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications')
      setNotifications(res.data)
    } catch (err) {
      console.error('Notifications fetch error:', err)
      // Don't show error to user for notifications, just log it
      // The axios interceptor will handle 422 errors by redirecting to login
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.info('You have been logged out.')
    navigate('/login')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors">
      <TopNav
        user={user}
        notifications={notifications}
        showNotifications={showNotifications}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        unreadCount={unreadCount}
        onLogout={handleLogout}
      />
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-gray-900 dark:text-dark-50 transition-colors">
        <Outlet />
      </main>
    </div>
  )
}
