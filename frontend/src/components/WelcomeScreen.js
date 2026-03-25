const quickQuestions = {
  tenant: [
    { text: 'My landlord won\'t return my ₹50,000 security deposit', icon: '🏠' },
    { text: 'Can my landlord evict me without notice?', icon: '📋' },
    { text: 'Is a 20% rent increase legal?', icon: '💰' },
    { text: 'Landlord entered my house without permission', icon: '🔒' },
  ],
  consumer: [
    { text: 'Bought a defective fridge, store refuses refund', icon: '🔧' },
    { text: 'Online seller sent wrong product', icon: '📦' },
    { text: 'How to file a consumer complaint?', icon: '📝' },
    { text: 'Misleading advertisement for a product', icon: '⚠️' },
  ],
};

const features = [
  { icon: '🔍', title: 'Smart Legal Search', desc: 'Hybrid BM25 + Vector retrieval finds the most relevant laws' },
  { icon: '📄', title: 'PDF Notices', desc: 'Generate formal legal notices ready to send' },
  { icon: '🏛️', title: 'Legal Aid Directory', desc: 'Find free legal assistance near you' },
];

export default function WelcomeScreen({ domain, onQuickQuestion }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Hero */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-amber-500/25 rotate-3 hover:rotate-0 transition-transform">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="6" x2="22" y2="6" /><path d="M4 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L8 6" /><path d="M16 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L20 6" /><circle cx="12" cy="2" r="1.2" fill="#0f172a" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">AI Law Advisor</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
            Ask questions about your legal rights in plain language.
            I'll find relevant laws, explain them simply, and help you generate formal legal notices.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 text-xs text-slate-300">
              <span>{f.icon}</span>
              <span>{f.title}</span>
            </div>
          ))}
        </div>

        {/* Quick questions */}
        <div className="text-left">
          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-700" />
            Try asking
            <span className="flex-1 h-[1px] bg-slate-700" />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(quickQuestions[domain] || quickQuestions.tenant).map((q, i) => (
              <button
                key={i}
                onClick={() => onQuickQuestion(q.text)}
                className="text-left text-sm text-slate-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 rounded-xl px-4 py-3 transition-all flex items-start gap-3 group"
              >
                <span className="text-base mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{q.icon}</span>
                <span className="flex-1">{q.text}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400/0 group-hover:text-amber-400/60 transition-colors mt-0.5 flex-shrink-0">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom hint */}
        <p className="mt-8 text-xs text-slate-600">
          Covers <span className="text-blue-400/60">Tenant Rights</span> &middot; <span className="text-green-400/60">Consumer Protection</span> &middot; More domains coming soon
        </p>
      </div>
    </div>
  );
}
