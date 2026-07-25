export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1117] text-gray-700 dark:text-gray-300">

      {/* HERO SECTION (similar to landing header tone) */}
      <section className="pt-28 pb-16 text-center relative overflow-hidden px-6">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 blur-3xl rounded-full"></div>

        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
          Last updated: <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mt-6 rounded-full"></div>
      </section>

      {/* MAIN CARD BLOCK */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white dark:bg-[#11161D] border border-gray-200 dark:border-[#1E242C] 
                        rounded-2xl shadow-2xl p-10 space-y-10">

          {/* INTRO */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome to TalentLink</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your privacy matters — this page explains how we collect, use and safeguard your information.
            </p>
          </div>

          {/* GRID SECTIONS LIKE FEATURE-CARDS ON LANDING */}
          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Information We Collect",
                items: [
                  "Account details (email, name, role)",
                  "Skills, portfolio & profile data",
                  "Login activity, viewed projects",
                  "IP, browser type, device type",
                  "Messages exchanged on platform"
                ],
              },
              {
                title: "How Your Data is Used",
                items: [
                  "Account & identity verification",
                  "Match freelancers with clients",
                  "Secure communication & payments",
                  "Improve platform quality & security",
                  "Send OTP & important alerts"
                ],
              },
              {
                title: "We Never Sell Your Data",
                items: [
                  "Your personal information is not sold",
                  "Data shared only for payments/legal",
                  "Clients only see your public profile",
                  "Messaging is encrypted end-to-end"
                ],
              },
              {
                title: "Your Rights",
                items: [
                  "Download/export your stored info",
                  "Request account deletion anytime",
                  "Edit/update your profile freely",
                  "Report suspicious/fraud activity"
                ],
              }
            ].map((block, i) => (
              <div key={i}
                className="bg-gray-50 dark:bg-[#161C24] border border-gray-200 dark:border-[#28313A]
                           rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{block.title}</h3>
                <ul className="space-y-2 text-sm">
                  {block.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-teal-400 font-bold">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FINAL SECTION LIKE CTA-TONE ON LANDING */}
          <div className="text-center mt-10 p-10 rounded-2xl bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Need Clarification?</h2>
            <p className="opacity-90 mb-4 text-lg">
              Our team responds quickly and transparently.
            </p>
            <p className="text-xl font-semibold tracking-wide">
              📩 support@talentlink.com
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
