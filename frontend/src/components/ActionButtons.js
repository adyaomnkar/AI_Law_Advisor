const ICON_MAP = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  file: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  building: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  balance: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  video: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <triangle cx="12" cy="12" r="10" /><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'eye-off': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

const COLOR_MAP = {
  red:    { bg: 'bg-red-500/10',    border: 'border-red-500/30',    text: 'text-red-400',    btn: 'bg-red-500/20 hover:bg-red-500/30 text-red-300' },
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   text: 'text-blue-400',   btn: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300' },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400',  btn: 'bg-green-500/20 hover:bg-green-500/30 text-green-300' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', btn: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', btn: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300' },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  text: 'text-amber-400',  btn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/30',   text: 'text-pink-400',   btn: 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300' },
};

export default function ActionButtons({ buttons }) {
  if (!buttons || buttons.length === 0) return null;

  // Group by category
  const grouped = buttons.reduce((acc, btn) => {
    const cat = btn.category || 'Resources';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(btn);
    return acc;
  }, {});

  return (
    <div className="mt-3 rounded-xl border border-slate-700/60 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-700/60 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Take Action</span>
        <span className="text-xs text-slate-500 ml-1">— Official Government Portals</span>
      </div>

      <div className="p-3 bg-slate-900/60 space-y-3">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">{category}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {items.map((btn) => {
                const c = COLOR_MAP[btn.color] || COLOR_MAP.blue;
                const icon = ICON_MAP[btn.icon] || ICON_MAP.file;
                return (
                  <a
                    key={btn.id}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all duration-200 group ${c.bg} ${c.border} hover:brightness-110`}
                  >
                    <div className={`mt-0.5 flex-shrink-0 ${c.text}`}>{icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${c.text} flex items-center gap-1.5`}>
                        {btn.label}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{btn.desc}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
        <p className="text-[10px] text-slate-600 text-center pt-1">
          These are official government/authorized portals. Clicking will open in a new tab.
        </p>
      </div>
    </div>
  );
}
