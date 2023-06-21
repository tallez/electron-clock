import { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");

interface AlarmsProps {
  title: string;
  time: string;
  id: number;
  status: boolean;
}

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
        <div className="flex flex-row justify-between font-sans text-2xl text-white bg-gradient-to-l from-purple-500 to-purple-600 font-extralight pt-8 px-4 pb-2 shadow-lg">
          <div className="flex flex-row items-center space-x-2">
            <p>Alarms</p>
            <div>
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

const AlarmFrame = ({ alarm }: { alarm: AlarmsProps }) => {
  return (
    <div className="relative flex flex-col justify-between w-full h-40 p-2 border shadow-inner rounded-xl bg-gray-50">
      <div className="absolute text-purple-500 transition-all duration-100 top-2 right-2 hover:text-red-500">
        <DeleteAlarmButton />
      </div>
      <div className="py-2 text-4xl text-purple-500">
        {alarm.time}
        <p className="text-lg">{alarm.title}</p>
      </div>

      <Toggle id={alarm.id} isActive={alarm.status} />
    </div>
  );
};

const Toggle = ({ id, isActive }: { id: number; isActive: boolean }) => {
  const [active, setActive] = useState(isActive);
  const changeAlarmStatus = () => {
    setActive(!active);
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

const AddAlarmButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const DeleteAlarmButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 rotate-45 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default App;
