import PageHeader from "../components/PageHeader";

function pricing() {
    return(
       <div className="max-w-6xl mx-auto">
        <PageHeader
        h1="Check out our pricing"
        h2="Our pricing is very simple"
        />

        <div className="flex flex-col md:flex-row gap-8 mt-16 px-4">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center flex-1 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl font-bold mb-4 text-white">Free</div>
                <div className="text-6xl font-bold mb-6 text-white">
                    $0
                    <span className="text-lg font-normal text-white/80">/month</span>
                </div>
                <ul className="text-white/90 space-y-3 mb-8 text-left">
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        5 minutes of video processing
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        Basic caption styles
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        720p export quality
                    </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Get Started Free
                </button>
            </div>

           

            {/* Enterprise Plan */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center flex-1 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl font-bold mb-4 text-white">Enterprise</div>
                <div className="text-6xl font-bold mb-6 text-white">
                    Custom
                    <span className="text-lg font-normal text-white/80"></span>
                </div>
                <ul className="text-white/90 space-y-3 mb-8 text-left">
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        Everything in Pro
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        API access
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        Bulk processing
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        Custom integrations
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 mr-3">✓</span>
                        Dedicated support
                    </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Contact Sales
                </button>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white">Can I cancel anytime?</h4>
                    <p className="text-white/80">Yes! You can cancel your subscription at any time. No questions asked.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white">Do you offer refunds?</h4>
                    <p className="text-white/80">We offer a 30-day money-back guarantee for all paid plans.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white">What payment methods do you accept?</h4>
                    <p className="text-white/80">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
                </div>
            </div>
        </div>
       </div>

    )
}

export default pricing;