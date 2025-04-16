// components/Timer.jsx
import React, { useEffect, useState } from "react";
import ProgressRing from "./ProgressRing";

export default function Timer({ durations, resetSignal, onReset }) {
  const focusDuration = durations.focus * 60;
  const breakDuration = durations.break * 60;

  const [time, setTime] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [sessions, setSessions] = useState(0);

  const total = isFocus ? focusDuration : breakDuration;
  const progress = 1 - time / total;

  const bellSound = new Audio("/assets/bell.wav");

  useEffect(() => {
    setTime(isFocus ? focusDuration : breakDuration);
    setIsRunning(false);
  }, [resetSignal, isFocus, focusDuration, breakDuration]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          bellSound.play();
          setIsFocus(!isFocus);
          if (isFocus) setSessions((s) => s + 1);
          return isFocus ? breakDuration : focusDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isFocus, focusDuration, breakDuration]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-4">
        <ProgressRing radius={96} stroke={8} progress={progress} />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
          {minutes}:{seconds}
        </div>
      </div>

      {/* Start/Pause + Reset Buttons Side-by-Side */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 text-lg bg-white/20 hover:bg-white/30 rounded-xl"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-2 text-lg bg-white/20 hover:bg-white/30 rounded-xl"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 text-sm text-white/80">
        Sessions Completed: <span className="font-medium">{sessions}</span>
      </div>
    </div>
  );
}
