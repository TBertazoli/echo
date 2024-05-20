import EventsList from "../Home/EventsList";
import EventsMap from "../Home/EventsMap";
import * as Reports from "../../utilities/reports-service";
import { useState, useEffect } from "react";

export default function HomeLayout({ longitude, latitude }) {
  const [reports, setReports] = useState([]);


  useEffect(() => {
    async function getReports() {
      const reports = await Reports.getAllReports();
      console.log(reports);
      setReports(reports);
    }
    getReports();
  }, []);

  console.log(reports);
  return (
    <div className="grid grid-cols-12 h-full">
      <EventsList />
      <EventsMap longitude={longitude} latitude={latitude} />
    </div>
  );
}
