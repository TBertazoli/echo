import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as EventsService from "../../utilities/events-api";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventTypeIcon from "./EventTypeIcon";

export default function ViewEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function getEvent() {
      const event = await EventsService.getOneEvent(id);
      setEvent(event);
    }
    getEvent();
  }, [id]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard");
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 mb-4">
      <Link to="/">
        <button className="rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border bg-blue-500 border-blue-600 data-[hover]:border-blue-700 bg-blue hover:bg-blue-700 focus:outline-none cursor-pointer">
          <i className="las la-arrow-left"></i> Back
        </button>
      </Link>
      <div className="relative w-full h-96 mb-8 mt-8 rounded-md">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA"
          initialViewState={{
            latitude: event.latitude,
            longitude: event.longitude,
            zoom: 13,
          }}
          style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          <Marker
            latitude={event.latitude}
            longitude={event.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <span className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500"></span>
            </span>
          </Marker>
        </Map>
        <button
          onClick={handleCopyUrl}
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Share
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full mb-12 rounded-md bg-clip-padding border border-opacity-20 p-4 bg-zinc-800 border-r border-zinc-600">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold mb-2 text-white">{event.title}</h1>

          <EventTypeIcon
            type={event.eventType.type}
          />
        </div>

        <p className="text-gray-400 mb-2">{event.address}</p>
        <span className="text-gray-400 mb-2">
          {event.city}, {event.state}, {event.country} {event.zip}
        </span>
        <p className="text-gray-600 mb-2">
          Reported on:{" "}
          {new Date(event.reportDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {event.description && (
          <p className="text-white mb-4">{event.description}</p>
        )}
        {event.mediaUrl && (
          <img
            src={event.mediaUrl}
            alt="Event media"
            className="w-full h-auto rounded-lg shadow-md"
          />
        )}
      </div>
    </div>
  );
}
