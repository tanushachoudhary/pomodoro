// App.jsx
import React, { useEffect, useState, useRef } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import SettingsModal from "./components/SettingsModal";
import vid from "./assets/bg-video.mp4";
import aud from "./assets/ambient.mp3";
import TaskList from "./components/TaskList";

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [durations, setDurations] = useState({ focus: 25, break: 5 });
  const [showTasks, setShowTasks] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handleReset = () => setResetSignal((prev) => prev + 1);
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(aud);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.play();
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src={vid} type="video/mp4" />
      </video>

      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 items-end">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-white"
          />

          <button
            onClick={() => setShowTasks(!showTasks)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm"
          >
            {showTasks ? "Hide Tasks" : "Show Tasks"}
          </button>
          
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-full w-full bg-black/40">
        {/* Timer & Controls */}
        <div className="flex flex-col justify-center items-center flex-1 text-center px-4 transition-all duration-300">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Focus</h1>
          <Timer
            durations={durations}
            resetSignal={resetSignal}
            onReset={handleReset}
          />
          <Controls openSettings={() => setIsSettingsOpen(true)} />
        </div>

        {/* Task List */}
        {showTasks && (
          <div className="w-full max-w-sm pr-6 py-6 hidden md:block transition-all duration-300">
            <TaskList />
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        durations={durations}
        setDurations={setDurations}
      />
    </div>
  );
}
