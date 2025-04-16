// components/SettingsModal.jsx
import React, { useState } from "react";

export default function SettingsModal({ isOpen, onClose, durations, setDurations }) {
  const [focus, setFocus] = useState(durations.focus);
  const [breakTime, setBreak] = useState(durations.break);

  if (!isOpen) return null;

  const handleSave = () => {
    setDurations({ focus, break: breakTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-400 text-black rounded-xl p-6 w-[90%] max-w-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Customize Durations</h2>
        <label className="block mb-2">Focus Duration (mins)</label>
        <input
          type="number"
          value={focus}
          onChange={(e) => setFocus(Number(e.target.value))}
          className="w-full p-2 mb-4 rounded bg-gray-100"
        />
        <label className="block mb-2">Break Duration (mins)</label>
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreak(Number(e.target.value))}
          className="w-full p-2 mb-4 rounded bg-gray-100"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
