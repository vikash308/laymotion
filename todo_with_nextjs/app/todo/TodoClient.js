"use client";

import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

export default function TodoClient() {
  const { user } = useAuth();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
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

  const addTodo = async () => {
    const trimmed = task.trim();
    if (!trimmed) return;

    try {
      const response = await fetch("/api", {
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

    try {
      const response = await fetch("/api", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !target.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updated = await response.json();
      setTodos((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, completed: updated.completed }
            : item
        )
      );
      toast.success("Task updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not update task. Please try again.");
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch("/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((current) => current.filter((item) => item.id !== id));
      toast.success("Task removed successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not remove task. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover theme="dark" />
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md">
        <header className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 font-semibold mb-4 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            ✓
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {user ? `${user.name}'s Tasks` : "My Tasks"}
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">
            Keep your day organized with a simple and low-key task list.
          </p>
        </header>

        <section className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="task-input">
              New task
            </label>
            <input
              id="task-input"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && addTodo()}
              placeholder="Add your next task..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={addTodo}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              Add
            </button>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Completed</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">{stats.completed}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">{stats.pending}</p>
          </div>
        </section>

        <section className="space-y-3">
          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-center text-slate-400 animate-pulse">
              Loading tasks...
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-8 text-center text-slate-500">
              No tasks yet. Add your first task to begin.
            </div>
          ) : (
            <div className="max-h-[380px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {todos.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-850 bg-slate-950/40 px-4 py-3 hover:border-slate-800 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(item.id)}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                      item.completed
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                    }`}
                  >
                    {item.completed ? "✓" : "○"}
                  </button>
                  <p className={`flex-1 text-sm leading-6 transition-all ${item.completed ? "text-slate-500 line-through" : "text-white"}`}>
                    {item.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeTodo(item.id)}
                    className="rounded-xl p-2 text-sm text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-all"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
