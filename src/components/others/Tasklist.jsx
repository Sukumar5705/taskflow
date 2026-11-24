import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import AcceptTasklist    from './AcceptTasklist';
import NewTaskList       from './NewTaskList';
import CompleteTaskList  from './CompleteTaskList';
import FailedTaskList    from './FailedTasklist';
import { statusMeta } from '../../utils/statusMeta';

const FILTERS = ['all', 'new', 'active', 'completed', 'failed'];

const TaskList = ({ data }) => {
  const { updateTaskStatus, refreshMyTasks } = useContext(AuthContext);
  const [tasks,        setTasks]        = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sync tasks from live data prop (comes from MongoDB via AuthProvider)
  useEffect(() => {
    const raw = data?.tasks ?? [];
    setTasks(raw.map(t => ({ ...t, id: t._id || t.id })));
  }, [data]);

  // Also re-sync when tasksUpdated fires
  useEffect(() => {
    const handler = async () => {
      await refreshMyTasks();
    };
    window.addEventListener('tasksUpdated', handler);
    return () => window.removeEventListener('tasksUpdated', handler);
  }, [refreshMyTasks]);

  const mutate = async (taskId, newStatus) => {
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    // Persist to MongoDB
    await updateTaskStatus(taskId, newStatus);
  };

  const filtered     = activeFilter === 'all' ? tasks : tasks.filter(t => t.status === activeFilter);
  const filterCount  = f => f === 'all' ? tasks.length : tasks.filter(t => t.status === f).length;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {FILTERS.map(f => {
          const active = activeFilter === f;
          const dotClass = f === 'all' ? 'bg-text2' : statusMeta(f).dot;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors duration-150 border
                ${active ? 'bg-raised border-line2 text-text' : 'border-line text-muted hover:text-text2'}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
              <span className="capitalize">{f}</span>
              <span className="text-muted">{filterCount(f)}</span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[160px] text-muted gap-2 border border-dashed border-line rounded-lg">
          <p className="text-sm m-0">No tasks in this category</p>
        </div>
      ) : (
        <div id="tasklist" className="flex gap-4 overflow-x-auto pb-4">
          {filtered.map(task => {
            const id = task._id || task.id;
            if (task.status === 'new')
              return <NewTaskList key={id} data={task} onAccept={() => mutate(id, 'active')} />;
            if (task.status === 'active')
              return <AcceptTasklist key={id} data={task}
                onMoveToCompleted={() => mutate(id, 'completed')}
                onMoveToFailed={() => mutate(id, 'failed')} />;
            if (task.status === 'completed')
              return <CompleteTaskList key={id} data={task} />;
            if (task.status === 'failed')
              return <FailedTaskList key={id} data={task} />;
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
