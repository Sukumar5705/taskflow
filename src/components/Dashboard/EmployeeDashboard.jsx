import { useContext } from 'react';
import Header          from '../others/Header';
import TaskList        from '../others/Tasklist';
import TaskListNumber  from '../others/TaskListNumber';
import AuthContext     from '../../context/AuthContext';
import PageShell       from '../ui/PageShell';

const EmployeeDashboard = ({ data, onLogout }) => {
  const { logout, loggedInUserData } = useContext(AuthContext);
  const handleLogout = onLogout ?? logout;
  // Always use the freshest data from context (updated after each API call)
  const employee = loggedInUserData ?? data;

  return (
    <PageShell maxWidth="max-w-[1100px]">
      <Header data={employee} onLogout={handleLogout} role="user" />
      <TaskListNumber data={employee} />
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-text font-medium text-base">My tasks</h3>
        <div className="flex-1 h-px bg-line" />
        <span className="text-muted text-xs">{employee?.tasks?.length ?? 0} total</span>
      </div>
      <TaskList data={employee} />
    </PageShell>
  );
};

export default EmployeeDashboard;
