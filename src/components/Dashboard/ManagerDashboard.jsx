import { useContext, useState } from 'react';
import Header          from '../../components/others/Header';
import CreateTask      from '../../components/others/CreateTask';
import AllTask         from '../../components/AllTask';
import PerformancePage from '../../pages/Performance';
import AuthContext     from '../../context/AuthContext';
import PageShell       from '../ui/PageShell';
import StatCard        from '../ui/StatCard';
import Tabs            from '../ui/Tabs';

const TABS = [
  { key: 'tasks',       label: 'Assign tasks' },
  { key: 'team',        label: 'Team overview' },
  { key: 'performance', label: 'Performance' },
];

const ManagerDashboard = ({ data, onLogout }) => {
  const { logout, userData } = useContext(AuthContext);
  const handleLogout = onLogout ?? logout;
  const [tab, setTab] = useState('tasks');
  const employees = userData?.employees || [];

  const stats = [
    { label: 'Team size',     value: employees.length },
    { label: 'Tasks assigned', value: employees.reduce((a, e) => a + (e.tasks?.length ?? 0), 0) },
    { label: 'Completed',     value: employees.reduce((a, e) => a + (e.taskStats?.completed ?? 0), 0) },
    { label: 'Needs attention', value: employees.reduce((a, e) => a + (e.taskStats?.failed ?? 0), 0) },
  ];

  return (
    <PageShell>
      <Header data={data} onLogout={handleLogout} role="manager" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} />)}
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'tasks'       && <CreateTask />}
      {tab === 'team'        && <AllTask />}
      {tab === 'performance' && <PerformancePage />}
    </PageShell>
  );
};

export default ManagerDashboard;
