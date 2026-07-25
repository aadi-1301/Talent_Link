import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageSquare, Star, MapPin, DollarSign, X, Heart, ChevronDown, ChevronUp } from 'lucide-react'
import api from '../api/axios'

export default function FindFreelancers({ user }) {
  const navigate = useNavigate()
  const [freelancers, setFreelancers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showReviews, setShowReviews] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  useEffect(() => {
    fetchFreelancers()
  }, [])

  const fetchFreelancers = async () => {
    try {
      const res = await api.get('/freelancers')
      setFreelancers(res.data)
    } catch (err) {
      console.error('Error fetching freelancers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < freelancers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleMessage = (freelancerId) => {
    navigate(`/messages?user=${freelancerId}`)
  }

  const fetchReviews = async (freelancerId) => {
    try {
      setLoadingReviews(true)
      const res = await api.get(`/users/${freelancerId}/reviews`)
      setReviews(res.data.reviews)
    } catch (err) {
      console.error('Error fetching reviews:', err)
    } finally {
      setLoadingReviews(false)
    }
  }

  const toggleReviews = () => {
    if (!showReviews && reviews.length === 0) {
      fetchReviews(currentFreelancer.id)
    }
    setShowReviews(!showReviews)
  }

  // Reset reviews when changing freelancer
  useEffect(() => {
    setShowReviews(false)
    setReviews([])
  }, [currentIndex])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600 dark:text-dark-200">Loading freelancers...</div>
      </div>
    )
  }

  if (freelancers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-2">No Freelancers Found</h2>
          <p className="text-gray-600 dark:text-dark-200">Check back later for available freelancers</p>
        </div>
      </div>
    )
  }

  const currentFreelancer = freelancers[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-dark-950 dark:to-dark-900 py-8 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-50 mb-2">Find Freelancers</h1>
          <p className="text-gray-600 dark:text-dark-200">Browse through talented freelancers</p>
          <div className="mt-4 text-sm text-gray-500 dark:text-dark-300">
            {currentIndex + 1} of {freelancers.length}
          </div>
        </div>

        <div className="relative">
          {/* Card */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-600 overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
            
            {/* Profile Content */}
            <div className="p-8 -mt-16">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-dark-800 border-4 border-white dark:border-dark-800 shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {currentFreelancer.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Name and Rating */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-50 mb-2">
                  {currentFreelancer.name}
                </h2>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 text-lg font-semibold text-gray-700 dark:text-dark-200">
                      {currentFreelancer.rating || 0}
                    </span>
                  </div>
                  <button
                    onClick={toggleReviews}
                    className="text-gray-500 dark:text-dark-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    <span>({currentFreelancer.reviews_count || 0} reviews)</span>
                    {showReviews ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {currentFreelancer.location && (
                  <div className="flex items-center justify-center text-gray-600 dark:text-dark-200">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentFreelancer.location}
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              {showReviews && (
                <div className="mb-6 border-t border-gray-200 dark:border-dark-600 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-4">Reviews</h3>
                  {loadingReviews ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : reviews.length > 0 ? (
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-dark-50">
                                {review.reviewer.name}
                              </span>
                              <div className="flex items-center text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-dark-300">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700 dark:text-dark-200 text-sm">
                              {review.comment}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-dark-300 mt-2">
                            Project: {review.project.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-dark-300 py-4">
                      No reviews yet
                    </p>
                  )}
                </div>
              )}

              {/* Hourly Rate */}
              {currentFreelancer.hourly_rate && (
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 px-6 py-3 rounded-full flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-xl font-bold">{currentFreelancer.hourly_rate}/hr</span>
                  </div>
                </div>
              )}

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-2">About</h3>
                <p className="text-gray-700 dark:text-dark-200 leading-relaxed">
                  {currentFreelancer.bio || 'No bio available'}
                </p>
              </div>

              {/* Skills */}
              {currentFreelancer.skills && currentFreelancer.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentFreelancer.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Link */}
              {currentFreelancer.portfolio_url && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-2">Portfolio</h3>
                  <a
                    href={currentFreelancer.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                  >
                    {currentFreelancer.portfolio_url}
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-4 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 border border-gray-300 dark:border-dark-600 rounded-full hover:bg-gray-300 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  title="Previous"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => handleMessage(currentFreelancer.id)}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center space-x-2 transition-all transform hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">Message</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === freelancers.length - 1}
                  className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  title="Next"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700 dark:text-dark-200" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === freelancers.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-8 h-8 text-gray-700 dark:text-dark-200" />
          </button>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-dark-300">
          <p>Use ← → arrow keys to navigate</p>
        </div>
      </div>
    </div>
  )
}
