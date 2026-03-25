const typeConfig = {
  STATUTE: { class: 'entity-statute', label: 'Statute' },
  SECTION: { class: 'entity-section', label: 'Section' },
  PENALTY: { class: 'entity-penalty', label: 'Penalty' },
  AMOUNT: { class: 'entity-amount', label: 'Amount' },
  COURT: { class: 'entity-section', label: 'Court' },
  PERSON: { class: 'entity-statute', label: 'Person' },
};

export default function EntityBadge({ type, value }) {
  const config = typeConfig[type?.toUpperCase()] || { class: 'entity-section', label: type };

  return (
    <span className={`${config.class} text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full`}>
      <span className="opacity-60 text-[10px]">{config.label}</span>
      {value}
    </span>
  );
}
