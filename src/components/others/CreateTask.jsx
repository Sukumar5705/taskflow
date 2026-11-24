import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Field, { inputClass } from '../ui/Field';
import Button from '../ui/Button';

const CATEGORIES = ['Development', 'Design', 'QA', 'DevOps', 'HR', 'Reporting', 'Administration',
  'Maintenance', 'Security', 'Database', 'Integration', 'Planning', 'Compliance', 'Other'];

const CreateTask = () => {
  const { userData, createTask } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', date: '', description: '', assignTo: '', category: '' });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      createTask(form.assignTo, { title: form.title, date: form.date, description: form.description, category: form.category });
      setStatus('success');
      setMsg(`Task assigned to ${form.assignTo}`);
      setForm({ title: '', date: '', description: '', assignTo: '', category: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className="bg-surface border border-line rounded-lg p-6 mb-6">
      <h2 className="text-text font-medium text-[15px] mb-5">Create task</h2>

      {status && (
        <div className={`mb-4 px-3.5 py-2.5 rounded-md text-sm border
          ${status === 'success'
            ? 'bg-positive/10 border-positive/25 text-positive'
            : 'bg-negative/10 border-negative/25 text-negative'}`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div className="flex flex-col gap-3.5">
            <Field label="Task title">
              <input className={inputClass} value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="e.g. Fix login bug" required />
            </Field>
            <Field label="Due date">
              <input className={inputClass} type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </Field>
            <Field label="Assign to">
              <select className={`${inputClass} cursor-pointer`} value={form.assignTo}
                onChange={e => set('assignTo', e.target.value)} required>
                <option value="" disabled>Select employee…</option>
                {(userData?.employees || []).map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Category">
              <select className={`${inputClass} cursor-pointer`} value={form.category}
                onChange={e => set('category', e.target.value)} required>
                <option value="" disabled>Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              className={`${inputClass} h-full min-h-[190px] resize-none`}
              value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Describe the task in detail…" required
            />
          </Field>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create task'}
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
