import { useChat } from '../context/ChatContext';

const domains = [
  {
    id: 'tenant',
    label: 'Tenant Rights',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Rent Control Acts, security deposits, eviction rules',
    color: 'blue',
  },
  {
    id: 'consumer',
    label: 'Consumer Rights',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    desc: 'Consumer Protection Act, defective goods, refunds',
    color: 'green',
  },
];

const colorMap = {
  blue: { active: 'border-blue-500 bg-blue-500/10 text-blue-400', hover: 'hover:border-blue-500/50' },
  green: { active: 'border-green-500 bg-green-500/10 text-green-400', hover: 'hover:border-green-500/50' },
};

export default function DomainSelector() {
  const { domain, setDomain } = useChat();

  return (
    <div className="flex gap-3">
      {domains.map(d => {
        const isActive = domain === d.id;
        const c = colorMap[d.color];
        return (
          <button
            key={d.id}
            onClick={() => setDomain(d.id)}
            className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
              isActive ? c.active : `border-slate-700 text-slate-400 ${c.hover}`
            }`}
          >
            <div className={isActive ? '' : 'opacity-50'}>{d.icon}</div>
            <div>
              <div className="text-sm font-semibold">{d.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{d.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
