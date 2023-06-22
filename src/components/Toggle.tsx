import { useState } from "react";
const { ipcRenderer } = window.require("electron");

const Toggle = ({ id, isActive }: { id: number; isActive: boolean }) => {
  const [active, setActive] = useState(isActive);
  const changeAlarmStatus = () => {
    ipcRenderer.send("update-alarm-status", id, !active);
    ipcRenderer.on(
      "update-alarm-status-response",
      (_event: any, success: boolean) => {
        if (success) {
          setActive(!active);
        }
      }
    );
  };

  return (
    <div
      onClick={() => changeAlarmStatus()}
      className={`relative w-14 h-8 ${
        active ? "bg-emerald-300" : "bg-purple-300"
      } rounded-full cursor-pointer`}
    >
      <div
        className={`bg-white rounded-full h-8 w-8 absolute ${
          active ? "left-6 border-emerald-500" : "left-0 border-purple-500"
        }  border transition-all duration-150 ease-in`}
      ></div>
    </div>
  );
};

export default Toggle;
