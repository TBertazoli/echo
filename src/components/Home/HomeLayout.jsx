import EventsList from "../Home/EventsList";
import EventsMap from "../Home/EventsMap";
import * as Reports from "../../utilities/events-service";
import { useState, useEffect } from "react";

export default function HomeLayout({ longitude, latitude }) {
  const [reports, setReports] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function getReports() {
      const reports = await Reports.getAllEvents();
      console.log(reports);
      setReports(reports);
    }
    getReports();
  }, []);

  console.log(reports);
  return (
    <div className="grid grid-cols-12 h-full overflow-hidden" style={{
      maxHeight: "100vh",
    }}>
      <EventsList reports={reports} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
      <EventsMap longitude={longitude} latitude={latitude} reports={reports} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
    </div>
  );
}
