"use client";

import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api");
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
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover theme="dark" />
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)]">
        <header className="mb-6 text-center">
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Todo List</h1>
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
              placeholder="Add your next task"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            />
            <button
              type="button"
              onClick={addTodo}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Add
            </button>
          </div>
        </section>

        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stats.completed}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stats.pending}</p>
          </div>
        </section>

        <section className="space-y-3">
          {loading ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-center text-slate-400">
              Loading tasks...
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/70 p-6 text-center text-slate-500">
              No tasks yet. Add your first task to begin.
            </div>
          ) : (
            todos.map((item) => (
              <article
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(item.id)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-medium transition ${item.completed ? "border-slate-600 text-slate-400" : "border-slate-700 text-slate-200 hover:border-slate-500"}`}
                >
                  {item.completed ? "✓" : "○"}
                </button>
                <p className={`flex-1 text-sm leading-6 ${item.completed ? "text-slate-500 line-through" : "text-white"}`}>
                  {item.text}
                </p>
                <button
                  type="button"
                  onClick={() => removeTodo(item.id)}
                  className="rounded-2xl px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800"
                >
                  Remove
                </button>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
