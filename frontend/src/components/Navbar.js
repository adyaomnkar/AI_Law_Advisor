import { Link, useLocation } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { useState } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

export default function Navbar() {
  const location = useLocation();
  const { language, setLanguage, clearChat } = useChat();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Chat', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { path: '/legal-aid', label: 'Legal Aid', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { path: '/about', label: 'About', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="6" x2="22" y2="6" /><path d="M4 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L8 6" /><path d="M16 6l-2 8c0 1.1 1.8 2 4 2s4-.9 4-2L20 6" /><circle cx="12" cy="2" r="1" fill="#0f172a" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold text-white leading-none">AI Law Advisor</span>
            <span className="block text-[10px] text-amber-400/60 font-medium tracking-wider">LEGAL INFORMATION SYSTEM</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-all flex items-center gap-2 ${
                location.pathname === link.path
                  ? 'bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="bg-slate-800 text-slate-300 text-sm border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>

          <button
            onClick={clearChat}
            className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700"
            title="New Chat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Chat
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-800 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all flex items-center gap-2 ${
                  location.pathname === link.path
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { clearChat(); setMobileOpen(false); }}
              className="px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-amber-400 text-left flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Chat
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
