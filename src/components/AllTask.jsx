import { useEffect, useState } from 'react';
import ProgressBar from './ui/ProgressBar';

const readEmployees = () => {
  try { return JSON.parse(localStorage.getItem('employees')) || []; }
  catch { return []; }
};

const Count = ({ value, colorClass }) => (
  <span className={`inline-block min-w-[26px] text-sm font-medium tabular-nums ${colorClass}`}>{value}</span>
);

const AllTask = ({ data }) => {
  const [employees, setEmployees] = useState(() => data || readEmployees());
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handler = () => setEmployees(data || readEmployees());
    window.addEventListener('tasksUpdated', handler);
    handler();
    return () => window.removeEventListener('tasksUpdated', handler);
  }, [data]);

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const totals = employees.reduce((acc, emp) => {
    acc.new       += emp.taskStats?.newTask   ?? 0;
    acc.active    += emp.taskStats?.active    ?? 0;
    acc.completed += emp.taskStats?.completed ?? 0;
    acc.failed    += emp.taskStats?.failed    ?? 0;
    return acc;
  }, { new: 0, active: 0, completed: 0, failed: 0 });

  const th = 'text-muted text-[11px] font-medium pb-3 px-3 text-left border-b border-line whitespace-nowrap';
  const td = 'py-3.5 px-3 border-b border-line/60 align-middle';

  return (
    <div className="bg-surface border border-line rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <h2 className="text-text font-medium text-[15px]">Team overview</h2>
          <span className="px-2 py-0.5 rounded-xs bg-raised text-muted text-xs">{employees.length} members</span>
        </div>

        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search employee…"
          className="px-3.5 py-1.5 rounded-md bg-bg border border-line text-text text-xs outline-none
                     focus:border-accent transition-colors duration-150 w-[180px] placeholder:text-muted"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={th}>Employee</th>
              <th className={`${th} text-center`}>New</th>
              <th className={`${th} text-center`}>Active</th>
              <th className={`${th} text-center`}>Done</th>
              <th className={`${th} text-center`}>Failed</th>
              <th className={`${th} text-right`}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, idx) => {
              const s = emp.taskStats ?? {};
              const total = (s.newTask ?? 0) + (s.active ?? 0) + (s.completed ?? 0) + (s.failed ?? 0);
              const pct = total > 0 ? Math.round(((s.completed ?? 0) / total) * 100) : 0;
              const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors duration-150">
                  <td className={td}>
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 shrink-0 rounded-md bg-raised border border-line2 flex items-center justify-center text-text text-xs font-medium">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-text font-medium text-sm m-0 truncate">{emp.name}</p>
                        <p className="text-muted text-xs m-0">{emp.designation || 'Employee'}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`${td} text-center`}><Count value={s.newTask ?? 0} colorClass="text-warning" /></td>
                  <td className={`${td} text-center`}><Count value={s.active ?? 0} colorClass="text-accent" /></td>
                  <td className={`${td} text-center`}><Count value={s.completed ?? 0} colorClass="text-positive" /></td>
                  <td className={`${td} text-center`}><Count value={s.failed ?? 0} colorClass="text-negative" /></td>
                  <td className={`${td} text-right`}>
                    <div className="flex items-center gap-2 justify-end">
                      <ProgressBar pct={pct} colorClass="bg-accent" />
                      <span className="text-muted text-xs w-8 text-right tabular-nums">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-line">
              <td className={`${td} text-muted text-xs font-medium`}>Total</td>
              <td className={`${td} text-center`}><Count value={totals.new} colorClass="text-warning" /></td>
              <td className={`${td} text-center`}><Count value={totals.active} colorClass="text-accent" /></td>
              <td className={`${td} text-center`}><Count value={totals.completed} colorClass="text-positive" /></td>
              <td className={`${td} text-center`}><Count value={totals.failed} colorClass="text-negative" /></td>
              <td />
            </tr>
          </tfoot>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted text-sm">No employees found</div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
