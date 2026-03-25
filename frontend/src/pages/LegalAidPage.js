import { useState } from 'react';

const legalAidServices = [
  {
    name: 'National Legal Services Authority (NALSA)',
    description: 'Free legal services for weaker sections of society including SC/ST, women, children, disabled persons, and those with annual income less than specified limit.',
    website: 'https://nalsa.gov.in',
    helpline: '15100',
    coverage: 'All India',
  },
  {
    name: 'e-Daakhil Portal',
    description: 'Online consumer complaint filing portal. Free for claims under Rs. 5 lakhs. File complaints against defective goods, deficient services, and unfair trade practices.',
    website: 'https://edaakhil.nic.in',
    helpline: '1800-11-4000',
    coverage: 'All India',
  },
  {
    name: 'District Legal Services Authority (DLSA)',
    description: 'Available in every district. Provides free legal aid, Lok Adalats, and mediation services. Walk-in consultations available.',
    website: 'https://doj.gov.in/legal-aid',
    helpline: 'Contact local DLSA',
    coverage: 'District-level',
  },
  {
    name: 'Tele-Law (CSC)',
    description: 'Free legal consultation via video conferencing at Common Service Centres. Aimed at rural and semi-urban citizens.',
    website: 'https://www.tele-law.in',
    helpline: '1800-11-0031',
    coverage: 'All India (via CSCs)',
  },
  {
    name: 'National Consumer Helpline',
    description: 'Government helpline for consumer grievances. Provides pre-litigation guidance and connects with companies for resolution.',
    website: 'https://consumerhelpline.gov.in',
    helpline: '1800-11-4000 / 14404',
    coverage: 'All India',
  },
  {
    name: 'State Human Rights Commission',
    description: 'Handles complaints of human rights violations. Available in most states for issues of discrimination, illegal detention, etc.',
    website: 'https://nhrc.nic.in',
    helpline: '14433',
    coverage: 'State-level',
  },
];

const states = [
  'All India', 'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal',
];

export default function LegalAidPage() {
  const [selectedState, setSelectedState] = useState('All India');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Free Legal Aid Services</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Access free and subsidized legal assistance from verified government organizations and NGOs across India.
          </p>
        </div>

        <div className="mb-6">
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="bg-slate-800 text-slate-300 text-sm border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          >
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4">
          {legalAidServices.map((service, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-green-500/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-white">{service.name}</h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full whitespace-nowrap ml-3">
                  {service.coverage}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-3">{service.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {service.helpline && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                    </svg>
                    {service.helpline}
                  </span>
                )}
                {service.website && (
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 no-underline"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <p className="text-xs text-amber-300">
            In case of emergency, call <strong>112</strong> (National Emergency) or <strong>181</strong> (Women's Helpline).
            For immediate legal danger, contact your nearest police station.
          </p>
        </div>
      </div>
    </div>
  );
}
