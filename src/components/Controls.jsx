// components/Controls.jsx
import React from "react";

export default function Controls({ openSettings }) {
  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={openSettings}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl"
      >
        Settings
      </button>
    </div>
  );
}
