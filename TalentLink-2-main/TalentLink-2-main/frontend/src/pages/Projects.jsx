// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Search, Plus, DollarSign, Clock, Filter, X, SlidersHorizontal } from 'lucide-react'
// import { toast } from 'react-toastify'
// import api from '../api/axios'

// export default function Projects({ user }) {
//   const [projects, setProjects] = useState([])
//   const [allProjects, setAllProjects] = useState([])
//   const [filteredProjects, setFilteredProjects] = useState([])
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [showModal, setShowModal] = useState(false)
//   const [showFilters, setShowFilters] = useState(false)
  
//   // Freelancer filters
//   const [filters, setFilters] = useState({
//     minBudget: '',
//     maxBudget: '',
//     skills: [],
//     duration: 'all',
//     sortBy: 'newest'
//   })
  
//   const [formData, setFormData] = useState({
//     title: '', description: '', budget: '', duration: '', skills_required: ''
//   })

//   // Common skills for filtering
//   const commonSkills = [
//     'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript',
//     'Vue.js', 'Angular', 'PHP', 'Java', 'C++',
//     'Ruby', 'Go', 'Swift', 'Kotlin', 'Flutter',
//     'UI/UX Design', 'Graphic Design', 'WordPress', 'SEO',
//     'Content Writing', 'Data Science', 'Machine Learning',
//     'DevOps', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'
//   ]

//   useEffect(() => {
//     fetchProjects()
//   }, [search])

//   useEffect(() => {
//     if (user.role === 'client') {
//       filterProjects()
//     } else {
//       applyFreelancerFilters()
//     }
//   }, [statusFilter, allProjects, filters])

//   const fetchProjects = async () => {
//     try {
//       // For clients, fetch only their own projects (all statuses)
//       // For freelancers, fetch all open projects
//       const endpoint = user.role === 'client' 
//         ? `/projects?search=${search}&client_id=${user.id}`
//         : `/projects?search=${search}`
//       const res = await api.get(endpoint)
//       setAllProjects(res.data)
//       setProjects(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const filterProjects = () => {
//     if (statusFilter === 'all') {
//       setProjects(allProjects)
//     } else {
//       setProjects(allProjects.filter(p => p.status === statusFilter))
//     }
//   }

//   const applyFreelancerFilters = () => {
//     let filtered = [...allProjects]

//     // Budget filter
//     if (filters.minBudget) {
//       filtered = filtered.filter(p => p.budget >= parseFloat(filters.minBudget))
//     }
//     if (filters.maxBudget) {
//       filtered = filtered.filter(p => p.budget <= parseFloat(filters.maxBudget))
//     }

//     // Skills filter
//     if (filters.skills.length > 0) {
//       filtered = filtered.filter(p => 
//         filters.skills.some(skill => 
//           p.skills_required.some(pSkill => 
//             pSkill.toLowerCase().includes(skill.toLowerCase())
//           )
//         )
//       )
//     }

//     // Duration filter
//     if (filters.duration !== 'all') {
//       filtered = filtered.filter(p => {
//         if (!p.duration) return false
//         const duration = p.duration.toLowerCase()
//         switch (filters.duration) {
//           case 'short':
//             return duration.includes('day') || duration.includes('week')
//           case 'medium':
//             return duration.includes('month') && !duration.includes('months')
//           case 'long':
//             return duration.includes('months') || duration.includes('year')
//           default:
//             return true
//         }
//       })
//     }

//     // Sorting
//     switch (filters.sortBy) {
//       case 'newest':
//         filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//         break
//       case 'oldest':
//         filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
//         break
//       case 'budget_high':
//         filtered.sort((a, b) => b.budget - a.budget)
//         break
//       case 'budget_low':
//         filtered.sort((a, b) => a.budget - b.budget)
//         break
//       case 'proposals':
//         filtered.sort((a, b) => a.proposal_count - b.proposal_count)
//         break
//       default:
//         break
//     }

//     setProjects(filtered)
//   }

//   const toggleSkillFilter = (skill) => {
//     setFilters(prev => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter(s => s !== skill)
//         : [...prev.skills, skill]
//     }))
//   }

//   const clearFilters = () => {
//     setFilters({
//       minBudget: '',
//       maxBudget: '',
//       skills: [],
//       duration: 'all',
//       sortBy: 'newest'
//     })
//   }

