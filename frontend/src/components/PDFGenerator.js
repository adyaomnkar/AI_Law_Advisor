import { useState } from 'react';
import { useChat } from '../context/ChatContext';

const templates = [
  { id: 'eviction_notice', label: 'Eviction Notice', domain: 'tenant' },
  { id: 'deposit_demand', label: 'Security Deposit Demand', domain: 'tenant' },
  { id: 'rent_dispute', label: 'Rent Dispute Notice', domain: 'tenant' },
  { id: 'consumer_grievance', label: 'Consumer Grievance', domain: 'consumer' },
  { id: 'defective_product', label: 'Defective Product Complaint', domain: 'consumer' },
  { id: 'refund_request', label: 'Refund Request', domain: 'consumer' },
];

export default function PDFGenerator({ inline = false }) {
  const { domain, extractedEntities } = useChat();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({ name: '', recipientName: '', address: '', details: '', amount: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const domainTemplates = templates.filter(t => t.domain === domain);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { generatePDF } = await import('../services/api');
      const blob = await generatePDF(selectedTemplate, extractedEntities || {}, formData);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTemplate}_notice.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('PDF generation failed. Make sure the backend is running on port 8000.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formContent = (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-slate-400 block mb-1">Notice Type</label>
        <select
          value={selectedTemplate}
          onChange={e => setSelectedTemplate(e.target.value)}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="">Select template...</option>
          {domainTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Your Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">
          {domain === 'tenant' ? "Landlord's Name" : "Company / Seller Name"}
        </label>
        <input
          type="text"
          value={formData.recipientName}
          onChange={e => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          placeholder={domain === 'tenant' ? "Landlord's name" : "Company name"}
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Amount (if applicable)</label>
        <input
          type="text"
          value={formData.amount}
          onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          placeholder="e.g., ₹50,000"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
          placeholder="Property / business address"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Issue Details</label>
        <textarea
          value={formData.details}
          onChange={e => setFormData(prev => ({ ...prev, details: e.target.value }))}
          className="w-full bg-slate-900 text-slate-200 text-sm border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 resize-none"
          rows={3}
          placeholder="Describe your situation..."
        />
      </div>

      {extractedEntities && Object.keys(extractedEntities).length > 0 && (
        <div className="bg-slate-900/50 rounded-lg p-2.5 border border-slate-700/50">
          <p className="text-xs text-slate-500 font-medium mb-1.5">Auto-detected from chat:</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(extractedEntities).map(([type, values]) =>
              (Array.isArray(values) ? values : [values]).map((v, i) => (
                <span key={`${type}-${i}`} className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                  {v}
                </span>
              ))
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={!selectedTemplate || isGenerating}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <span className="flex gap-1"><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></span>
            Generating...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Generate & Download PDF
          </>
        )}
      </button>
    </div>
  );

  // Inline mode (sidebar) - no wrapper
  if (inline) return formContent;

  // Default collapsible mode (not used anymore but kept for backwards compat)
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      {formContent}
    </div>
  );
}
