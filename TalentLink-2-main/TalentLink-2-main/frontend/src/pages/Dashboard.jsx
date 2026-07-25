// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Briefcase, FileText, DollarSign, TrendingUp } from 'lucide-react'
// import api from '../api/axios'

// export default function Dashboard({ user }) {
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get('/dashboard')
//       setStats(res.data)
//     } catch (err) {
//       console.error('Dashboard error:', err)
//       setStats(user.role === 'client' ? {
//         total_projects: 0,
//         active_projects: 0,
//         completed_projects: 0,
//         total_proposals: 0
//       } : {
//         total_proposals: 0,
//         accepted_proposals: 0,
//         active_contracts: 0,
//         completed_contracts: 0,
//         total_earnings: 0
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <div className="flex items-center justify-center h-64 text-gray-900 dark:text-dark-50">Loading...</div>
//   if (!stats) return <div className="flex items-center justify-center h-64 text-gray-900 dark:text-dark-50">Error loading dashboard</div>

//   return (
//     <div className="text-gray-900 dark:text-dark-50">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-50 mb-8">Dashboard</h1>
      
//       {user.role === 'client' ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard icon={<Briefcase />} title="Total Projects" value={stats.total_projects} color="blue" />
//           <StatCard icon={<TrendingUp />} title="Active Projects" value={stats.active_projects} color="green" />
//           <StatCard icon={<FileText />} title="Completed" value={stats.completed_projects} color="purple" />
//           <StatCard icon={<DollarSign />} title="Total Proposals" value={stats.total_proposals} color="orange" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard icon={<FileText />} title="Total Proposals" value={stats.total_proposals} color="blue" />
//           <StatCard icon={<TrendingUp />} title="Accepted" value={stats.accepted_proposals} color="green" />
//           <StatCard icon={<Briefcase />} title="Active Contracts" value={stats.active_contracts} color="purple" />
//           <StatCard icon={<DollarSign />} title="Total Earnings" value={`$${stats.total_earnings}`} color="orange" />
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6 transition-colors">
//           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-50">Quick Actions</h2>
//           <div className="space-y-3">
//             {user.role === 'client' ? (
//               <>
//                 <Link to="/projects" className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
//                   <h3 className="font-semibold text-blue-900 dark:text-blue-300">Post a New Project</h3>
//                   <p className="text-sm text-blue-700 dark:text-blue-200">Find talented freelancers for your project</p>
//                 </Link>
//                 <Link to="/find-freelancers" className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
//                   <h3 className="font-semibold text-purple-900 dark:text-purple-300">Find Freelancers</h3>
//                   <p className="text-sm text-purple-700 dark:text-purple-200">Browse and connect with talented freelancers</p>
//                 </Link>
//                 <Link to="/contracts" className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition">
//                   <h3 className="font-semibold text-green-900 dark:text-green-300">View Contracts</h3>
//                   <p className="text-sm text-green-700 dark:text-green-200">Manage your active contracts</p>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/projects" className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
//                   <h3 className="font-semibold text-blue-900 dark:text-blue-300">Browse Projects</h3>
//                   <p className="text-sm text-blue-700 dark:text-blue-200">Find projects that match your skills</p>
//                 </Link>
//                 <Link to="/profile" className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
//                   <h3 className="font-semibold text-purple-900 dark:text-purple-300">Update Profile</h3>
//                   <p className="text-sm text-purple-700 dark:text-purple-200">Showcase your skills and portfolio</p>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6 transition-colors">
//           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-50">Recent Activity</h2>
//           <p className="text-gray-500 dark:text-dark-300">No recent activity</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// function StatCard({ icon, title, value, color }) {
//   const colors = {
//     blue: 'bg-blue-500',
//     green: 'bg-green-500',
//     purple: 'bg-purple-500',
//     orange: 'bg-orange-500'
//   }

//   return (
//     <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-600 dark:text-dark-200">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 dark:text-dark-50 mt-1">{value}</p>
//         </div>
//         <div className={`${colors[color]} p-3 rounded-lg text-white`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, FileText, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'
import api from '../api/axios'

