import { create } from "zustand";

type Task = {
  id: string;
  text: string;
};

type TaskStore = {
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
};

// Função para carregar as tarefas do Local Storage
const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Função para salvar as tarefas no Local Storage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: loadTasksFromLocalStorage(), // Inicializa com as tarefas salvas
  addTask: (text) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        { id: crypto.randomUUID(), text: text },
      ];
      saveTasksToLocalStorage(newTasks); // Salva no Local Storage
      return { tasks: newTasks };
    }),
  removeTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      saveTasksToLocalStorage(newTasks); // Salva no Local Storage
      return { tasks: newTasks };
    }),
  editTask: (id, text) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, text: text } : task
      );
      saveTasksToLocalStorage(newTasks); // Salva no Local Storage
      return { tasks: newTasks };
    }),
}));
