const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex gap-1.5 mb-6 border-b border-line">
    {tabs.map(t => (
      <button
        key={t.key}
        onClick={() => onChange(t.key)}
        className={`px-3.5 py-2.5 text-sm transition-colors duration-150 border-b-2 -mb-px
          ${active === t.key
            ? 'text-text border-accent font-medium'
            : 'text-muted border-transparent hover:text-text2'}`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

export default Tabs;
