import { Edit, MessageCircle, XCircle } from "lucide-react";
import { useTaskStore } from "../store/task";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  id: string;
};
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function TaskItem({ text, id }: Props) {
  const { removeTask } = useTaskStore();
  const navigate = useNavigate();

  return (
    <div className="bg-[#1f1f1f] p-5 w-full rounded-xl">
      <div className="flex item-center justify-between">
        <p className="text-gray-400 text-xs text-left">ID: {id}</p>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/edit/${id}`)}>
            <Edit className="w-5 h-5 text-orange-400" />
          </button>
          <button onClick={() => removeTask(id)}>
            <XCircle className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
      <div className="flex w-full mt-2 justify-between">
        <p className="flex grow text-gray-200 text-xl">{text}</p>
      </div>

      <div className="mt-4 w-fit ml-auto flex gap-2">
        <div className="text-sm flex">
          <MessageCircle className="my-auto mr-2" />
          <span className="inline-block my-auto">{getRandomInt(0, 100)}</span>
        </div>
      </div>
    </div>
  );
}