//   const getActiveFilterCount = () => {
//     let count = 0
//     if (filters.minBudget || filters.maxBudget) count++
//     if (filters.skills.length > 0) count++
//     if (filters.duration !== 'all') count++
//     return count
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     // Check if user is a client
//     if (user.role !== 'client') {
//       toast.error(`Only clients can create projects. You are logged in as a ${user.role}.`)
//       return
//     }
    
//     try {
//       const response = await api.post('/projects', {
//         ...formData,
//         budget: parseFloat(formData.budget),
//         skills_required: formData.skills_required.split(',').map(s => s.trim())
//       })
      
//       if (response.status === 201) {
//         setShowModal(false)
//         setFormData({ title: '', description: '', budget: '', duration: '', skills_required: '' })
//         fetchProjects()
//         toast.success('Project created successfully!')
//       }
//     } catch (err) {
//       console.error('Error creating project:', err)
      
//       if (err.response?.status === 422) {
//         toast.error('Authentication error. Please log in again.')
//         return
//       }
      
//       const errorMsg = err.response?.data?.error || 'Failed to create project. Please try again.'
//       toast.error(errorMsg)
//     }
//   }

//   return (
//     <div className="text-gray-900 dark:text-dark-50">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-50">Projects</h1>
//         {user.role === 'client' && (
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Post Project
//           </button>
//         )}
//       </div>

//       {/* Search Bar and Filters */}
//       <div className="mb-6 space-y-4">
//         <div className="flex gap-3">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-800 placeholder-gray-500 dark:placeholder-dark-300 text-gray-900 dark:text-dark-50"
//             />
//           </div>
//           {user.role === 'freelancer' && (
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
//                 showFilters || getActiveFilterCount() > 0
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600'
//               }`}
//             >
//               <SlidersHorizontal className="w-4 h-4 mr-2" />
//               Filters
//               {getActiveFilterCount() > 0 && (
//                 <span className="ml-2 px-2 py-0.5 bg-white dark:bg-dark-800 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
//                   {getActiveFilterCount()}
//                 </span>
//               )}
//             </button>
//           )}
//         </div>

//         {/* Advanced Filters Panel (Freelancer Only) */}
//         {user.role === 'freelancer' && showFilters && (
//           <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6 space-y-6">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50">Filter Projects</h3>
//               <button
//                 onClick={clearFilters}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Clear All
//               </button>
//             </div>

//             {/* Budget Range */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-3">
//                 Budget Range
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-dark-300" />
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       value={filters.minBudget}
//                       onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
//                       className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-dark-300" />
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       value={filters.maxBudget}
//                       onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
//                       className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Skills Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-3">
//                 Skills ({filters.skills.length} selected)
//               </label>
//               <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-dark-600 rounded-lg">
//                 {commonSkills.map(skill => (
//                   <button
//                     key={skill}
//                     onClick={() => toggleSkillFilter(skill)}
//                     className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                       filters.skills.includes(skill)
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Duration Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-3">
//                 Project Duration
//               </label>
//               <div className="grid grid-cols-4 gap-2">
//                 <button
//                   onClick={() => setFilters({...filters, duration: 'all'})}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filters.duration === 'all'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
//                   }`}
//                 >
//                   All
//                 </button>
//                 <button
//                   onClick={() => setFilters({...filters, duration: 'short'})}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filters.duration === 'short'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
//                   }`}
//                 >
//                   Short
//                   <span className="block text-xs opacity-75">Days/Weeks</span>
//                 </button>
//                 <button
//                   onClick={() => setFilters({...filters, duration: 'medium'})}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filters.duration === 'medium'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
//                   }`}
//                 >
//                   Medium
//                   <span className="block text-xs opacity-75">1 Month</span>
//                 </button>
//                 <button
//                   onClick={() => setFilters({...filters, duration: 'long'})}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     filters.duration === 'long'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
//                   }`}
//                 >
//                   Long
//                   <span className="block text-xs opacity-75">Months+</span>
//                 </button>
//               </div>
//             </div>

