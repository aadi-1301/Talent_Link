// import { useState, useEffect } from 'react'
// import { DollarSign, Calendar, CheckCircle, Star, MessageSquare, TrendingUp, CreditCard, AlertCircle } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import api from '../api/axios'
// import MilestoneManager from '../components/MilestoneManager'
// import ContractDetail from '../components/ContractDetail'

// export default function Contracts({ user }) {
//   const navigate = useNavigate()
//   const [contracts, setContracts] = useState([])
//   const [showReviewModal, setShowReviewModal] = useState(false)
//   const [selectedContract, setSelectedContract] = useState(null)
//   const [showMilestoneManager, setShowMilestoneManager] = useState(null)
//   const [showContractDetail, setShowContractDetail] = useState(null)
//   const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })

//   useEffect(() => {
//     fetchContracts()
//   }, [])

//   const fetchContracts = async () => {
//     try {
//       const res = await api.get('/contracts')
//       setContracts(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const handleCompleteContract = async (contractId) => {
//     try {
//       await api.post(`/contracts/${contractId}/complete`)
//       toast.success('Contract marked as completed!')
//       fetchContracts()
//     } catch (err) {
//       console.error(err)
//       toast.error(err.response?.data?.error || 'Failed to mark contract as completed')
//     }
//   }

//   const handleSubmitReview = async (e) => {
//     e.preventDefault()
//     try {
//       await api.post('/reviews', {
//         project_id: selectedContract.project.id,
//         reviewee_id: user.role === 'client' ? selectedContract.freelancer.id : selectedContract.project.client_id,
//         rating: reviewData.rating,
//         comment: reviewData.comment
//       })
//       setShowReviewModal(false)
//       toast.success('Review submitted successfully!')
//       setReviewData({ rating: 5, comment: '' })
//     } catch (err) {
//       console.error(err)
//       toast.error(err.response?.data?.error || 'Failed to submit review')
//     }
//   }

//   const getPaymentStatusBadge = (status) => {
//     switch (status) {
//       case 'paid':
//         return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
//           <CheckCircle className="w-3 h-3 mr-1" />
//           Paid
//         </span>
//       case 'partially_paid':
//         return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center">
//           <AlertCircle className="w-3 h-3 mr-1" />
//           Partially Paid
//         </span>
//       case 'not_paid':
//         return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center">
//           <CreditCard className="w-3 h-3 mr-1" />
//           Not Paid
//         </span>
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="text-gray-900 dark:text-dark-50">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-50 mb-8">Contracts</h1>

