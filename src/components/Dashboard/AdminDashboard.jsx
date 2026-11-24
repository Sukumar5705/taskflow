import { useContext } from 'react';
import Header      from '../others/Header';
import CreateTask  from '../others/CreateTask';
import AllTask     from '../AllTask';
import AuthContext from '../../context/AuthContext';
import PageShell   from '../ui/PageShell';
import StatCard    from '../ui/StatCard';

const AdminDashboard = ({ onLogout }) => {
  const { userData, logout } = useContext(AuthContext);
  const handleLogout = onLogout ?? logout;
  const employees   = userData?.employees || [];

  const stats = [
    { label: 'Employees',  value: employees.length },
    { label: 'Total tasks', value: employees.reduce((a, e) => a + (e.tasks?.length ?? 0), 0) },
    { label: 'Completed',  value: employees.reduce((a, e) => a + (e.taskStats?.completed ?? 0), 0) },
    { label: 'In progress', value: employees.reduce((a, e) => a + (e.taskStats?.active ?? 0), 0) },
    { label: 'Failed',     value: employees.reduce((a, e) => a + (e.taskStats?.failed ?? 0), 0) },
  ];

  return (
    <PageShell>
      <Header onLogout={handleLogout} role="admin" />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} />)}
      </div>

      <CreateTask />
      <AllTask />
    </PageShell>
  );
};

export default AdminDashboard;
