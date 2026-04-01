import ReactMarkdown from 'react-markdown';
import EntityBadge from './EntityBadge';
import ActionButtons from './ActionButtons';

// only show entity badges when we have actual legal references
function hasRelevantEntities(entities) {
  if (!entities || Object.keys(entities).length === 0) return false;
  // Must have at least one STATUTE or SECTION with real content
  const legalKeys = ['STATUTE', 'SECTION', 'ACT'];
  return legalKeys.some(key => {
    const vals = entities[key];
    return vals && (Array.isArray(vals) ? vals.length > 0 : !!vals);
  });
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const showLegalDetails = hasRelevantEntities(message.entities);

  return (
    <div className={`animate-fade-in flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar + Name */}
        <div className={`flex items-center gap-2 mb-1 ${isUser ? 'justify-end' : ''}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            isUser ? 'bg-slate-600 text-slate-300' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {isUser ? 'Y' : 'AI'}
          </div>
          <span className="text-xs text-slate-500">
            {isUser ? 'You' : 'AI Law Advisor'}
            <span className="ml-2 opacity-50">
              {message.timestamp?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </span>
        </div>

        {/* Message bubble */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
        }`}>
          <div className="chat-message text-sm leading-relaxed">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>

        {/* Entities */}
        {showLegalDetails && message.entities && Object.keys(message.entities).length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(message.entities).map(([type, values]) =>
              (Array.isArray(values) ? values : [values]).map((val, i) => (
                <EntityBadge key={`${type}-${i}`} type={type} value={val} />
              ))
            )}
          </div>
        )}

        {/* Sources */}
        {showLegalDetails && message.sources && message.sources.length > 0 && (
          <div className="mt-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-500 font-medium mb-1">Sources:</p>
            {message.sources.map((src, i) => (
              <p key={i} className="text-xs text-slate-400 m-0">
                {src.section && <span className="entity-section">{src.section}</span>}{' '}
                {src.text}
              </p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {!isUser && message.action_buttons && message.action_buttons.length > 0 && (
          <ActionButtons buttons={message.action_buttons} />
        )}

        {/* Accuracy / Relevance bars */}
        {message.accuracy && message.accuracy.length > 0 && (
          <div className="mt-2 px-3 py-2.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-500 font-medium mb-2 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Relevance Accuracy
            </p>
            <div className="space-y-1.5">
              {message.accuracy.map((item, i) => {
                const pct = item.relevance || 0;
                const barColor = pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-400';
                const textColor = pct >= 70 ? 'text-emerald-400' : pct >= 40 ? 'text-amber-400' : 'text-red-400';
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] text-slate-400 truncate mr-2">
                        {item.section}{item.title ? ` — ${item.title}` : ''}
                      </span>
                      <span className={`text-[11px] font-semibold ${textColor} flex-shrink-0`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
