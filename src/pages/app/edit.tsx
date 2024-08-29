import { ArrowLeft } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useTaskStore } from "../../store/task";
import Layout from "../_layout/app";

const inputClassName =
  "border w-full mb-2 border-solid border-gray-400 bg-transparent p-3 rounded-xl";

export function EditPage() {
  const { id: idTask } = useParams();
  const { editTask, tasks } = useTaskStore();
  const actualTask = tasks.filter((obj) => obj.id === idTask)[0];
  const [form, setForm] = useState({
    text: actualTask.text,
    id: idTask,
  });

  console.log("params", idTask);
  console.log("FORM", form);

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!form.text || !form.id) {
        return toast.error(
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        );
      }
      editTask(form.id, form.text);
      resetForm();
      toast.success("Task Created");
    } catch (err) {
      // if (!navigator.onLine) {
      //   resetForm();
      //   return toast.success(
      //     "You're offline. We'll save the changes when you're online!"
      //   );
      // }
      toast.error("Error creating task");
    }
  };

  const resetForm = () => {
    setForm({
      text: "",
      id: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <form onSubmit={handleForm} className="space-y-2">
        <div className="flex justify-start mb-20">
          <Link to="/tasks" className="mt-4 w-full mr-auto flex gap-2">
            <ArrowLeft className="my-auto text-xl" /> Back
          </Link>
        </div>

        <div>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Add a Task..."
            className={inputClassName}
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className="bg-yellow-100 rounded-full py-3 w-40 text-black mx-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
