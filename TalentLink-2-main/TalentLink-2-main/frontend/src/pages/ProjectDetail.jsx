import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DollarSign, Clock, User, Star, MessageSquare, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/axios'
import ProjectProgress from '../components/ProjectProgress'

export default function ProjectDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [myProposal, setMyProposal] = useState(null)
  const [showProgress, setShowProgress] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [proposalData, setProposalData] = useState({
    cover_letter: '', proposed_amount: '', delivery_time: ''
  })

  useEffect(() => {
    fetchProject()
    if (user.role === 'freelancer') {
      checkExistingProposal()
      checkIfSaved()
    }
  }, [id])

  const checkIfSaved = async () => {
    try {
      const res = await api.get('/saved-projects')
      const saved = res.data.some(p => p.id === parseInt(id))
      setIsSaved(saved)
    } catch (err) {
      console.error('Error checking saved status:', err)
    }
  }

  const handleToggleSave = async () => {
    try {
      if (isSaved) {
        await api.delete(`/projects/${id}/save`)
        toast.success('Project removed from saved list')
        setIsSaved(false)
      } else {
        await api.post(`/projects/${id}/save`)
        toast.success('Project saved successfully!')
        setIsSaved(true)
      }
    } catch (err) {
      console.error('Error toggling save:', err)
      toast.error(err.response?.data?.error || 'Failed to save project')
    }
  }

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`)
      setProject(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const checkExistingProposal = async () => {
    try {
      const res = await api.get(`/projects/${id}/my-proposal`)
      if (res.data) {
        setMyProposal(res.data)
      }
    } catch (err) {
      // No proposal exists, which is fine
      if (err.response?.status !== 404) {
        console.error('Error checking proposal:', err)
      }
    }
  }

  const handleSubmitProposal = async (e) => {
    e.preventDefault()
    try {
      await api.post('/proposals', {
        project_id: parseInt(id),
        ...proposalData,
        proposed_amount: parseFloat(proposalData.proposed_amount)
      })
      setShowProposalModal(false)
      toast.success('Proposal submitted successfully!')
      checkExistingProposal()
      fetchProject()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.error || 'Error submitting proposal. Please try again.')
    }
  }

  const handleAcceptProposal = async (proposalId) => {
    try {
      await api.post(`/proposals/${proposalId}/accept`)
      toast.success('Proposal accepted! Contract created.')
      navigate('/contracts')
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.error || 'Failed to accept proposal.')
    }
  }

  if (!project) return <div className="text-gray-900 dark:text-dark-50">Loading...</div>

  // Check if project has a contract (is in progress or completed)
  const hasContract = project.status === 'in_progress' || project.status === 'completed'

  return (
    <div className="text-gray-900 dark:text-dark-50 space-y-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-50 mb-4">{project.title}</h1>
        <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-dark-200">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {project.client.name}
            </span>
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              ${project.budget}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {project.duration || 'Not specified'}
            </span>
          </div>
          {user.role === 'freelancer' && (
            <div className="flex gap-3">
              <button
                onClick={handleToggleSave}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isSaved 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                    : 'text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
                {isSaved ? 'Saved' : 'Save Project'}
              </button>
              <button
                onClick={() => navigate(`/messages?user=${project.client.id}`)}
                className="flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Client
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills_required.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        <div className="prose prose-slate max-w-none mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-50">Description</h3>
          <p className="text-gray-700 dark:text-dark-200 whitespace-pre-wrap">{project.description}</p>
        </div>
        
        {user.role === 'freelancer' && project.status === 'open' && (
          <>
            {myProposal ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">Your Proposal</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-200">Status: </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      myProposal.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      myProposal.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {myProposal.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-200">Proposed Amount: </span>
                    <span className="text-gray-900 dark:text-dark-50">${myProposal.proposed_amount}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-200">Delivery Time: </span>
                    <span className="text-gray-900 dark:text-dark-50">{myProposal.delivery_time}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-200">Cover Letter: </span>
                    <p className="text-gray-900 dark:text-dark-50 mt-1">{myProposal.cover_letter}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-200">Submitted: </span>
                    <span className="text-gray-900 dark:text-dark-50">{new Date(myProposal.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowProposalModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Proposal
              </button>
            )}
          </>
        )}
      </div>

      {/* Project Progress Section */}
      {hasContract && (
        <div className="mb-6">
          <button
            onClick={() => setShowProgress(!showProgress)}
            className="w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-700 transition"
          >
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-dark-50">
                {showProgress ? 'Hide' : 'View'} Project Progress
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-dark-300">
              {showProgress ? '▼' : '▶'}
            </span>
          </button>
          {showProgress && (
            <div className="mt-4">
              <ProjectProgress projectId={project.id} isClient={user.role === 'client'} />
            </div>
          )}
        </div>
      )}

      {user.role === 'client' && project.proposals.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-50">Proposals ({project.proposals.length})</h2>
          <div className="space-y-4">
            {project.proposals.map(proposal => (
              <div key={proposal.id} className="border border-gray-200 dark:border-dark-600 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-dark-50">{proposal.freelancer.name}</h3>
                    <p className="text-gray-600 dark:text-dark-200">Proposed: ${proposal.proposed_amount}</p>
                    <p className="text-gray-600 dark:text-dark-200">Delivery: {proposal.delivery_time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/messages?user=${proposal.freelancer.id}`)}
                      className="p-2 text-gray-600 dark:text-dark-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                      title="Message freelancer"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      proposal.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      proposal.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                </div>
                {proposal.status === 'pending' && (
                  <button
                    onClick={() => handleAcceptProposal(proposal.id)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Accept Proposal
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showProposalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600 p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-50">Submit Proposal</h2>
            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Cover Letter</label>
                <textarea
                  value={proposalData.cover_letter}
                  onChange={(e) => setProposalData({...proposalData, cover_letter: e.target.value})}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Proposed Amount ($)</label>
                  <input
                    type="number"
                    value={proposalData.proposed_amount}
                    onChange={(e) => setProposalData({...proposalData, proposed_amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={proposalData.delivery_time}
                    onChange={(e) => setProposalData({...proposalData, delivery_time: e.target.value})}
                    placeholder="e.g., 1 week"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-dark-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
