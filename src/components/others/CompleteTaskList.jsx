import TaskCard from './TaskCard';

const CompleteTaskList = ({ data }) => (
  <TaskCard
    data={data}
    status="completed"
    footer={
      <div className="py-2 rounded-md bg-positive/10 border border-positive/25 text-positive text-xs font-medium text-center">
        Task completed
      </div>
    }
  />
);

export default CompleteTaskList;
