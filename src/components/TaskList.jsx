// components/TaskList.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input.trim(), done: false }]);
      setInput("");
    }
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-3 text-white dark:text-white">Today's Tasks</h2>

      <div className="flex items-center mb-4">
        <input
          className="flex-1 p-2 rounded bg-white/20 backdrop-blur text-white placeholder-white/70 focus:outline-none"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="ml-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded"
        >
          +
        </button>
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {tasks.map((task, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              className="flex items-center justify-between bg-white/10 backdrop-blur-sm px-3 py-2 rounded text-white"
            >
              <button onClick={() => toggleDone(i)} className="flex items-center gap-2">
                {task.done ? (
                  <CheckCircle className="text-green-300" size={20} />
                ) : (
                  <Circle className="text-white/60" size={20} />
                )}
                <span className={task.done ? "line-through opacity-60" : ""}>
                  {task.text}
                </span>
              </button>
              <button onClick={() => removeTask(i)}>
                <Trash2 className="text-red-300 hover:text-red-400" size={18} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
