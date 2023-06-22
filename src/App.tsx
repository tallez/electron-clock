import { useEffect, useState } from "react";
import AddAlarmButton from "./components/AddAlarmButton";
import AlarmFrame from "./components/AlarmFrame";
const { ipcRenderer } = window.require("electron");

function App() {
  const [alarms, setAlarms] = useState<AlarmsProps[]>([]);
  const [currentTime, setCurrentTime] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Get current time
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);

      // Retrieve alarms from database
      ipcRenderer.send("retrieve-data");
      ipcRenderer.on(
        "retrieve-data-response",
        (_event: any, data: AlarmsProps[]) => {
          setAlarms(data);
        }
      );
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-4 pt-8 pb-2 font-sans text-2xl text-white shadow-lg bg-gradient-to-l from-purple-500 to-purple-600 font-extralight">
          <div className="flex flex-row items-center space-x-2">
            <p>Alarms</p>
            <div onClick={() => ipcRenderer.send("open-setalarm-window")}>
              <AddAlarmButton />
            </div>
          </div>
          <p className="font-bold">{currentTime}</p>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          {alarms.map((al: AlarmsProps, i: number) => {
            return <AlarmFrame key={i} alarm={al} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
