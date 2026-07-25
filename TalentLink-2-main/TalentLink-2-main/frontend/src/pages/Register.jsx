import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/axios'
import TopNav from '../components/TopNav'

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'freelancer' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      toast.success('Account created! You are now signed in.')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                    dark:from-[#0D1117] dark:to-[#0F141A] transition-colors">
      <TopNav authVariant="register" />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 mt-6
                        dark:bg-[#11161D] dark:border dark:border-[#1E242C]">
          
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4
                            dark:bg-[#401313] dark:text-red-300 dark:border dark:border-red-900/40">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 rounded-md border shadow-sm
                           bg-white text-gray-900 
                           dark:bg-[#0D1117] dark:text-gray-100 
                           border-gray-300 dark:border-[#2A323C]
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 rounded-md border 
                           bg-white dark:bg-[#0D1117] 
                           text-gray-900 dark:text-gray-100
                           border-gray-300 dark:border-[#2A323C]
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 rounded-md border 
                           bg-white dark:bg-[#0D1117] 
                           text-gray-900 dark:text-gray-100
                           border-gray-300 dark:border-[#2A323C]
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                I am a
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 block w-full px-3 py-2 rounded-md border
                           bg-white dark:bg-[#0D1117] dark:text-gray-100
                           border-gray-300 dark:border-[#2A323C]
                           focus:ring-2 focus:ring-teal-500"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-sm font-medium text-white
                         bg-gradient-to-r from-blue-600 to-teal-500 
                         dark:from-blue-500 dark:to-teal-400
                         hover:opacity-90 shadow-md transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? 
            <Link to="/login" 
                  className="text-blue-600 dark:text-teal-400 hover:text-blue-500 dark:hover:text-teal-300 font-medium">
              &nbsp;Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
