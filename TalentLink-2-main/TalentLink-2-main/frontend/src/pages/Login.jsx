import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/axios'
import TopNav from '../components/TopNav'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      toast.success(`Welcome back, ${res.data.user.name || 'there'}!`)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      toast.error(err.response?.data?.error || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0B0F14] dark:to-[#121820] transition-all duration-300">
      
      <TopNav authVariant="login" />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-md w-full bg-white dark:bg-[#11161D] rounded-xl shadow-2xl p-8 border border-transparent dark:border-[#202730] transition-all duration-300">
          
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Welcome Back 👋
          </h2>

          {error && (
            <div className="bg-red-100 dark:bg-[#441414] text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md bg-white dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 
                placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-[#2A323C] 
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md bg-white dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 
                placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-[#2A323C] 
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />

              {/* Forgot Password Link */}
              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-teal-400 font-medium hover:underline hover:text-blue-700 dark:hover:text-teal-300"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white 
              bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 
              hover:opacity-90 transition focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 dark:text-teal-400 hover:underline hover:text-blue-700 dark:hover:text-teal-300 font-medium"
            >
              Sign Up
            </Link>
          </p>

          {/* Demo Accounts Box */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-[#12181F] border border-gray-200 dark:border-[#222933] rounded-lg text-xs text-gray-700 dark:text-gray-400">
            <p className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Demo Login:</p>
            <p>Client → <b>client@demo.com</b> / password123</p>
            <p>Freelancer → <b>freelancer@demo.com</b> / password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