//             {/* Sort By */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-3">
//                 Sort By
//               </label>
//               <select
//                 value={filters.sortBy}
//                 onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="budget_high">Highest Budget</option>
//                 <option value="budget_low">Lowest Budget</option>
//                 <option value="proposals">Fewest Proposals</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Status Filter Tabs (Client Only) */}
//       {user.role === 'client' && (
//         <div className="mb-6 flex space-x-2 overflow-x-auto">
//           <button
//             onClick={() => setStatusFilter('all')}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               statusFilter === 'all'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600'
//             }`}
//           >
//             All Projects ({allProjects.length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('open')}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               statusFilter === 'open'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600'
//             }`}
//           >
//             Open ({allProjects.filter(p => p.status === 'open').length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('in_progress')}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               statusFilter === 'in_progress'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600'
//             }`}
//           >
//             In Progress ({allProjects.filter(p => p.status === 'in_progress').length})
//           </button>
//           <button
//             onClick={() => setStatusFilter('completed')}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               statusFilter === 'completed'
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600'
//             }`}
//           >
//             Completed ({allProjects.filter(p => p.status === 'completed').length})
//           </button>
//         </div>
//       )}

//       {/* Results Summary */}
//       {user.role === 'freelancer' && (
//         <div className="mb-4 flex items-center justify-between">
//           <p className="text-sm text-gray-600 dark:text-dark-200">
//             Showing <span className="font-semibold text-gray-900 dark:text-dark-50">{projects.length}</span> of{' '}
//             <span className="font-semibold text-gray-900 dark:text-dark-50">{allProjects.length}</span> projects
//           </p>
//               {getActiveFilterCount() > 0 && (
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-600 dark:text-dark-200">Active filters:</span>
//                   {filters.skills.map(skill => (
//                     <span
//                       key={skill}
//                       className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
//                     >
//                       {skill}
//                       <button
//                         onClick={() => toggleSkillFilter(skill)}
//                         className="ml-1 hover:text-blue-900 dark:hover:text-blue-200"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                   {(filters.minBudget || filters.maxBudget) && (
//                     <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
//                       ${filters.minBudget || '0'} - ${filters.maxBudget || '∞'}
//                     </span>
//                   )}
//                   {filters.duration !== 'all' && (
//                     <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
//                       {filters.duration} duration
//                     </span>
//                   )}
//                 </div>
//               )}
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6">
//         {projects.length === 0 ? (
//           <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-8 text-center text-gray-500 dark:text-dark-300">
//             {user.role === 'client' 
//               ? 'No projects yet. Click "Post Project" to get started!'
//               : getActiveFilterCount() > 0
//                 ? 'No projects match your filters. Try adjusting your criteria.'
//                 : 'No projects available at the moment.'}
//           </div>
//         ) : (
//           projects.map(project => (
//             <Link key={project.id} to={`/projects/${project.id}`} className="bg-white dark:bg-dark-800 rounded-lg shadow hover:shadow-lg transition p-6">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50">{project.title}</h3>
//                 {user.role === 'client' && (
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     project.status === 'open' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
//                     project.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
//                     project.status === 'completed' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
//                     'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200'
//                   }`}>
//                     {project.status === 'in_progress' ? 'In Progress' : 
//                      project.status.charAt(0).toUpperCase() + project.status.slice(1)}
//                   </span>
//                 )}
//               </div>
//               <p className="text-gray-600 dark:text-dark-200 mb-4">{project.description.substring(0, 200)}...</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {project.skills_required.map((skill, i) => (
//                   <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-300">
//                 <div className="flex items-center space-x-4">
//                   <span className="flex items-center">
//                     <DollarSign className="w-4 h-4 mr-1" />
//                     ${project.budget}
//                   </span>
//                   <span className="flex items-center">
//                     <Clock className="w-4 h-4 mr-1" />
//                     {project.duration || 'Not specified'}
//                   </span>
//                 </div>
//                 <span className="text-blue-600 dark:text-blue-400">{project.proposal_count} proposals</span>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-50">Post a New Project</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Project Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                   required
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Budget ($)</label>
//                   <input
//                     type="number"
//                     value={formData.budget}
//                     onChange={(e) => setFormData({...formData, budget: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Duration</label>
//                   <input
//                     type="text"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({...formData, duration: e.target.value})}
//                     placeholder="e.g., 2 weeks"
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Skills Required (comma-separated)</label>
//                 <input
//                   type="text"
//                   value={formData.skills_required}
//                   onChange={(e) => setFormData({...formData, skills_required: e.target.value})}
//                   placeholder="React, Python, Design"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                 />
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-dark-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Post Project
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, DollarSign, Clock, Filter, X, SlidersHorizontal, Briefcase } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function Projects({ user }) {
  const [projects, setProjects] = useState([])
  const [allProjects, setAllProjects] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [filteredProjects, setFilteredProjects] = useState([]) // Kept for potential future use based on your code
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // Freelancer filters
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    skills: [],
    duration: 'all',
    sortBy: 'newest'
  })
  
  const [formData, setFormData] = useState({
    title: '', description: '', budget: '', duration: '', skills_required: ''
  })

  // Common skills for filtering
  const commonSkills = [
    'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript',
    'Vue.js', 'Angular', 'PHP', 'Java', 'C++',
    'Ruby', 'Go', 'Swift', 'Kotlin', 'Flutter',
    'UI/UX Design', 'Graphic Design', 'WordPress', 'SEO',
    'Content Writing', 'Data Science', 'Machine Learning',
    'DevOps', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'
  ]

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line
  }, [search])

  useEffect(() => {
    if (user.role === 'client') {
      filterProjects()
    } else {
      applyFreelancerFilters()
    }
    // eslint-disable-next-line
  }, [statusFilter, allProjects, filters])

  const fetchProjects = async () => {
    try {
      const endpoint = user.role === 'client' 
        ? `/projects?search=${search}&client_id=${user.id}`
        : `/projects?search=${search}`
      const res = await api.get(endpoint)
      setAllProjects(res.data)
      setProjects(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const filterProjects = () => {
    if (statusFilter === 'all') {
      setProjects(allProjects)
    } else {
      setProjects(allProjects.filter(p => p.status === statusFilter))
    }
  }

  const applyFreelancerFilters = () => {
    let filtered = [...allProjects]

    // Budget filter
    if (filters.minBudget) {
      filtered = filtered.filter(p => p.budget >= parseFloat(filters.minBudget))
    }
    if (filters.maxBudget) {
      filtered = filtered.filter(p => p.budget <= parseFloat(filters.maxBudget))
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(p => 
        filters.skills.some(skill => 
          p.skills_required.some(pSkill => 
            pSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      )
    }

    // Duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(p => {
        if (!p.duration) return false
        const duration = p.duration.toLowerCase()
        switch (filters.duration) {
          case 'short': return duration.includes('day') || duration.includes('week')
          case 'medium': return duration.includes('month') && !duration.includes('months')
          case 'long': return duration.includes('months') || duration.includes('year')
          default: return true
        }
      })
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest': filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
      case 'oldest': filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break;
      case 'budget_high': filtered.sort((a, b) => b.budget - a.budget); break;
      case 'budget_low': filtered.sort((a, b) => a.budget - b.budget); break;
      case 'proposals': filtered.sort((a, b) => a.proposal_count - b.proposal_count); break;
      default: break;
    }

    setProjects(filtered)
  }

  const toggleSkillFilter = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const clearFilters = () => {
    setFilters({
      minBudget: '', maxBudget: '', skills: [], duration: 'all', sortBy: 'newest'
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.minBudget || filters.maxBudget) count++
    if (filters.skills.length > 0) count++
    if (filters.duration !== 'all') count++
    return count
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user.role !== 'client') {
      toast.error(`Only clients can create projects.`)
      return
    }
    
    try {
      const response = await api.post('/projects', {
        ...formData,
        budget: parseFloat(formData.budget),
        skills_required: formData.skills_required.split(',').map(s => s.trim())
      })
      
      if (response.status === 201) {
        setShowModal(false)
        setFormData({ title: '', description: '', budget: '', duration: '', skills_required: '' })
        fetchProjects()
        toast.success('Project created successfully!')
      }
    } catch (err) {
      console.error('Error creating project:', err)
      if (err.response?.status === 422) {
        toast.error('Authentication error. Please log in again.')
        return
      }
      toast.error(err.response?.data?.error || 'Failed to create project.')
    }
  }

  return (
  <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 pt-28 transition-colors duration-300">

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-blue-600" />
              Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {user.role === 'client' ? 'Manage your posted projects' : 'Find your next gig'}
            </p>
          </div>
          {user.role === 'client' && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95 font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Project
            </button>
          )}
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm"
              />
            </div>
            {user.role === 'freelancer' && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all shadow-sm border ${
                  showFilters || getActiveFilterCount() > 0
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold shadow-sm">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Expanded Freelancer Filter Panel */}
          {user.role === 'freelancer' && showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-down">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filter Projects
                </h3>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Budget */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hourly/Fixed Budget ($)</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                       <input 
                         type="number" placeholder="Min" 
                         value={filters.minBudget}
                         onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                         className="w-full pl-6 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                       />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                       <input 
                         type="number" placeholder="Max" 
                         value={filters.maxBudget}
                         onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                         className="w-full pl-6 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                       />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration</label>
                  <select 
                    value={filters.duration}
                    onChange={(e) => setFilters({...filters, duration: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">Any Duration</option>
                    <option value="short">Short (Days/Weeks)</option>
                    <option value="medium">Medium (1 Month)</option>
                    <option value="long">Long (Months+)</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort By</label>
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="budget_high">Highest Budget</option>
                    <option value="budget_low">Lowest Budget</option>
                    <option value="proposals">Fewest Proposals</option>
                  </select>
                </div>

                {/* Skills - Spans full width on small screens */}
                <div className="space-y-3 md:col-span-2 lg:col-span-1">
                   <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Popular Skills</label>
                   <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                      {commonSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkillFilter(skill)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                            filters.skills.includes(skill)
                              ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200'
                              : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Client Status Tabs */}
        {user.role === 'client' && (
          <div className="mb-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'All Projects', color: 'blue' },
              { id: 'open', label: 'Open', color: 'green' },
              { id: 'in_progress', label: 'In Progress', color: 'indigo' },
              { id: 'completed', label: 'Completed', color: 'purple' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === tab.id
                    ? `bg-${tab.color}-600 text-white shadow-md shadow-${tab.color}-500/30`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label} ({tab.id === 'all' ? allProjects.length : allProjects.filter(p => p.status === tab.id).length})
              </button>
            ))}
          </div>
        )}

        {/* Active Filters Summary (Freelancer) */}
        {user.role === 'freelancer' && getActiveFilterCount() > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Active filters:</span>
            {filters.skills.map(skill => (
              <Badge key={skill} label={skill} onRemove={() => toggleSkillFilter(skill)} />
            ))}
            {(filters.minBudget || filters.maxBudget) && (
              <Badge label={`$${filters.minBudget || '0'} - $${filters.maxBudget || '∞'}`} />
            )}
            {filters.duration !== 'all' && (
              <Badge label={filters.duration} />
            )}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {projects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {user.role === 'client' 
                  ? 'Get started by posting your first project requirement.'
                  : 'Try adjusting your search or filters to find what you are looking for.'}
              </p>
              {user.role === 'client' && (
                 <button onClick={() => setShowModal(true)} className="mt-6 text-blue-600 font-medium hover:underline">
                   Post a project now
                 </button>
              )}
            </div>
          ) : (
            projects.map(project => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`} 
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                       Posted {new Date(project.created_at || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold border border-green-100 dark:border-green-800 flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-1" />
                      {project.budget}
                    </span>
                    {user.role === 'client' && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        project.status === 'open' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800' :
                        project.status === 'in_progress' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800' :
                        'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {project.skills_required.slice(0, 4).map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {project.skills_required.length > 4 && (
                      <span className="px-2 py-1 text-xs text-gray-400">+{project.skills_required.length - 4} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 w-full sm:w-auto justify-between sm:justify-start">
                     <span className="flex items-center">
                       <Clock className="w-4 h-4 mr-1.5" />
                       {project.duration || 'Not specified'}
                     </span>
                     <span className="flex items-center text-blue-600 dark:text-blue-400">
                       {project.proposal_count} proposals
                     </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post a New Project</h2>
               <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                💡 <strong>Tip:</strong> Save time by using a project template!
              </p>
              <Link 
                to="/templates" 
                onClick={() => setShowModal(false)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Browse Templates →
              </Link>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                  placeholder="e.g. Build a React E-commerce Site"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all resize-none"
                  placeholder="Describe the project details, requirements, and goals..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 2 weeks"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Skills Required</label>
                <input
                  type="text"
                  value={formData.skills_required}
                  onChange={(e) => setFormData({...formData, skills_required: e.target.value})}
                  placeholder="React, Python, Design (comma separated)"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Small helper component for filter badges
function Badge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 rounded-full text-xs font-medium">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-1.5 hover:text-blue-900 dark:hover:text-blue-100">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}