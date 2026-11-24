import TaskCard from './TaskCard';
import Button from '../ui/Button';

const AcceptTasklist = ({ data, onMoveToCompleted, onMoveToFailed }) => (
  <TaskCard
    data={data}
    status="active"
    footer={
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onMoveToCompleted?.(data)}>
          Done
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 hover:text-negative hover:border-negative/40" onClick={() => onMoveToFailed?.(data)}>
          Failed
        </Button>
      </div>
    }
  />
);

export default AcceptTasklist;
