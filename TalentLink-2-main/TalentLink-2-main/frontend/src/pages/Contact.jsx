import { Mail, MapPin, Phone, Send } from "lucide-react"
import TopNav from "../components/TopNav"

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1117] text-gray-700 dark:text-gray-300">
      
      <TopNav /> {/* navbar stays consistent */}

      {/* HERO */}
      <section className="pt-28 pb-16 text-center relative overflow-hidden px-6">
        {/* Background accents */}
        <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/20 blur-3xl rounded-full"></div>

        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
          We’re here to help. Let’s talk.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mt-6 rounded-full"></div>
      </section>

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-10">

        {/* Contact Info Card */}
        <div className="bg-white dark:bg-[#11161D] border border-gray-200 dark:border-[#1E242C]
                        shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>

          <div className="space-y-6">

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-teal-400" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Email</p>
                <p>support@talentlink.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-600 dark:text-teal-400" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Phone</p>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-teal-400" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Office</p>
                <p>TalentLink HQ, Bangalore, India</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-[#11161D] border border-gray-200 dark:border-[#202831]
                        shadow-xl rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0D1117] border 
                             border-gray-200 dark:border-[#2A323C] rounded-lg 
                             text-gray-900 dark:text-gray-100 focus:ring-2
                             focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0D1117] border 
                             border-gray-200 dark:border-[#2A323C] rounded-lg 
                             text-gray-900 dark:text-gray-100 focus:ring-2
                             focus:ring-blue-500 outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0D1117] border 
                           border-gray-200 dark:border-[#2A323C] rounded-lg 
                           text-gray-900 dark:text-gray-100 focus:ring-2
                           focus:ring-blue-500 outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows="6"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0D1117] border 
                           border-gray-200 dark:border-[#2A323C] rounded-lg 
                           text-gray-900 dark:text-gray-100 focus:ring-2
                           focus:ring-blue-500 outline-none resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
                         from-blue-600 to-teal-500 text-white rounded-lg text-lg 
                         font-semibold hover:opacity-90 transition active:scale-95"
            >
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* MAP / CTA SECTION (like landing mockup map) */}
      <section className="py-16 bg-gray-100 dark:bg-[#11161D]">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Visit Our Office
          </h2>

          <div className="w-full h-72 bg-gray-300 dark:bg-[#1A212B] rounded-xl 
                         flex items-center justify-center text-gray-600 
                         dark:text-gray-400 text-lg">
            📍 Google Maps Placeholder
          </div>
        </div>
      </section>
    </div>
  )
}
