const ProgressBar = ({ pct, width = 'w-20', colorClass = 'bg-accent' }) => (
  <div className={`${width} h-1 rounded-full bg-line overflow-hidden`}>
    <div
      className={`h-full rounded-full ${colorClass} transition-[width] duration-500`}
      style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
    />
  </div>
);

export default ProgressBar;
