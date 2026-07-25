import { useState, useEffect } from 'react'
import { X, DollarSign, Calendar, CreditCard, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function ContractDetail({ contractId, user, onClose }) {
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentDescription, setPaymentDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchContractDetail()
  }, [contractId])

  const fetchContractDetail = async () => {
    try {
      const res = await api.get(`/contracts/${contractId}`)
      setContract(res.data)
      // Set default payment amount to remaining amount
      if (res.data.remaining_amount > 0) {
        setPaymentAmount(res.data.remaining_amount.toString())
      }
    } catch (err) {
      console.error('Error fetching contract:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMakePayment = async (e) => {
    e.preventDefault()
    const amount = parseFloat(paymentAmount)

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (amount > contract.remaining_amount) {
      toast.error(`Amount cannot exceed remaining balance of $${contract.remaining_amount}`)
      return
    }

    setProcessing(true)
    try {
      await api.post(`/contracts/${contractId}/payments`, {
        amount,
        description: paymentDescription || `Payment for ${contract.project.title}`,
        payment_method: paymentMethod
      })
      
      toast.success('Payment processed successfully!')
      setShowPaymentForm(false)
      setPaymentAmount('')
      setPaymentDescription('')
      fetchContractDetail()
    } catch (err) {
      console.error('Error processing payment:', err)
      toast.error(err.response?.data?.error || 'Failed to process payment')
    } finally {
      setProcessing(false)
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900/30'
      case 'partially_paid':
        return 'text-yellow-600 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30'
      case 'not_paid':
        return 'text-red-600 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 dark:text-dark-200 bg-gray-100 dark:bg-dark-700'
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600 p-8 text-gray-900 dark:text-dark-50">
          <p>Loading contract details...</p>
        </div>
      </div>
    )
  }

  if (!contract) {
    return null
  }

  const isClient = user.role === 'client'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-dark-50">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50">{contract.project.title}</h2>
            <p className="text-gray-600 dark:text-dark-200 mt-1">
              {isClient ? `Freelancer: ${contract.freelancer.name}` : `Client: ${contract.project.client_name}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full text-gray-700 dark:text-dark-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Payment Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-dark-700 dark:to-dark-600 rounded-lg border border-blue-200 dark:border-dark-600 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50">Payment Overview</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusColor(contract.payment_status)} dark:border dark:border-opacity-20`}>
                {contract.payment_status === 'not_paid' ? 'Not Paid' :
                 contract.payment_status === 'partially_paid' ? 'Partially Paid' :
                 'Fully Paid'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-50">${contract.amount}</p>
              </div>
              <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-1">Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${contract.total_paid}</p>
              </div>
              <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-1">Remaining</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">${contract.remaining_amount}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-dark-200 mb-2">
                <span>Payment Progress</span>
                <span className="font-semibold">{contract.payment_percentage}%</span>
              </div>
                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${contract.payment_percentage}%` }}
                >
                  {contract.payment_percentage > 10 && (
                    <span className="text-xs text-white font-medium">{contract.payment_percentage}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Make Payment Button (Client Only) */}
          {isClient && contract.remaining_amount > 0 && !showPaymentForm && (
            <button
              onClick={() => setShowPaymentForm(true)}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Make Payment
            </button>
          )}

          {/* Payment Form (Client Only) */}
          {isClient && showPaymentForm && (
            <div className="bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-200 dark:border-dark-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-4">Process Payment</h3>
              <form onSubmit={handleMakePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">
                    Amount (Max: ${contract.remaining_amount})
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-dark-300" />
                    <input
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                      required
                      max={contract.remaining_amount}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    placeholder="e.g., Milestone 1 Payment"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-50 placeholder-gray-500 dark:placeholder-dark-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-50"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-dark-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payment History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-4">Payment History</h3>
            {contract.payments.length === 0 ? (
              <div className="bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-200 dark:border-dark-600 p-8 text-center text-gray-500 dark:text-dark-300">
                No payments made yet
              </div>
            ) : (
              <div className="space-y-3">
                {contract.payments.map((payment) => (
                  <div key={payment.id} className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-dark-50">${payment.amount}</p>
                        <p className="text-sm text-gray-600 dark:text-dark-200">{payment.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        payment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-dark-300">
                      <span className="flex items-center">
                        <CreditCard className="w-3 h-3 mr-1" />
                        {payment.payment_method?.replace('_', ' ')}
                      </span>
                      <span>
                        {payment.paid_at ? new Date(payment.paid_at).toLocaleString() : 'Pending'}
                      </span>
                    </div>
                    {payment.transaction_id && (
                      <p className="text-xs text-gray-400 dark:text-dark-400 mt-2">
                        Transaction ID: {payment.transaction_id}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-4">Project Details</h3>
            <div className="bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-200 dark:border-dark-600 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-dark-200">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  contract.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  contract.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                  'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200'
                }`}>
                  {contract.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-dark-200">Start Date:</span>
                <span className="font-medium text-gray-900 dark:text-dark-50">{new Date(contract.start_date).toLocaleDateString()}</span>
              </div>
              {contract.end_date && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-dark-200">End Date:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-50">{new Date(contract.end_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200 dark:border-dark-600">
                <p className="text-sm text-gray-600 dark:text-dark-200 mb-2">Description:</p>
                <p className="text-gray-900 dark:text-dark-50">{contract.project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
