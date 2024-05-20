import EventsList from "../Home/EventsList";
import EventsMap from "../Home/EventsMap";

export default function HomeLayout({ longitude, latitude}) {
  return (
    <div className="grid grid-cols-12 h-full">
      <EventsList />
      <EventsMap longitude={longitude} latitude={latitude} />
    </div>
  );
}
