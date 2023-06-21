import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

export default function TriggeredAlarm() {
  const music = new Audio("The Who - Baba Oriley.mp3");
  const [musicOn, setMusicOn] = useState(false);
  useEffect(() => {
    if (!musicOn) {
      music.play();
      setMusicOn(true);
    }
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");

  return (
    <div className="flex flex-col w-screen h-screen p-4 justify-between overflow-hidden">
      <div className="w-full text-purple-500 flex flex-row justify-between items-center">
        <p className="text-2xl ">{title ? title : "Title"}</p>
        <AlarmIcon />
      </div>
      <button
        onClick={() => ipcRenderer.send("close-window")}
        className="p-4 font-bold text-white rounded bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-700"
      >
        Snooze
      </button>
    </div>
  );
}

const AlarmIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 animate-pulse"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
