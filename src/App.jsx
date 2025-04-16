// App.jsx
import React, { useEffect, useState, useRef } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import SettingsModal from "./components/SettingsModal";
import vid1 from "./assets/bg-video.mp4";
import vid2 from "./assets/vid2.mp4";
import vid3 from "./assets/vid3.mp4";
import vid4 from "./assets/vid4.mp4";
import vid5 from "./assets/vid5.mp4";
import vid6 from "./assets/vid6.mp4";
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
  const videoOptions = {
    Waterfall: vid1,
    Fireplace: vid2,
    Kaleidoscope: vid3,
    Nebula: vid4,
    Magic: vid5,
    Lights: vid6,
  };

  const [videoSource, setVideoSource] = useState(videoOptions.Waterfall);
  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (!newMuted) {
        // Play only after unmuting and user interaction
        audioRef.current
          ?.play()
          .catch((err) => console.warn("Audio play error:", err.message));
      } else {
        audioRef.current?.pause();
      }
      return newMuted;
    });
  };
  useEffect(() => {
    const audio = new Audio(aud);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const handleUserInteraction = () => {
      if (!isMuted) {
        audio
          .play()
          .catch((err) => console.warn("Audio play error:", err.message));
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      audio.pause();
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // useEffect(() => {
  //   if (!audioRef.current) {
  //     audioRef.current = new Audio(aud);
  //     audioRef.current.loop = true;
  //     audioRef.current.volume = volume;
  //     audioRef.current.muted = isMuted;
  //     audioRef.current.play();
  //     if (!isMuted) {
  //       // Try to play on interaction
  //       audioRef.current
  //         .play()
  //         .catch((err) => console.warn("Audio play error:", err.message));
  //     }
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = volume;
  //     // audioRef.current.muted = isMuted;
  //   }
  // }, [volume]);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        key={videoSource}
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 items-end">
        <div className="flex gap-2">
          <button
            // onClick={() => setIsMuted((prev) => !prev)}
            onClick={handleMuteToggle}
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
        videoSource={videoSource}
        setVideoSource={setVideoSource}
        videoOptions={videoOptions}
      />
    </div>
  );
}