//       <div className="grid grid-cols-1 gap-6">
//         {contracts.length === 0 ? (
//           <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-8 text-center text-gray-500 dark:text-dark-300">
//             No contracts yet
//           </div>
//         ) : (
//           contracts.map(contract => (
//             <div key={contract.id} className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50">{contract.project.title}</h3>
//                   <p className="text-gray-600 dark:text-dark-200 mt-1">
//                     {user.role === 'client' ? `Freelancer: ${contract.freelancer.name}` : `Client: ${contract.project.client_name}`}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={() => {
//                       const recipientId = user.role === 'client' 
//                         ? contract.freelancer.id 
//                         : contract.project.client_id;
//                       navigate(`/messages?user=${recipientId}`);
//                     }}
//                     className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
//                     title="Send message"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     contract.status === 'active' ? 'bg-green-100 text-green-700' :
//                     contract.status === 'completed' ? 'bg-blue-100 text-blue-700' :
//                     'bg-gray-100 text-gray-700'
//                   }`}>
//                     {contract.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Payment Status Section */}
//               <div className="bg-gray-50 dark:bg-dark-900 rounded-lg p-4 mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700 dark:text-dark-50">Payment Status</span>
//                   {getPaymentStatusBadge(contract.payment_status)}
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600 dark:text-dark-200">Total Amount:</span>
//                     <span className="font-semibold text-gray-900 dark:text-dark-50">${contract.amount}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600 dark:text-dark-200">Paid:</span>
//                     <span className="font-semibold text-green-600 dark:text-green-400">${contract.total_paid}</span>
//                   </div>
//                   {contract.remaining_amount > 0 && (
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600 dark:text-dark-200">Remaining:</span>
//                       <span className="font-semibold text-red-600 dark:text-red-400">${contract.remaining_amount}</span>
//                     </div>
//                   )}
//                   {/* Progress Bar */}
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
//                       <div
//                         className="bg-green-500 dark:bg-green-600 h-2 rounded-full transition-all duration-300"
//                         style={{ width: `${contract.payment_percentage}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-gray-500 dark:text-dark-300 mt-1 text-right">{contract.payment_percentage}% paid</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div className="flex items-center text-gray-600 dark:text-dark-200">
//                   <Calendar className="w-4 h-4 mr-2" />
//                   <span>Started: {new Date(contract.start_date).toLocaleDateString()}</span>
//                 </div>
//                 {contract.end_date && (
//                   <div className="flex items-center text-gray-600 dark:text-dark-200">
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                     <span>Ended: {new Date(contract.end_date).toLocaleDateString()}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => setShowContractDetail(contract.id)}
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   <CreditCard className="w-4 h-4 mr-2" />
//                   View Details & Payments
//                 </button>
//                 {contract.status === 'active' && user.role === 'freelancer' && (
//                   <button
//                     onClick={() => setShowMilestoneManager(
//                       showMilestoneManager === contract.id ? null : contract.id
//                     )}
//                     className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     <TrendingUp className="w-4 h-4 mr-2" />
//                     {showMilestoneManager === contract.id ? 'Hide' : 'Update'} Progress
//                   </button>
//                 )}
//                 {contract.status === 'active' && user.role === 'client' && (
//                   <button
//                     onClick={() => handleCompleteContract(contract.id)}
//                     className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                   >
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                     Mark as Completed
//                   </button>
//                 )}
//                 {contract.status === 'completed' && (
//                   <button
//                     onClick={() => {
//                       setSelectedContract(contract)
//                       setShowReviewModal(true)
//                     }}
//                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     <Star className="w-4 h-4 mr-2" />
//                     Leave Review
//                   </button>
//                 )}
//               </div>

//               {/* Milestone Manager */}
//               {showMilestoneManager === contract.id && user.role === 'freelancer' && (
//                 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-600">
//                   <MilestoneManager 
//                     projectId={contract.project.id} 
//                     onUpdate={fetchContracts}
//                   />
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Contract Detail Modal */}
//       {showContractDetail && (
//         <ContractDetail
//           contractId={showContractDetail}
//           user={user}
//           onClose={() => {
//             setShowContractDetail(null)
//             fetchContracts()
//           }}
//         />
//       )}

