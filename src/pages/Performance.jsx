import { useEffect, useState } from 'react';
import { performanceAPI } from '../utils/api';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import StatusDot from '../components/ui/StatusDot';
import Button from '../components/ui/Button';

/* ─── tiny helpers ─────────────────────────────────────────── */
const GRADE_COLOR = { A: 'text-positive', B: 'text-accent', C: 'text-warning', D: 'text-warning', F: 'text-negative' };
const GRADE_BG    = { A: 'bg-positive/10 border-positive/25', B: 'bg-accent/10 border-accent/25', C: 'bg-warning/10 border-warning/25', D: 'bg-warning/10 border-warning/25', F: 'bg-negative/10 border-negative/25' };
const GRADE_BAR    = { A: 'bg-positive', B: 'bg-accent', C: 'bg-warning', D: 'bg-warning', F: 'bg-negative' };

const GradeChip = ({ grade }) => (
  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-md border font-medium text-sm ${GRADE_BG[grade] || GRADE_BG.F} ${GRADE_COLOR[grade] || GRADE_COLOR.F}`}>
    {grade}
  </span>
);

const priorityClass = p => p === 'high' ? 'text-negative bg-negative/10 border-negative/25' : p === 'medium' ? 'text-warning bg-warning/10 border-warning/25' : 'text-positive bg-positive/10 border-positive/25';

/* ─── Employee Detail Modal ────────────────────────────────── */
const DetailModal = ({ empId, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performanceAPI.byId(empId)
      .then(r => setDetail(r.data))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [empId]);

  const overlayClass = 'fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-5';
  const modalClass = 'bg-surface border border-line2 rounded-xl p-7 w-full max-w-[800px] max-h-[85vh] overflow-y-auto relative';

  if (loading) return (
    <div className={overlayClass}>
      <div className={modalClass}>
        <p className="text-muted text-center py-10 text-sm">Loading performance data…</p>
      </div>
    </div>
  );

  if (!detail) return (
    <div className={overlayClass} onClick={onClose}>
      <div className={modalClass}>
        <p className="text-negative text-center text-sm">Failed to load data</p>
      </div>
    </div>
  );

  const { employee, stats, monthlyTrend, tasks } = detail;
  const maxMonthlyTotal = Math.max(...monthlyTrend.map(m => m.total), 1);

  return (
    <div className={overlayClass} onClick={onClose}>
      <div className={modalClass} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-md bg-raised border border-line2 flex items-center justify-center text-text font-medium text-sm">
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <h2 className="text-text font-medium text-lg m-0">{employee.name}</h2>
              <p className="text-text2 text-xs mt-0.5">{employee.designation} · {employee.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-md bg-raised border border-line2 text-text2 hover:text-text flex items-center justify-center text-sm transition-colors duration-150">
            ✕
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total tasks" value={stats.total} />
          <StatCard label="Completed" value={stats.completed} />
          <StatCard label="Completion rate" value={`${stats.completionRate}%`} />
          <StatCard label="Performance score" value={stats.performanceScore} accent sub={`Avg ${stats.avgCompletionDays}d to complete`} />
        </div>

        {/* Monthly trend — the one chart that carries the color/richness */}
        <div className="bg-bg border border-line rounded-lg p-5 mb-5">
          <p className="text-muted text-xs mb-4">Monthly trend, last 6 months</p>
          <div className="flex gap-3 items-end h-20">
            {monthlyTrend.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex flex-col justify-end gap-0.5">
                  <div
                    className="w-full bg-positive rounded-t-sm"
                    style={{ height: `${(m.completed / maxMonthlyTotal) * 70}px`, minHeight: m.completed > 0 ? '4px' : 0 }}
                  />
                  <div
                    className="w-full bg-negative"
                    style={{ height: `${(m.failed / maxMonthlyTotal) * 70}px`, minHeight: m.failed > 0 ? '4px' : 0 }}
                  />
                </div>
                <span className="text-muted text-[10px] whitespace-nowrap">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="text-positive text-xs flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-xs bg-positive inline-block" /> Completed
            </span>
            <span className="text-negative text-xs flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-xs bg-negative inline-block" /> Failed
            </span>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-bg border border-line rounded-lg p-5">
          <p className="text-muted text-xs mb-3.5">All tasks ({tasks.length})</p>
          <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-md bg-surface border border-line">
                <StatusDot status={t.status} showLabel={false} />
                <div className="flex-1 min-w-0">
                  <p className="text-text2 text-sm font-medium m-0 truncate">{t.title}</p>
                  <p className="text-muted text-xs mt-0.5">{t.category} · Due {t.date}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-xs text-[11px] font-medium border shrink-0 ${priorityClass(t.priority)}`}>
                  {t.priority}
                </span>
                <span className="shrink-0">
                  <StatusDot status={t.status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Performance Page ────────────────────────────────── */
const SORTS = [
  { key: 'score',     label: 'Score' },
  { key: 'completed', label: 'Completed' },
  { key: 'rate',      label: 'Rate' },
  { key: 'failed',    label: 'Failed' },
];

const PerformancePage = () => {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [selected,  setSelected]  = useState(null);
  const [sortBy,    setSortBy]    = useState('score');

  const load = () => {
    setLoading(true); setError(null);
    performanceAPI.all()
      .then(r => setData(r.data))
      .catch(() => setError('Failed to load performance data. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[280px] flex-col gap-3">
      <p className="text-muted text-sm">Loading performance data…</p>
    </div>
  );

  if (error) return (
    <div className="bg-negative/10 border border-negative/25 rounded-lg p-5 text-center">
      <p className="text-negative text-sm mb-3">{error}</p>
      <Button variant="secondary" size="sm" onClick={load}>Retry</Button>
    </div>
  );

  const { summary, employees } = data;

  const sorted = [...employees].sort((a, b) => {
    if (sortBy === 'score')      return b.stats.performanceScore - a.stats.performanceScore;
    if (sortBy === 'completed')  return b.stats.completed        - a.stats.completed;
    if (sortBy === 'rate')       return b.stats.completionRate   - a.stats.completionRate;
    if (sortBy === 'failed')     return b.stats.failed           - a.stats.failed;
    return 0;
  });

  const th = 'text-muted text-[11px] font-medium pb-3 px-3 text-left border-b border-line whitespace-nowrap';
  const td = 'py-3.5 px-3 border-b border-line/60 align-middle';

  const breakdown = [
    { label: 'Completed', value: summary.totalCompleted, colorClass: 'text-positive', barClass: 'bg-positive' },
    { label: 'Failed',    value: summary.totalFailed,    colorClass: 'text-negative', barClass: 'bg-negative' },
    { label: 'Active',    value: summary.totalActive,    colorClass: 'text-accent',   barClass: 'bg-accent' },
    { label: 'New',       value: summary.totalTasks - summary.totalCompleted - summary.totalFailed - summary.totalActive,
      colorClass: 'text-warning', barClass: 'bg-warning' },
  ];

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Employees"      value={summary.totalEmployees} />
        <StatCard label="Total tasks"    value={summary.totalTasks} />
        <StatCard label="Avg completion" value={`${summary.avgCompletionRate}%`} />
        <StatCard label="Top performer"  value={summary.topPerformer} sub="Highest performance score" />
      </div>

      {/* Overview: task breakdown + grade distribution */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-surface border border-line rounded-lg p-5">
          <p className="text-muted text-xs mb-4">Task breakdown</p>
          <div className="flex flex-col gap-3">
            {breakdown.map(item => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-text2 text-xs">{item.label}</span>
                  <span className={`text-xs font-medium ${item.colorClass}`}>{item.value}</span>
                </div>
                <ProgressBar pct={summary.totalTasks > 0 ? (item.value / summary.totalTasks) * 100 : 0} width="w-full" colorClass={item.barClass} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-line rounded-lg p-5">
          <p className="text-muted text-xs mb-4">Grade distribution</p>
          {['A', 'B', 'C', 'D', 'F'].map(g => {
            const count = employees.filter(e => e.grade === g).length;
            return (
              <div key={g} className="flex items-center gap-3 mb-2.5">
                <GradeChip grade={g} />
                <div className="flex-1">
                  <ProgressBar pct={employees.length > 0 ? (count / employees.length) * 100 : 0} width="w-full" colorClass={GRADE_BAR[g]} />
                </div>
                <span className="text-muted text-xs w-5 text-right tabular-nums">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee performance table */}
      <div className="bg-surface border border-line rounded-lg p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-text font-medium text-[15px]">Employee performance</h2>
          <div className="flex items-center gap-1.5">
            <span className="text-muted text-xs mr-1">Sort</span>
            {SORTS.map(s => (
              <button key={s.key} onClick={() => setSortBy(s.key)}
                className={`px-2.5 py-1 rounded-sm text-xs transition-colors duration-150 border
                  ${sortBy === s.key ? 'bg-raised border-line2 text-text' : 'border-transparent text-muted hover:text-text2'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Employee</th>
                <th className={`${th} text-center`}>Grade</th>
                <th className={`${th} text-center`}>Score</th>
                <th className={`${th} text-center`}>Done</th>
                <th className={`${th} text-center`}>Failed</th>
                <th className={`${th} text-center`}>Rate</th>
                <th className={`${th} text-center`}>Avg days</th>
                <th className={`${th} text-right`}>Progress</th>
                <th className={`${th} text-center`}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((emp, idx) => {
                const s = emp.stats;
                const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                const rateColor = s.completionRate >= 70 ? 'text-positive' : s.completionRate >= 40 ? 'text-warning' : 'text-negative';
                const rateBar   = s.completionRate >= 70 ? 'bg-positive' : s.completionRate >= 40 ? 'bg-warning' : 'bg-negative';
                return (
                  <tr key={emp._id || idx} className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className={td}>
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 shrink-0 rounded-md bg-raised border border-line2 flex items-center justify-center text-text text-xs font-medium">
                          {initials}
                        </div>
                        <div>
                          <p className="text-text font-medium text-sm m-0">{emp.name}</p>
                          <p className="text-muted text-xs m-0">{emp.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${td} text-center`}><GradeChip grade={emp.grade} /></td>
                    <td className={`${td} text-center`}>
                      <span className="text-text font-medium text-base tabular-nums">{s.performanceScore}</span>
                    </td>
                    <td className={`${td} text-center`}><span className="text-positive font-medium tabular-nums">{s.completed}</span></td>
                    <td className={`${td} text-center`}><span className="text-negative font-medium tabular-nums">{s.failed}</span></td>
                    <td className={`${td} text-center`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`font-medium text-sm tabular-nums ${rateColor}`}>{s.completionRate}%</span>
                        <ProgressBar pct={s.completionRate} width="w-14" colorClass={rateBar} />
                      </div>
                    </td>
                    <td className={`${td} text-center`}>
                      <span className="text-text2 text-sm tabular-nums">{s.avgCompletionDays > 0 ? `${s.avgCompletionDays}d` : '—'}</span>
                    </td>
                    <td className={td}>
                      <div className="flex justify-end">
                        <ProgressBar pct={s.completionRate} colorClass="bg-accent" />
                      </div>
                    </td>
                    <td className={`${td} text-center`}>
                      <button
                        onClick={() => setSelected(emp._id)}
                        className="px-3 py-1 rounded-sm bg-accent/10 border border-accent/25 text-accent text-xs font-medium
                                   hover:bg-accent/20 transition-colors duration-150"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal empId={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default PerformancePage;
