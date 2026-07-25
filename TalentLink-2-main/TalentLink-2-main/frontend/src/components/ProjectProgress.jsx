import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Clock, Calendar } from 'lucide-react'
import api from '../api/axios'

export default function ProjectProgress({ projectId, isClient }) {
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    fetchMilestones()
  }, [projectId])

  const fetchMilestones = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/milestones`)
      if (res.data.length === 0 && !isClient) {
        // Create default milestones if none exist
        await api.post(`/projects/${projectId}/milestones`)
        const newRes = await api.get(`/projects/${projectId}/milestones`)
        setMilestones(newRes.data)
      } else {
        setMilestones(res.data)
      }
    } catch (err) {
      console.error('Error fetching milestones:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUpdates = async (milestoneId) => {
    try {
      const res = await api.get(`/milestones/${milestoneId}/updates`)
      setUpdates(res.data)
    } catch (err) {
      console.error('Error fetching updates:', err)
    }
  }

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone)
    fetchUpdates(milestone.id)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900/30'
      case 'in_progress':
        return 'text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30'
      default:
        return 'text-gray-600 dark:text-dark-200 bg-gray-100 dark:bg-dark-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
      case 'in_progress':
        return <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
      default:
        return <Circle className="w-6 h-6 text-gray-400 dark:text-dark-500" />
    }
  }

  const calculateOverallProgress = () => {
    if (milestones.length === 0) return 0
    const total = milestones.reduce((sum, m) => sum + m.progress, 0)
    return Math.round(total / milestones.length)
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-700 dark:text-dark-200">Loading project progress...</div>
  }

  if (milestones.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-8 text-center">
        <p className="text-gray-600 dark:text-dark-200">No milestones set for this project yet.</p>
        {!isClient && (
          <button
            onClick={fetchMilestones}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Default Milestones
          </button>
        )}
      </div>
    )
  }

  const overallProgress = calculateOverallProgress()

  return (
    <div className="space-y-6 text-gray-900 dark:text-dark-50">
      {/* Overall Progress */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50">Project Progress</h3>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50 mb-6">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Connector Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-gray-300 dark:bg-dark-600"></div>
              )}

              {/* Milestone Card */}
              <div
                className={`relative flex items-start space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedMilestone?.id === milestone.id
                    ? 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
                onClick={() => handleMilestoneClick(milestone)}
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 z-10 bg-white dark:bg-dark-800">
                  {getStatusIcon(milestone.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-dark-50">
                      {milestone.name}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        milestone.status
                      )} dark:border dark:border-opacity-20`}
                    >
                      {milestone.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-dark-200 mb-3">{milestone.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-dark-300 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          milestone.status === 'completed'
                            ? 'bg-green-500'
                            : milestone.status === 'in_progress'
                            ? 'bg-blue-500'
                            : 'bg-gray-400 dark:bg-dark-600'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-dark-300">
                    {milestone.started_at && (
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Started: {new Date(milestone.started_at).toLocaleDateString()}
                      </div>
                    )}
                    {milestone.completed_at && (
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed: {new Date(milestone.completed_at).toLocaleDateString()}
                      </div>
                    )}
                    {milestone.updates_count > 0 && (
                      <div className="text-blue-600 dark:text-blue-400 font-medium">
                        {milestone.updates_count} update{milestone.updates_count !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Updates */}
      {selectedMilestone && (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow border border-gray-200 dark:border-dark-600 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50 mb-4">
            Updates for {selectedMilestone.name}
          </h3>
          {updates.length === 0 ? (
            <p className="text-gray-500 dark:text-dark-300 text-center py-4">No updates yet</p>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="border-l-4 border-blue-500 dark:border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 dark:text-dark-50">{update.user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-dark-300">
                      {new Date(update.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-dark-200 mb-2">{update.content}</p>
                  {update.progress !== null && (
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Progress: {update.progress}%
                    </span>
                  )}
                  {update.attachment_url && (
                    <a
                      href={update.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block mt-2"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
