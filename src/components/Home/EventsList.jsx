import React from "react";
import { Link } from "react-router-dom";
export default function EventsList({
  reports,
  selectedEvent,
  setSelectedEvent,
}) {
  function handleClick(event) {
    setSelectedEvent(event);
  }

  function handleCreateEvent() {
    // push to create event page
    // test
  }
  return (
    <div className="col-span-4 relative bg-zinc-900 border-r border-zinc-800 overflow-scroll">
      <div className="sticky top-0 flex justify-between bg-zinc-900 ">
        <h1 className="text-white text-2xl font-semibold p-4 sticky top-0 ">
          Events
        </h1>

        {/* create events buttons */}
        <div className="flex items-center p-4">
          <Link to="/create-event">
            <button className="rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border bg-blue-500 border-blue-600 data-[hover]:border-blue-700 bg-blue hover:bg-blue-700 focus:outline-none cursor-pointer">
              Create Event
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-scroll max-h-full">
        {reports.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4 border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer"
            onClick={() => handleClick(event)}
          >
            <div>
              <h2 className="text-white font-semibold">{event.title}</h2>
              <p className="text-gray-400 text-sm">{event.address}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm mt-12">
                {new Date(event.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="flex items-center justify-center h-full mt-8">
            <p className="text-gray-400">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
