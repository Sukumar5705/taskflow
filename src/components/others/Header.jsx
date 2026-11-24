import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Button from '../ui/Button';

const ROLE_META = {
  admin:    { label: 'Admin' },
  hr:       { label: 'HR' },
  manager:  { label: 'Manager' },
  employee: { label: '' },
  user:     { label: '' },
};

const Header = ({ data, onLogout, role = 'user' }) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = onLogout ?? logout;

  const initials = data?.name
    ? data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : (role === 'admin' ? 'AD' : role === 'hr' ? 'HR' : role === 'manager' ? 'MG' : '?');

  const meta = ROLE_META[role] || ROLE_META['user'];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="flex items-center justify-between gap-4 mb-6 px-5 py-3.5 bg-surface border border-line rounded-lg">
      {/* Left: avatar + name */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="h-10 w-10 shrink-0 rounded-md bg-raised border border-line2 flex items-center justify-center text-text text-sm font-medium">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted mb-0.5 flex items-center gap-1.5">
            {greeting()}
            {meta.label && (
              <span className="px-1.5 py-px rounded-xs text-[11px] text-text2 bg-raised border border-line2">
                {meta.label}
              </span>
            )}
          </p>
          <h2 className="text-text font-medium text-[15px] leading-tight truncate">
            {data?.name ?? (role === 'admin' ? 'Admin' : role === 'hr' ? 'HR Manager' : 'Manager')}
          </h2>
          {data?.designation && (
            <p className="text-text2 text-xs mt-0.5 truncate">
              {data.designation}{data.department ? ` · ${data.department}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Right: date + logout */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg border border-line text-text2 text-xs whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>

        <Button variant="danger" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
