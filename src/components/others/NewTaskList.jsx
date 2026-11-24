import TaskCard from './TaskCard';
import Button from '../ui/Button';

const NewTaskList = ({ data, onAccept }) => (
  <TaskCard
    data={data}
    status="new"
    footer={
      <Button variant="secondary" size="sm" className="w-full" onClick={() => onAccept?.(data)}>
        Accept task
      </Button>
    }
  />
);

export default NewTaskList;
