import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal({
  isOpen,
  onClose,
  durations,
  setDurations,
  videoSource,
  setVideoSource,
  videoOptions,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDurations((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/10 p-6 rounded-2xl shadow-lg w-full max-w-md text-white"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold mb-4">Settings</h2>

            {/* Focus Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Focus Duration (min)
              </label>
              <input
                type="number"
                name="focus"
                value={durations.focus}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
              />
            </div>

            {/* Break Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Break Duration (min)
              </label>
              <input
                type="number"
                name="break"
                value={durations.break}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
              />
            </div>

            {/* Background Video Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Background Video
              </label>
              <select
                value={Object.keys(videoOptions).find(
                  (key) => videoOptions[key] === videoSource
                )} // Select the correct key
                onChange={(e) => setVideoSource(videoOptions[e.target.value])}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
              >
                {Object.entries(videoOptions).map(([key, url]) => (
                  <option key={key} value={key} className="text-black">
                    {key}
                  </option>
                ))}
              </select>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
