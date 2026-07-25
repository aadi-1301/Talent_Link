export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0E12] text-gray-400 py-12 mt-auto border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8 mb-10">

          <div>
            <h3 className="text-white text-lg font-bold mb-4">TalentLink</h3>
            <p className="text-sm text-gray-500">
              Connecting talented freelancers with clients globally.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/projects" className="hover:text-white">Browse Projects</a></li>
              <li><a href="/login" className="hover:text-white">Post Requests</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/projects" className="hover:text-white">Find Work</a></li>
              <li><a href="/login" className="hover:text-white">Apply to Projects</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-6" />

        <p className="text-center text-sm text-gray-500">© 2025 TalentLink. All rights reserved.</p>
      </div>
    </footer>
  );
}
