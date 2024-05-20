import EventsList from "../Home/EventsList";
import EventsMap from "../Home/EventsMap";

export default function HomeLayout() {
  return (
    <div className="grid grid-cols-12 h-full">
      <EventsList />
      <EventsMap />
    </div>
  );
}
