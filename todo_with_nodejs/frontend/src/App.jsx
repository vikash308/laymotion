import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, Trash2, Plus } from "lucide-react";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(
          data.map((item) => ({
            id: item._id,
            text: item.text,
            completed: item.completed,
          }))
        );
      } catch (error) {
        console.error("Fetch todos failed:", error);
        toast.error("Unable to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((item) => item.completed).length,
      pending: todos.filter((item) => !item.completed).length,
    }),
    [todos]
  );

  const addTodo = async (e) => {
    e?.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const todo = await response.json();
      setTodos((current) => [
        { id: todo._id, text: todo.text, completed: todo.completed },
        ...current,
      ]);
      setTask("");
      toast.success("Task added successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not add task. Please try again.");
    }
  };

  const toggleTodo = async (id) => {
    const target = todos.find((item) => item.id === id);
    if (!target) return;

    const newCompleted = !target.completed;
    setTodos((current) =>
      current.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
      // Revert
      setTodos((current) =>
        current.map((t) => (t.id === id ? { ...t, completed: !newCompleted } : t))
      );
    }
  };

  const deleteTodo = async (id) => {
    const prevTodos = [...todos];
    setTodos((current) => current.filter((t) => t.id !== id));
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Task removed.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
      setTodos(prevTodos); // revert
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Todo App
          </h1>
          <p className="text-slate-400 text-lg">Manage your tasks effectively.</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Total</p>
            <p className="text-3xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Completed</p>
            <p className="text-3xl font-bold mt-1 text-emerald-400">{stats.completed}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400 font-medium">Pending</p>
            <p className="text-3xl font-bold mt-1 text-amber-400">{stats.pending}</p>
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!task.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </form>

        {/* Todo List */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No tasks yet. Add one above!</div>
          ) : (
            <ul className="divide-y divide-slate-800/50">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 p-4 hover:bg-slate-800/50 transition-colors group"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {todo.completed && <Check size={14} className="text-white" />}
                  </button>
                  <span
                    className={`flex-1 transition-all ${
                      todo.completed ? "line-through text-slate-500" : "text-slate-200"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-all rounded-lg hover:bg-slate-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" />
    </main>
  );
}
