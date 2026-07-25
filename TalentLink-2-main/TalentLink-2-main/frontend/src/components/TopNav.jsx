import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Briefcase,
  MessageSquare,
  FileText,
  User,
  LogOut,
  Bell,
  Users,
  Sun,
  Moon,
  BarChart3
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function TopNav({
  user,
  showNotifications = false,
  onToggleNotifications = () => {},
  notifications = [],
  unreadCount = 0,
  onLogout = () => {},
  authVariant = null
}) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  // Unified nav link style (same for ALL links)
  const navLinkBase =
    'inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors border-b-2 border-transparent'

  const activeLink =
    'text-blue-600 dark:text-dark-50 border-b-2 border-blue-600 dark:border-dark-50'

  const inactiveLink =
    'text-gray-600 dark:text-dark-200 hover:text-blue-600 dark:hover:text-dark-50'

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-dark-600 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT SECTION */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TalentLink
            </Link>

            {user && (
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600 dark:text-dark-200">

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`${navLinkBase} ${isActive('/dashboard') ? activeLink : inactiveLink}`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>

                {/* Projects */}
                <Link
                  to="/projects"
                  className={`${navLinkBase} ${isActive('/projects') ? activeLink : inactiveLink}`}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Projects
                </Link>

                {/* Find Talent (clients only) */}
                {user.role === 'client' && (
                  <Link
                    to="/find-freelancers"
                    className={`${navLinkBase} ${isActive('/find-freelancers') ? activeLink : inactiveLink}`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Find Talent
                  </Link>
                )}

                {/* Contracts */}
                <Link
                  to="/contracts"
                  className={`${navLinkBase} ${isActive('/contracts') ? activeLink : inactiveLink}`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Contracts
                </Link>

                {/* Messages */}
                <Link
                  to="/messages"
                  className={`${navLinkBase} ${isActive('/messages') ? activeLink : inactiveLink}`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Link>

               
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={onToggleNotifications}
                    className="relative p-2 text-gray-600 dark:text-dark-200 hover:text-blue-600 dark:hover:text-dark-50"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 z-50">

                      <div className="p-4 border-b border-gray-200 dark:border-dark-600">
                        <h3 className="font-semibold text-gray-900 dark:text-dark-50">
                          Notifications
                        </h3>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-gray-500 dark:text-dark-300 text-center">
                            No notifications
                          </p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-4 border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 ${
                                !n.read ? 'bg-blue-50 dark:bg-dark-700' : ''
                              }`}
                            >
                              <p className="text-sm text-gray-900 dark:text-dark-100">{n.content}</p>
                              <p className="text-xs text-gray-500 dark:text-dark-300 mt-1">
                                {new Date(n.created_at).toLocaleString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 dark:text-dark-100 hover:text-blue-600 dark:hover:text-dark-50 text-sm font-semibold"
                >
                  <User className="w-5 h-5 mr-2" />
                  <span className="hidden sm:block">{user.name}</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="flex items-center text-sm font-semibold text-gray-700 dark:text-dark-100 hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Theme toggle when not logged in */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Login */}
                {authVariant !== 'login' && (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-dark-100 hover:text-blue-600 dark:hover:text-dark-50 transition"
                  >
                    Log In
                  </Link>
                )}

                {/* Sign Up */}
                {authVariant !== 'register' && (
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 dark:bg-dark-400 rounded-lg hover:bg-blue-700 dark:hover:bg-dark-300 transition"
                  >
                    Sign Up
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
