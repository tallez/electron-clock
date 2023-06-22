import React, { FormEvent } from "react";
const { ipcRenderer } = window.require("electron");

export default function AddAlarm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore // Typescript doesn't accept the form to have title.value or time.value
    ipcRenderer.send("create-alarm", e.target.title.value, e.target.time.value);
  };
  return (
    <div className="w-screen h-screen p-4">
      <div className="flex flex-col mt-8">
        <div className="font-sans text-2xl font-extralight text-purple-500">
          Add Alarm
        </div>
        <hr className="my-2"></hr>
        <div className="w-full flex justify-center border rounded my-10 py-4">
          <form
            className="flex flex-col py-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="text-xl text-purple-500"> Title </label>
            <input
              className="shadow-inner border"
              name="title"
              type="text"
              required
            ></input>
            <label className="text-xl text-purple-500"> Time </label>
            <input
              className="shadow-inner border px-2"
              name="time"
              type="time"
              required
            ></input>
            <button
              className="my-4 rounded bg-purple-400 hover:bg-purple-500 font-bold text-white cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
