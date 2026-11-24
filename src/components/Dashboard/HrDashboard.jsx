import { useContext, useState } from 'react';
import Header          from '../../components/others/Header';
import AllTask         from '../../components/AllTask';
import PerformancePage from '../../pages/Performance';
import AuthContext     from '../../context/AuthContext';
import PageShell       from '../ui/PageShell';
import StatCard        from '../ui/StatCard';
import Tabs            from '../ui/Tabs';

const TABS = [
  { key: 'overview',    label: 'Team overview' },
  { key: 'performance', label: 'Performance analysis' },
];

const HRDashboard = ({ data, onLogout }) => {
  const { logout, userData } = useContext(AuthContext);
  const handleLogout = onLogout ?? logout;
  const [tab, setTab] = useState('overview');
  const employees = userData?.employees || [];

  const stats = [
    { label: 'Employees', value: employees.length },
    {
      label: 'Avg completion rate',
      value: employees.length
        ? `${Math.round(employees.reduce((a, e) => a + (e.taskStats?.completionRate ?? 0), 0) / employees.length)}%`
        : '0%',
    },
    { label: 'Failed tasks', value: employees.reduce((a, e) => a + (e.taskStats?.failed ?? 0), 0) },
    { label: 'Active now',   value: employees.reduce((a, e) => a + (e.taskStats?.active ?? 0), 0) },
  ];

  return (
    <PageShell>
      <Header data={data} onLogout={handleLogout} role="hr" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} />)}
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview'    && <AllTask />}
      {tab === 'performance' && <PerformancePage />}
    </PageShell>
  );
};

export default HRDashboard;
