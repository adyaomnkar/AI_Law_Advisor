export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="6" x2="22" y2="6" /><path d="M4 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L8 6" /><path d="M16 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L20 6" /><circle cx="12" cy="2" r="1.2" fill="#0f172a" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">AI Law Advisor</h1>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Hybrid RAG + Legal NER system for accessible legal information
          </p>
        </div>

        {/* Problem */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 text-sm">!</span>
            The Problem
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><span className="text-red-400">-</span> High lawyer consultation fees (often exceeding $100/hour)</li>
              <li className="flex gap-2"><span className="text-red-400">-</span> Complex legal language that's hard to understand</li>
              <li className="flex gap-2"><span className="text-red-400">-</span> Limited awareness of legal rights among citizens</li>
              <li className="flex gap-2"><span className="text-red-400">-</span> Lack of access to reliable legal documentation</li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-sm">+</span>
            Our Solution
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><span className="text-green-400">+</span> Explains legal rights in plain language (8th-grade reading level)</li>
              <li className="flex gap-2"><span className="text-green-400">+</span> Retrieves accurate legal sections using Hybrid RAG (BM25 + Vector)</li>
              <li className="flex gap-2"><span className="text-green-400">+</span> Generates formal legal notices as downloadable PDFs</li>
              <li className="flex gap-2"><span className="text-green-400">+</span> Provides verified referrals to legal aid organizations</li>
              <li className="flex gap-2"><span className="text-green-400">+</span> Supports English and Hindi</li>
            </ul>
          </div>
        </section>

        {/* How it Works */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">?</span>
            How It Works
          </h2>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Ask a Question', desc: 'Type your legal question in plain English or Hindi' },
              { step: '2', title: 'Hybrid Retrieval', desc: 'BM25 keyword search + Vector semantic search find relevant laws' },
              { step: '3', title: 'Legal NER', desc: 'Extracts statutes, sections, penalties, and amounts from retrieved text' },
              { step: '4', title: 'Plain Language Response', desc: 'LLM translates complex legal jargon into simple, actionable guidance' },
              { step: '5', title: 'Generate Notices', desc: 'Create formal legal notices as downloadable PDF documents' },
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 text-sm">&lt;/&gt;</span>
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { category: 'Backend', items: 'FastAPI, LangChain, PostgreSQL' },
              { category: 'Frontend', items: 'React.js, Tailwind CSS, Axios' },
              { category: 'NLP/Search', items: 'spaCy, FAISS, BM25, OpenNyAI' },
              { category: 'Document', items: 'Jinja2 Templates, ReportLab PDF' },
            ].map(stack => (
              <div key={stack.category} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">{stack.category}</h3>
                <p className="text-sm text-slate-300">{stack.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Domains */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">MVP Legal Domains</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-400 mb-1">Tenant Rights</h3>
              <p className="text-xs text-slate-400">Rent Control Acts, security deposits, eviction rules, privacy rights</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-green-400 mb-1">Consumer Rights</h3>
              <p className="text-xs text-slate-400">Consumer Protection Act, defective goods, refunds, complaint filing</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Future: Labour Law, Criminal Law, Family Law
          </p>
        </section>

        {/* Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 text-center">
          <p className="text-sm text-amber-300 font-medium mb-1">Important Disclaimer</p>
          <p className="text-xs text-amber-300/70">
            This system provides legal <strong>information</strong>, not legal <strong>advice</strong>.
            Always consult a qualified lawyer for specific legal matters. The information provided is based on general legal provisions and may not apply to your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}
