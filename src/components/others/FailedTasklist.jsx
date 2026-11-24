import TaskCard from './TaskCard';

const FailedTaskList = ({ data }) => (
  <TaskCard
    data={data}
    status="failed"
    footer={
      <div className="py-2 rounded-md bg-negative/10 border border-negative/25 text-negative text-xs font-medium text-center">
        Task failed
      </div>
    }
  />
);

export default FailedTaskList;
