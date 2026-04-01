import { useState } from 'react';
import { useChat } from '../context/ChatContext';

const domains = [
  {
    id: 'tenant',
    label: 'Tenant Rights',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Rent, deposits, eviction',
    color: 'blue',
  },
  {
    id: 'consumer',
    label: 'Consumer',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    desc: 'Defective goods, refunds',
    color: 'green',
  },
  {
    id: 'criminal',
    label: 'BNS / Criminal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    desc: 'BNS, BNSS, BSA laws',
    color: 'red',
  },
  {
    id: 'cyber',
    label: 'Cyber Crime',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    desc: 'IT Act, UPI, SIM fraud',
    color: 'purple',
  },
  {
    id: 'women_child',
    label: 'Women & Child',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    desc: 'POCSO, DV, harassment',
    color: 'pink',
  },
  {
    id: 'enforcement',
    label: 'LEA / Police',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    desc: 'FIR, arrest, bail, BNSS',
    color: 'orange',
  },
];

const colorMap = {
  blue:   { active: 'border-blue-500 bg-blue-500/10 text-blue-400',   hover: 'hover:border-blue-500/40 hover:bg-blue-500/5' },
  green:  { active: 'border-green-500 bg-green-500/10 text-green-400', hover: 'hover:border-green-500/40 hover:bg-green-500/5' },
  red:    { active: 'border-red-500 bg-red-500/10 text-red-400',       hover: 'hover:border-red-500/40 hover:bg-red-500/5' },
  purple: { active: 'border-purple-500 bg-purple-500/10 text-purple-400', hover: 'hover:border-purple-500/40 hover:bg-purple-500/5' },
  pink:   { active: 'border-pink-500 bg-pink-500/10 text-pink-400',    hover: 'hover:border-pink-500/40 hover:bg-pink-500/5' },
  orange: { active: 'border-orange-500 bg-orange-500/10 text-orange-400', hover: 'hover:border-orange-500/40 hover:bg-orange-500/5' },
};

export default function DomainSelector() {
  const { domain, setDomain } = useChat();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? domains : domains.slice(0, 4);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {visible.map(d => {
        const isActive = domain === d.id;
        const c = colorMap[d.color];
        return (
          <button
            key={d.id}
            onClick={() => setDomain(d.id)}
            title={d.desc}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isActive ? c.active : `border-slate-700 text-slate-400 ${c.hover}`
            }`}
          >
            <span className={isActive ? '' : 'opacity-60'}>{d.icon}</span>
            <span>{d.label}</span>
          </button>
        );
      })}
      <button
        onClick={() => setShowAll(!showAll)}
        className="px-2 py-1.5 rounded-lg border border-slate-700 text-slate-500 text-xs hover:border-slate-500 hover:text-slate-300 transition-all"
      >
        {showAll ? '← Less' : 'More →'}
      </button>
    </div>
  );
}
