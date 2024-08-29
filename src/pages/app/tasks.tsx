import { Link } from "react-router-dom";
import Layout from "../_layout/app";
import { Plus } from "lucide-react";
import { TaskItem } from "../../components/task-item";
import { useTaskStore } from "../../store/task";

export function TasksPage() {
  const { tasks } = useTaskStore()
  return (
    <Layout>
      {/* tags header */}
      <div className="flex gap-2 mb-4">
        <button className="p-2 px-3 bg-green-200 flex rounded-full text-black">
          Todo
        </button>
        <button className="p-2 px-3 bg-gray-800 flex rounded-full text-white">
          In Progress
        </button>
        <button className="p-2 px-3 bg-gray-800 flex rounded-full text-white">
          Done
        </button>

        <Link
          to="/create"
          className="bg-yellow-200 flex rounded-full h-fit my-auto p-2 
        text-black ml-auto"
        >
          <Plus className="text-xl" />
        </Link>
      </div>

      {/* tasks */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            text={task.text}
          />
        ))}
      </div>
    </Layout>
  );
}
