import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Star,
  MessageSquare,
  Shield,
} from 'lucide-react'
import TopNav from '../components/TopNav'
import { motion } from 'framer-motion'

export default function Landing() {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Post Projects',
      description:
        'Clients can easily post projects and receive proposals from talented freelancers.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Find Talent',
      description:
        'Browse through verified freelancers with diverse skills and experience.',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Secure Payments',
      description:
        'Built-in payment system with milestone tracking and secure transactions.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Project Tracking',
      description:
        'Real-time progress updates with milestone management and status tracking.',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Direct Messaging',
      description:
        'Communicate seamlessly with clients or freelancers through our chat system.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Platform',
      description:
        'Your data and transactions are protected with enterprise-grade security.',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Projects Completed' },
    { number: '$2M+', label: 'Paid to Freelancers' },
    { number: '4.9/5', label: 'Average Rating' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      content:
        'TalentLink helped me find the perfect developer for my project. The milestone tracking feature is amazing!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Developer',
      content:
        'Best platform for finding quality projects. The payment system is transparent and reliable.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Agency Owner',
      content:
        'We use TalentLink for all our freelance needs. The quality of talent is exceptional.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1117] transition-colors">
      <TopNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-600/20 to-teal-400/20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-teal-500/20 to-blue-500/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Connect with Top
            <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Freelance Talent
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            The ultimate platform for clients to find skilled freelancers and for freelancers to
            discover exciting projects. Manage everything from proposals to payments in one place.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition"
            >
              Start Hiring
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-[#161B22] text-blue-600 dark:text-teal-300 border border-gray-200 dark:border-[#28313A] rounded-xl hover:bg-gray-200 dark:hover:bg-[#1E242C] font-semibold text-lg transition"
            >
              Find Work
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center rounded-2xl bg-white/80 dark:bg-[#141A21]/80 backdrop-blur border border-gray-100 dark:border-[#29313A] px-4 py-6 shadow-sm"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-teal-400">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#11161D]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful features to streamline your freelance workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#161C24] border border-gray-200 dark:border-[#29313A] p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-[#1F2630] rounded-xl flex items-center justify-center text-blue-600 dark:text-teal-300 mb-4 shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-[#0D1117]">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-14">
            Get started in three simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              'Create Your Account',
              'Post or Browse Projects',
              'Work & Get Paid',
            ].map((title, step) => (
              <div key={step}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {step === 0 && 'Sign up as a client or freelancer in minutes. Set up your profile and showcase your skills.'}
                  {step === 1 && 'Clients post projects, freelancers browse and submit proposals. Find the perfect match.'}
                  {step === 2 && 'Collaborate, track progress, and process payments securely through our platform.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-[#10161E] dark:to-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Loved by Thousands
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#161D25] border border-gray-200 dark:border-[#29313A] p-6 rounded-2xl shadow-sm hover:shadow-xl transition"
              >
                <div className="flex mb-4">
                  {[...Array(test.rating)].map((_, x) => (
                    <Star key={x} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  "{test.content}"
                </p>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {test.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {test.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of clients and freelancers already using TalentLink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-700 dark:text-blue-700 rounded-xl hover:bg-blue-50 font-semibold text-lg transition"
            >
              Sign Up Free
              <ArrowRight className="ml-2 inline-block w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-white border-2 border-white/80 rounded-xl hover:bg-white/10 font-semibold text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0E12] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">TalentLink</h3>
              <p className="text-sm text-gray-500">
                Connecting talented freelancers with amazing clients worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Post a Project</a></li>
                <li><a href="#" className="hover:text-white">Find Freelancers</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Freelancers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Browse Projects</a></li>
                <li><a href="#" className="hover:text-white">Submit Proposals</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><Link to="/Contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/PrivacyPolicy" className="hover:text-white">Privacy Policy</Link></li>

              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 text-center pt-8 text-sm">
            © 2024 TalentLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
