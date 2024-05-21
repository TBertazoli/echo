export default function EventsList({
  reports,
  selectedEvent,
  setSelectedEvent,
}) {
  function handleClick(event) {
    setSelectedEvent(event);
  }
  return (
    <div className="col-span-4 relative bg-zinc-900 border-r border-zinc-800 max-h-full">
      <h1 className="text-white text-2xl font-semibold p-4 sticky top-0 bg-zinc-900">
        Events
      </h1>
      <div className="overflow-scroll">
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
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
