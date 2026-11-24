import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Login from './components/auth/Login';
import AdminDashboard    from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import HRDashboard       from './components/Dashboard/HrDashboard';
import ManagerDashboard  from './components/Dashboard/ManagerDashboard';

const Spinner = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-bg flex-col gap-4">
    <div className="h-9 w-9 rounded-md bg-raised border border-line2 flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14M3 10h9M3 15h5" stroke="#eef0f5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
    <p className="text-muted text-sm">Connecting to TaskFlow…</p>
  </div>
);

const App = () => {
  const { user, loggedInUserData, logout, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;
  if (!user)   return <Login />;

  if (user === 'admin')   return <AdminDashboard   onLogout={logout} />;
  if (user === 'hr')      return <HRDashboard      data={loggedInUserData} onLogout={logout} />;
  if (user === 'manager') return <ManagerDashboard data={loggedInUserData} onLogout={logout} />;
  return                         <EmployeeDashboard data={loggedInUserData} onLogout={logout} />;
};

export default App;
