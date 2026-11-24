const StatCard = ({ label, value, sub, accent = false, className = '' }) => (
  <div className={`bg-surface border border-line rounded-lg px-5 py-4 ${className}`}>
    <p className="text-xs text-muted mb-1.5">{label}</p>
    <h3 className={`text-[28px] leading-none font-medium tabular-nums ${accent ? 'text-accent' : 'text-text'}`}>
      {value}
    </h3>
    {sub && <p className="text-xs text-muted mt-1.5">{sub}</p>}
  </div>
);

export default StatCard;
