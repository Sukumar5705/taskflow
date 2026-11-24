import { statusMeta } from '../../utils/statusMeta';

/** Small colored dot + label, the one consistent way task state is shown everywhere. */
const StatusDot = ({ status, showLabel = true, className = '' }) => {
  const m = statusMeta(status);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {showLabel && <span className={`text-xs ${m.text}`}>{m.label}</span>}
    </span>
  );
};

export default StatusDot;
