import DeleteAlarmButton from "./DeleteAlarmButton";
import Toggle from "./Toggle";

const { ipcRenderer } = window.require("electron");

const AlarmFrame = ({ alarm }: { alarm: AlarmsProps }) => {
  return (
    <div className="relative flex flex-col justify-between w-full h-40 p-2 border shadow-inner rounded-xl bg-gray-50">
      <div
        onClick={() => ipcRenderer.send("remove-alarm", alarm.id)}
        className="absolute text-purple-500 transition-all duration-100 top-2 right-2 hover:text-red-500"
      >
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

export default AlarmFrame;
