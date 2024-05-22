import React from "react";
import { Link } from "react-router-dom";
import EventTypeIcon from "../Events/EventTypeIcon";
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
    <div className="col-span-4 relative bg-zinc-900 border-r border-zinc-800 overflow-scroll ">
      <div>
        <div className="sticky top-0 flex justify-between bg-zinc-900">
          <h1 className="text-white text-2xl font-semibold p-4 sticky top-0 ">
            Events
          </h1>

          {/* create events buttons */}
          <div className="flex items-center p-4 pb-2">
            <Link to="/create-event">
              <button className="rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border bg-blue-500 border-blue-600 data-[hover]:border-blue-700 bg-blue hover:bg-blue-700 focus:outline-none cursor-pointer">
                Create Event
              </button>
            </Link>
          </div>
        </div>
        <span className="text-zinc-700 text-xs p-4 block text-right">
          Scroll ↓
        </span>
      </div>

      <div className="overflow-scroll max-h-full border-t border-zinc-800">
        {reports.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4 border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer"
            onClick={() => handleClick(event)}
          >
            <div className="mb-8">
              <h2
                className="text-white font-semibold mb-2  truncate"
                style={{ maxWidth: "250px" }}
              >
                {" "}
                {event.title}
              </h2>
              <p
                className="text-gray-400 text-sm mb-8"
                style={{ maxWidth: "250px" }}
              >
                {event.address}
              </p>
            </div>

            <div className="mt-12">
              <EventTypeIcon type={event.eventType.type} />
              <p className="text-gray-400 text-xs  mt-2 font-semibold">
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
