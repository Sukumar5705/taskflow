import StatusDot from '../ui/StatusDot';

/** Shared card shell used by the new/active/completed/failed task cards. */
const TaskCard = ({ data, status, footer }) => (
  <div className="relative bg-surface border border-line rounded-lg w-[280px] shrink-0 p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="px-2 py-1 rounded-xs bg-raised border border-line2 text-text2 text-[11px]">
        {data.category}
      </span>
      <span className="text-muted text-[11px]">{data.date}</span>
    </div>

    <StatusDot status={status} className="mb-1.5" />

    <h3 className="text-text font-medium text-[15px] leading-snug mb-1.5">{data.title}</h3>
    <p className="text-text2 text-xs leading-relaxed mb-5">{data.description}</p>

    {footer}
  </div>
);

export default TaskCard;
