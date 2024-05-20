import EventsList from "../Home/EventsList";
import EventsMap from "../Home/EventsMap";

export default function HomeLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 bg-gray-200">
        <EventsList />
      </div>
      <div className="col-span-8 bg-gray-100">
        <EventsMap />
      </div>
    </div>
  );
}
