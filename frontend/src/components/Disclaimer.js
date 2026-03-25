import { useState } from 'react';

export default function Disclaimer() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-xs text-amber-300 flex items-center gap-2 m-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <strong>Disclaimer:</strong> This provides legal <em>information</em>, not legal <em>advice</em>. Always consult a qualified lawyer for specific legal matters.
        </p>
        <button onClick={() => setVisible(false)} className="text-amber-400/60 hover:text-amber-400 text-lg leading-none ml-4">&times;</button>
      </div>
    </div>
  );
}
