import { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { sendQuery } from '../services/api';

const placeholders = {
  tenant: 'e.g., "My landlord won\'t return my security deposit"',
  consumer: 'e.g., "I bought a defective fridge and the store refuses refund"',
};

export default function ChatInput() {
  const [input, setInput] = useState('');
  const { domain, language, sessionId, addMessage, isLoading, setIsLoading } = useChat();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    setInput('');
    addMessage('user', query);
    setIsLoading(true);

    try {
      const res = await sendQuery(query, domain, language, sessionId);
      addMessage('assistant', res.response, res.entities, res.sources);
    } catch (err) {
      // fallback when backend is down
      const mockResponse = getMockResponse(query, domain);
      addMessage('assistant', mockResponse.response, mockResponse.entities, mockResponse.sources);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-4xl mx-auto flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[domain] || 'Type your legal question...'}
            rows={1}
            className="w-full bg-slate-800 text-white text-sm border border-slate-700 rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:border-amber-500 placeholder:text-slate-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold px-5 py-3 rounded-xl transition-all text-sm flex items-center gap-2"
        >
          {isLoading ? (
            <span className="flex gap-1"><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></span>
          ) : (
            <>
              Send
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-slate-600 mt-2">
        Press Enter to send &middot; Shift+Enter for new line
      </p>
    </form>
  );
}

// fallback responses when backend is down
export function getMockResponse(query, domain) {
  const q = query.toLowerCase();

  if (domain === 'tenant' || q.includes('landlord') || q.includes('rent') || q.includes('deposit') || q.includes('tenant') || q.includes('eviction')) {
    return {
      response: `## Your Rights as a Tenant\n\nBased on your query, here are the relevant provisions under the **Rent Control Act**:\n\n**Security Deposit Return:**\n- Your landlord is legally obligated to return your security deposit within **15 days** of vacating the premises.\n- Maximum deposit allowed is typically **2 months' rent** (varies by state).\n- The landlord can only deduct for actual damages beyond normal wear and tear.\n\n**What You Can Do:**\n1. Send a **written notice** to your landlord demanding the deposit return\n2. If no response within 15 days, file a complaint with the **Rent Control Tribunal**\n3. You may be entitled to **interest** on the withheld deposit\n\n> **Section 9** — *"The landlord shall refund the security deposit within fifteen days of the tenant vacating the premises, after deducting any legitimate dues."*\n\n---\n*Need a formal legal notice? Click "Generate PDF" to create one.*`,
      entities: {
        STATUTE: ['Rent Control Act'],
        SECTION: ['Section 9', 'Section 12'],
        AMOUNT: ['2 months rent', '15 days'],
        PENALTY: ['Interest on withheld deposit'],
      },
      sources: [
        { section: 'Section 9', text: 'Security deposit return obligations' },
        { section: 'Section 12', text: 'Tenant protection against unlawful eviction' },
      ],
    };
  }

  if (domain === 'consumer' || q.includes('defective') || q.includes('refund') || q.includes('product') || q.includes('consumer')) {
    return {
      response: `## Consumer Protection Rights\n\nUnder the **Consumer Protection Act, 2019**, you have strong protections:\n\n**Your Rights for Defective Products:**\n- Right to **refund or replacement** for defective goods within the warranty period\n- Right to **compensation** for harm caused by defective products\n- Protection against **unfair trade practices** (misleading ads, overpricing)\n\n**Filing a Complaint:**\n1. First approach the seller with your **purchase receipt** and **warranty card**\n2. If unresolved, file on **e-Daakhil portal** (edaakhil.nic.in) — free for claims under ₹5 lakhs\n3. District Consumer Forum handles claims up to **₹1 crore**\n\n> **Section 2(6)** — *"A consumer who has bought goods that are defective shall have the right to receive a refund or replacement."*\n\n---\n*Need a formal consumer grievance notice? Click "Generate PDF" to create one.*`,
      entities: {
        STATUTE: ['Consumer Protection Act, 2019'],
        SECTION: ['Section 2(6)', 'Section 35'],
        AMOUNT: ['₹5 lakhs', '₹1 crore'],
        COURT: ['District Consumer Forum'],
      },
      sources: [
        { section: 'Section 2(6)', text: 'Definition of defective goods and consumer rights' },
        { section: 'Section 35', text: 'Jurisdiction of District Commission' },
      ],
    };
  }

  return {
    response: `Thank you for your question. Let me analyze this under **${domain === 'tenant' ? 'Tenant Rights' : 'Consumer Protection'} law**.\n\nBased on the information provided, I recommend:\n1. Document everything in writing\n2. Check if your situation falls under the relevant Act\n3. Consider consulting a legal aid service for specific advice\n\n*You can find free legal aid services under the "Legal Aid" tab.*`,
    entities: {},
    sources: [],
  };
}
