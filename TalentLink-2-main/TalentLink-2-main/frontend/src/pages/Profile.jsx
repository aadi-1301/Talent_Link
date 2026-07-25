import { useState, useEffect } from 'react'
import { User, Mail, MapPin, DollarSign, Star } from 'lucide-react'
import api from '../api/axios'

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    bio: '', skills: [], hourly_rate: '', portfolio_url: '', location: ''
  })
  const [reviews, setReviews] = useState({ average_rating: 0, total_reviews: 0, reviews: [] })

  useEffect(() => {
    fetchProfile()
    fetchReviews()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile')
      setProfile(res.data.profile)
      setFormData({
        bio: res.data.profile.bio || '',
        skills: res.data.profile.skills || [],
        hourly_rate: res.data.profile.hourly_rate || '',
        portfolio_url: res.data.profile.portfolio_url || '',
        location: res.data.profile.location || ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/users/${user.id}/reviews`)
      setReviews(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put('/profile', formData)
      setEditing(false)
      fetchProfile()
    } catch (err) {
      console.error(err)
    }
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-50">{user.name}</h1>
              <p className="text-gray-600 dark:text-dark-200">{user.role}</p>
              {reviews.total_reviews > 0 && (
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600 dark:text-dark-200">
                    {reviews.average_rating} ({reviews.total_reviews} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
              />
            </div>
            {user.role === 'freelancer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.skills.join(', ')}
                    onChange={(e) => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Portfolio URL</label>
                  <input
                    type="url"
                    value={formData.portfolio_url}
                    onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 dark:text-dark-300 mr-3 mt-1" />
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-200">Email</p>
                <p className="text-gray-900 dark:text-dark-50">{user.email}</p>
              </div>
            </div>
            {profile.location && (
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 dark:text-dark-300 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-dark-200">Location</p>
                  <p className="text-gray-900 dark:text-dark-50">{profile.location}</p>
                </div>
              </div>
            )}
            {user.role === 'freelancer' && profile.hourly_rate && (
              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-gray-400 dark:text-dark-300 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-dark-200">Hourly Rate</p>
                  <p className="text-gray-900 dark:text-dark-50">${profile.hourly_rate}/hr</p>
                </div>
              </div>
            )}
            {profile.bio && (
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-1">Bio</p>
                <p className="text-gray-900 dark:text-dark-50">{profile.bio}</p>
              </div>
            )}
            {user.role === 'freelancer' && profile.skills.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {reviews.reviews.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-50">Reviews</h2>
          <div className="space-y-4">
            {reviews.reviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 dark:border-dark-600 pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-dark-600'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-dark-200">by {review.reviewer.name}</span>
                </div>
                {review.comment && <p className="text-gray-700 dark:text-dark-200">{review.comment}</p>}
                <p className="text-xs text-gray-500 dark:text-dark-300 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
