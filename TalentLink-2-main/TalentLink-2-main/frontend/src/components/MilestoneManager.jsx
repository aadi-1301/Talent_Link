import { useState, useEffect } from 'react'
import { Plus, CheckCircle, Clock, Circle, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function MilestoneManager({ projectId, onUpdate }) {
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [updateContent, setUpdateContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchMilestones()
  }, [projectId])

  const fetchMilestones = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/milestones`)
      if (res.data.length === 0) {
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

  // --- COLOR CALCULATION HELPER ---
  const getProgressColor = (progress) => {
    // Hue 0 = Red, Hue 60 = Yellow, Hue 120 = Green
    // We multiply progress by 1.2 to map 0-100 to 0-120
    const hue = Math.min(progress * 1.2, 120); 
    return `hsl(${hue}, 90%, 45%)`; 
  }

  // 1. FAST: Updates UI only (No API call)
  const handleLocalProgressChange = (milestoneId, newProgress) => {
    setMilestones(prev => prev.map(m =>
      m.id === milestoneId ? { ...m, progress: parseInt(newProgress) } : m
    ))
  }

  // 2. SLOW: Saves to Server (Triggered on MouseUp/TouchEnd)
  const handleCommitProgress = async (milestoneId, finalProgress) => {
    try {
      await api.put(`/milestones/${milestoneId}`, { progress: parseInt(finalProgress) })
      if (onUpdate) onUpdate()
    } catch (err) {
      console.error('Error saving progress:', err)
      toast.error('Failed to save progress')
      fetchMilestones() 
    }
  }

  const handleStatusChange = async (milestoneId, newStatus) => {
    setSaving(true)
    try {
      const milestone = milestones.find(m => m.id === milestoneId)
      const updates = {
        status: newStatus,
        progress: newStatus === 'completed' ? 100 : milestone.progress
      }
      
      setMilestones(prev => prev.map(m => 
        m.id === milestoneId ? { ...m, ...updates } : m
      ))

      await api.put(`/milestones/${milestoneId}`, updates)
      if (onUpdate) onUpdate()
      toast.success('Status updated!')
    } catch (err) {
      toast.error('Failed to update status')
      fetchMilestones()
    } finally {
      setSaving(false)
    }
  }

  const handleAddUpdate = async (milestoneId) => {
    if (!updateContent.trim()) {
      toast.error('Please enter an update message')
      return
    }

    setSaving(true)
    try {
      const milestone = milestones.find(m => m.id === milestoneId)
      await api.post(`/milestones/${milestoneId}/updates`, {
        content: updateContent,
        progress: milestone.progress
      })
      setUpdateContent('')
      setSelectedMilestone(null)
      toast.success('Update added successfully!')
    } catch (err) {
      console.error('Error adding update:', err)
      toast.error('Failed to add update')
    } finally {
      setSaving(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      default: return <Circle className="w-5 h-5 text-gray-400 dark:text-dark-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading milestones...
      </div>
    )
  }

  return (
    <div className="space-y-6 text-gray-900 dark:text-dark-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg border border-blue-500 dark:border-blue-600 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Project Milestones</h2>
        <p className="text-blue-100 opacity-90">Update your progress and keep the client informed</p>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => {
          // Calculate dynamic color for this specific milestone
          const dynamicColor = getProgressColor(milestone.progress);

          return (
            <div key={milestone.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6 transition-all hover:shadow-md">
              
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">{getStatusIcon(milestone.status)}</div>
                  <div>
                    <h3 className={`text-lg font-semibold ${milestone.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-dark-50'}`}>
                      {milestone.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-dark-300">{milestone.description}</p>
                  </div>
                </div>
                
                <select
                  value={milestone.status}
                  onChange={(e) => handleStatusChange(milestone.id, e.target.value)}
                  disabled={saving}
                  className="px-3 py-1.5 border border-gray-300 dark:border-dark-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-dark-50 cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Slider Section */}
              <div className="mb-6 bg-gray-50 dark:bg-dark-900/50 p-4 rounded-lg border border-gray-100 dark:border-dark-700/50">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-300">Progress</label>
                  <span 
                    className="text-xl font-bold transition-colors duration-300"
                    style={{ color: dynamicColor }}
                  >
                    {milestone.progress}%
                  </span>
                </div>
                
                <div className="relative h-6 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={milestone.progress}
                    onChange={(e) => handleLocalProgressChange(milestone.id, e.target.value)}
                    onMouseUp={(e) => handleCommitProgress(milestone.id, e.target.value)}
                    onTouchEnd={(e) => handleCommitProgress(milestone.id, e.target.value)}
                    disabled={milestone.status === 'completed'}
                    // Using accentColor property to color the thumb (handle) dynamically
                    style={{ accentColor: dynamicColor }}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20"
                  />
                  
                  {/* Custom Track Background */}
                  <div className="absolute w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden z-10 pointer-events-none">
                    <div 
                      className="h-full transition-all duration-75 ease-out rounded-full"
                      style={{ 
                        width: `${milestone.progress}%`,
                        backgroundColor: dynamicColor,
                        boxShadow: `0 0 10px ${dynamicColor}` // Adds a nice glow
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-2">
                 <div className="text-xs text-gray-400 dark:text-dark-400 flex flex-col sm:flex-row gap-x-4">
                  {milestone.started_at && <span>Started: {new Date(milestone.started_at).toLocaleDateString()}</span>}
                  {milestone.completed_at && <span>Completed: {new Date(milestone.completed_at).toLocaleDateString()}</span>}
                </div>

                <button
                  onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  {selectedMilestone === milestone.id ? 'Cancel Update' : 'Add Update'}
                </button>
              </div>

              {/* Add Update Form (Collapsible) */}
              {selectedMilestone === milestone.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-700 animate-in fade-in slide-in-from-top-2">
                  <textarea
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-400 text-sm resize-none"
                    placeholder="Describe what you've accomplished for this milestone..."
                    autoFocus
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => handleAddUpdate(milestone.id)}
                      disabled={saving || !updateContent.trim()}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium shadow-sm"
                    >
                      {saving ? 'Posting...' : 'Post Update'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}