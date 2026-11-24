import { useEffect, useState } from 'react';
import StatCard from '../ui/StatCard';

const readStats = (id) => {
  try {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const emp = employees.find(e => e.id === id);
    return emp?.taskStats ?? { newTask: 0, active: 0, completed: 0, failed: 0 };
  } catch { return { newTask: 0, active: 0, completed: 0, failed: 0 }; }
};

const CARDS = [
  { key: 'newTask',   label: 'New' },
  { key: 'active',    label: 'In progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed',    label: 'Failed' },
];

const TaskListNumber = ({ data }) => {
  const [stats, setStats] = useState(() => readStats(data?.id));

  useEffect(() => {
    const handler = () => setStats(readStats(data?.id));
    window.addEventListener('tasksUpdated', handler);
    handler();
    return () => window.removeEventListener('tasksUpdated', handler);
  }, [data?.id]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {CARDS.map(card => (
        <StatCard key={card.key} label={card.label} value={stats[card.key] ?? 0} />
      ))}
    </div>
  );
};

export default TaskListNumber;