export default function Dashboard({ user }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard')
      setStats(res.data)
    } catch (err) {
      console.error('Dashboard error:', err)
      setStats(user.role === 'client' ? {
        total_projects: 0,
        active_projects: 0,
        completed_projects: 0,
        total_proposals: 0
      } : {
        total_proposals: 0,
        accepted_proposals: 0,
        active_contracts: 0,
        completed_contracts: 0,
        total_earnings: 0
      })
    } finally {
      setLoading(false)
    }
  }

  // Improved Loading State
  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading dashboard...</span>
      </div>
    </div>
  )

  if (!stats) return <div className="flex items-center justify-center h-64 text-red-500 dark:text-red-400">Error loading dashboard</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          Dashboard
        </h1>
        
        {user.role === 'client' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Briefcase size={24} />} title="Total Projects" value={stats.total_projects} color="blue" />
            <StatCard icon={<TrendingUp size={24} />} title="Active Projects" value={stats.active_projects} color="green" />
            <StatCard icon={<FileText size={24} />} title="Completed" value={stats.completed_projects} color="purple" />
            <StatCard icon={<DollarSign size={24} />} title="Total Proposals" value={stats.total_proposals} color="orange" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<FileText size={24} />} title="Total Proposals" value={stats.total_proposals} color="blue" />
            <StatCard icon={<TrendingUp size={24} />} title="Accepted" value={stats.accepted_proposals} color="green" />
            <StatCard icon={<Briefcase size={24} />} title="Active Contracts" value={stats.active_contracts} color="purple" />
            <StatCard icon={<DollarSign size={24} />} title="Total Earnings" value={`$${stats.total_earnings}`} color="orange" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="space-y-4">
              {user.role === 'client' ? (
                <>
                  <ActionLink 
                    to="/projects" 
                    title="Post a New Project" 
                    desc="Find talented freelancers for your project" 
                    color="blue" 
                  />
                  <ActionLink 
                    to="/find-freelancers" 
                    title="Find Freelancers" 
                    desc="Browse and connect with talented freelancers" 
                    color="purple" 
                  />
                  <ActionLink 
                    to="/contracts" 
                    title="View Contracts" 
                    desc="Manage your active contracts" 
                    color="green" 
                  />
                </>
              ) : (
                <>
                  <ActionLink 
                    to="/projects" 
                    title="Browse Projects" 
                    desc="Find projects that match your skills" 
                    color="blue" 
                  />
                  <ActionLink 
                    to="/profile" 
                    title="Update Profile" 
                    desc="Showcase your skills and portfolio" 
                    color="purple" 
                  />
                </>
              )}
            </div>
          </div>

         
        </div>
      </div>
    </div>
  )
}

// Extracted Action Link Component for cleaner code and better dark mode handling
function ActionLink({ to, title, desc, color }) {
  const colorStyles = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:hover:bg-blue-900/40 text-blue-900 dark:text-blue-100",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:border-purple-800 dark:hover:bg-purple-900/40 text-purple-900 dark:text-purple-100",
    green: "bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:hover:bg-green-900/40 text-green-900 dark:text-green-100"
  };

  const descStyles = {
    blue: "text-blue-700 dark:text-blue-300",
    purple: "text-purple-700 dark:text-purple-300",
    green: "text-green-700 dark:text-green-300"
  }

  return (
    <Link to={to} className={`block p-4 rounded-lg border transition-all duration-200 ${colorStyles[color]}`}>
      <h3 className="font-semibold">{title}</h3>
      <p className={`text-sm mt-1 ${descStyles[color]}`}>{desc}</p>
    </Link>
  )
}

// New Feature Link Component
function FeatureLink({ to, title, desc }) {
  return (
    <Link 
      to={to} 
      className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-blue-100 dark:border-blue-900 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
    >
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

function StatCard({ icon, title, value, color }) {
  const colorStyles = {
    blue: 'bg-blue-500 dark:bg-blue-600',
    green: 'bg-green-500 dark:bg-green-600',
    purple: 'bg-purple-500 dark:bg-purple-600',
    orange: 'bg-orange-500 dark:bg-orange-600'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`${colorStyles[color]} p-4 rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
