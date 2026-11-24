import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Field, { inputClass } from '../ui/Field';
import Button from '../ui/Button';

const DEMO_USERS = [
  { role: 'Admin',    email: 'admin@example.com',    password: '123456' },
  { role: 'HR',       email: 'hr@example.com',        password: '123456' },
  { role: 'Manager',  email: 'manager@example.com',   password: '123456' },
  { role: 'Employee', email: 'employee1@example.com', password: '123456' },
];

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (u) => { setEmail(u.email); setPassword(u.password); setError(''); };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="h-9 w-9 rounded-md bg-raised border border-line2 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h9M3 15h5" stroke="#eef0f5" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="16" cy="14" r="2.6" fill="#4C6EF5" />
            </svg>
          </div>
          <span className="text-text text-xl font-medium tracking-tight">TaskFlow</span>
        </div>

        {/* Card */}
        <div className="bg-surface border border-line rounded-xl p-7">
          <h1 className="text-text font-medium text-lg mb-1">Sign in</h1>
          <p className="text-muted text-sm mb-6">Access your TaskFlow workspace</p>

          {error && (
            <div className="mb-4 px-3.5 py-2.5 rounded-md bg-negative/10 border border-negative/25 text-negative text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <Field label="Email address">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" required autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label="Password">
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password"
                className={inputClass}
              />
            </Field>
            <Button type="submit" disabled={loading} className="mt-1 w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Quick fill demo accounts */}
          <div className="mt-5 pt-4 border-t border-line">
            <p className="text-muted text-xs mb-2.5">Demo accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.role}
                  onClick={() => quickFill(u)}
                  className="px-2.5 py-2 rounded-md bg-raised border border-line text-text2 text-xs text-left
                             hover:border-line2 hover:text-text transition-colors duration-150"
                >
                  <span className="text-text font-medium">{u.role}</span>
                  <span className="block text-muted mt-0.5 truncate">{u.email}</span>
                </button>
              ))}
            </div>
            <p className="text-muted text-xs text-center mt-2.5">Password for all accounts: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