//       {showReviewModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-md w-full text-gray-900 dark:text-dark-50">
//             <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>
//             <form onSubmit={handleSubmitReview} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-2">Rating</label>
//                 <div className="flex space-x-2">
//                   {[1, 2, 3, 4, 5].map(rating => (
//                     <button
//                       key={rating}
//                       type="button"
//                       onClick={() => setReviewData({...reviewData, rating})}
//                       className="focus:outline-none"
//                     >
//                       <Star
//                         className={`w-8 h-8 ${rating <= reviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">Comment</label>
//                 <textarea
//                   value={reviewData.comment}
//                   onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-900 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
//                 />
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowReviewModal(false)}
//                   className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-dark-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Submit Review
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
import { DollarSign, Calendar, CheckCircle, Star, MessageSquare, TrendingUp, CreditCard, AlertCircle, FileText, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/axios'
import MilestoneManager from '../components/MilestoneManager'
import ContractDetail from '../components/ContractDetail'

export default function Contracts({ user }) {
  const navigate = useNavigate()
  const [contracts, setContracts] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [showMilestoneManager, setShowMilestoneManager] = useState(null)
  const [showContractDetail, setShowContractDetail] = useState(null)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      const res = await api.get('/contracts')
      setContracts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCompleteContract = async (contractId) => {
    try {
      await api.post(`/contracts/${contractId}/complete`)
      toast.success('Contract marked as completed!')
      fetchContracts()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.error || 'Failed to mark contract as completed')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      await api.post('/reviews', {
        project_id: selectedContract.project.id,
        reviewee_id: user.role === 'client' ? selectedContract.freelancer.id : selectedContract.project.client_id,
        rating: reviewData.rating,
        comment: reviewData.comment
      })
      setShowReviewModal(false)
      toast.success('Review submitted successfully!')
      setReviewData({ rating: 5, comment: '' })
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.error || 'Failed to submit review')
    }
  }

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="px-2.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium flex items-center border border-green-200 dark:border-green-800">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Paid
        </span>
      case 'partially_paid':
        return <span className="px-2.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center border border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Partially Paid
        </span>
      case 'not_paid':
        return <span className="px-2.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium flex items-center border border-red-200 dark:border-red-800">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Not Paid
        </span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          My Contracts
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {contracts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No contracts found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Active contracts will appear here once you start a project.
              </p>
            </div>
          ) : (
            contracts.map(contract => (
              <div key={contract.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md">
                
                {/* Contract Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{contract.project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.role === 'client' ? `Freelancer: ${contract.freelancer.name}` : `Client: ${contract.project.client_name}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <button 
                      onClick={() => {
                        const recipientId = user.role === 'client' 
                          ? contract.freelancer.id 
                          : contract.project.client_id;
                        navigate(`/messages?user=${recipientId}`);
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                      title="Send message"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      contract.status === 'active' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                      contract.status === 'completed' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                    }`}>
                      {contract.status}
                    </span>
                  </div>
                </div>

                {/* Payment Status Panel */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 mb-6 border border-gray-100 dark:border-gray-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Payment Details
                    </span>
                    {getPaymentStatusBadge(contract.payment_status)}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Total Amount</span>
                      <span className="font-bold text-gray-900 dark:text-white">${contract.amount}</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Paid</span>
                      <span className="font-bold text-green-600 dark:text-green-400">${contract.total_paid}</span>
                    </div>
                    {contract.remaining_amount > 0 && (
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Remaining</span>
                        <span className="font-bold text-red-600 dark:text-red-400">${contract.remaining_amount}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-right w-full">
                        <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                          {contract.payment_percentage}% Paid
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                      <div style={{ width: `${contract.payment_percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Dates & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Started: <span className="font-medium text-gray-900 dark:text-gray-200">{new Date(contract.start_date).toLocaleDateString()}</span></span>
                    </div>
                    {contract.end_date && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Ended: <span className="font-medium text-gray-900 dark:text-gray-200">{new Date(contract.end_date).toLocaleDateString()}</span></span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setShowContractDetail(contract.id)}
                      className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Details
                    </button>
  

                    {contract.status === 'active' && user.role === 'freelancer' && (
                      <button
                        onClick={() => setShowMilestoneManager(
                          showMilestoneManager === contract.id ? null : contract.id
                        )}
                        className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm shadow-md shadow-purple-500/20"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {showMilestoneManager === contract.id ? 'Hide' : 'Update'} Progress
                      </button>
                    )}

                    {contract.status === 'active' && user.role === 'client' && (
                      <button
                        onClick={() => handleCompleteContract(contract.id)}
                        className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-md shadow-green-500/20"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </button>
                    )}

                    {contract.status === 'completed' && (
                      <button
                        onClick={() => {
                          setSelectedContract(contract)
                          setShowReviewModal(true)
                        }}
                        className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-md shadow-blue-500/20"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Review
                      </button>
                    )}
                  </div>
                </div>

                {/* Milestone Manager Expansion */}
                {showMilestoneManager === contract.id && user.role === 'freelancer' && (
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
                    <MilestoneManager 
                      projectId={contract.project.id} 
                      onUpdate={fetchContracts}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contract Detail Modal */}
        {showContractDetail && (
          <ContractDetail
            contractId={showContractDetail}
            user={user}
            onClose={() => {
              setShowContractDetail(null)
              fetchContracts()
            }}
          />
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                Leave a Review
              </h2>
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating})}
                        className="focus:outline-none focus:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${rating <= reviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Comment</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                    rows="4"
                    placeholder="Share your experience working on this project..."
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}