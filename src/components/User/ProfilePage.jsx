import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventTypeIcon from "../Events/EventTypeIcon";
import * as userEventService from "../../utilities/user-events-service";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AddressAutofill, config } from "@mapbox/search-js-react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState("");

  const placeholderEvents = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  async function fakeOneSecondDelay() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await fakeOneSecondDelay();
    }

    fetchData();

    async function getEvents() {
      const events = await userEventService.getUserEvents();
      setReports(events);
    }
    getEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="col-span-4 relative bg-zinc-900 border-r border-zinc-800 overflow-scroll">
        <div className="border-b border-zinc-800">
          <div className="sticky top-0 flex justify-between bg-zinc-900 ">
            <h1 className="text-gray-200 text-2xl font-semibold p-4 sticky top-0 mt-4 ">
              My Events
            </h1>

            {/* create events buttons */}
            <div className="flex items-center p-4 pb-2 ">
              <Link to="/create-event">
                <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center mt-4">
                  Create Event
                </button>
              </Link>
            </div>
          </div>
          <span className="text-zinc-700 text-xs block text-right p-4">
            Scroll ↓
          </span>
        </div>
        <div role="status" className="rounded shadow animate-pulse ">
          <div
            className="flex  justify-between p-4 border-b border-zinc-800 w-full"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gray-800 rounded-lg mr-4"></div>
              <div className="mt-2">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-4"></div>
                <div className="w-32 h-2.5 bg-gray-700 rounded-full"></div>
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mt-9"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="h-2.5 bg-gray-600 rounded-full ml-auto w-6 mb-3 mt-12"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>

              <div className="flex mt-24 gap-2">
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
              </div>
            </div>
          </div>

          <div
            className="flex  justify-between p-4 border-b border-zinc-800 w-full"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gray-800 rounded-lg mr-4"></div>
              <div className="mt-2">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-4"></div>
                <div className="w-32 h-2.5 bg-gray-700 rounded-full"></div>
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mt-9"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="h-2.5 bg-gray-600 rounded-full ml-auto w-6 mb-3 mt-12"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>

              <div className="flex mt-24 gap-2">
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
              </div>
            </div>
          </div>

          <div
            className="flex  justify-between p-4 border-b border-zinc-800 w-full"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gray-800 rounded-lg mr-4"></div>
              <div className="mt-2">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-4"></div>
                <div className="w-32 h-2.5 bg-gray-700 rounded-full"></div>
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mt-9"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="h-2.5 bg-gray-600 rounded-full ml-auto w-6 mb-3 mt-12"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>

              <div className="flex mt-24 gap-2">
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
              </div>
            </div>
          </div>

          <div
            className="flex  justify-between p-4 border-b border-zinc-800 w-full"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gray-800 rounded-lg mr-4"></div>
              <div className="mt-2">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-4"></div>
                <div className="w-32 h-2.5 bg-gray-700 rounded-full"></div>
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mt-9"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="h-2.5 bg-gray-600 rounded-full ml-auto w-6 mb-3 mt-12"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>

              <div className="flex mt-24 gap-2">
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
              </div>
            </div>
          </div>

          <div
            className="flex  justify-between p-4 border-b border-zinc-800 w-full"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gray-800 rounded-lg mr-4"></div>
              <div className="mt-2">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-4"></div>
                <div className="w-32 h-2.5 bg-gray-700 rounded-full"></div>
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mt-9"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="h-2.5 bg-gray-600 rounded-full ml-auto w-6 mb-3 mt-12"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>

              <div className="flex mt-24 gap-2">
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
                <div className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"></div>
              </div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-4 relative bg-zinc-900 border-r border-zinc-800 overflow-scroll ">
      <div>
        <div className="sticky top-0 flex justify-between bg-zinc-900">
          <h1 className="text-gray-200 text-2xl font-semibold p-4 sticky top-0 mt-4">
            My Events
          </h1>

          {/* create events buttons */}
          <div className="flex items-center p-4 pb-2">
            <Link to="/create-event">
              <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center mt-4">
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
            className="flex items-center justify-between p-6 border-b border-zinc-800"
          >
            <div className="flex gap-4">
              <div className="">
                <Map
                  mapboxAccessToken="pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA"
                  initialViewState={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                    zoom: 13,
                  }}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "0.5rem",
                  }}
                  mapStyle="mapbox://styles/mapbox/dark-v10"
                >
                  <Marker latitude={event.latitude} longitude={event.longitude}>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                    </span>
                  </Marker>
                </Map>
              </div>
              <div>
                <h2
                  className="text-gray-200 font-semibold mb-2 truncate"
                  style={{ maxWidth: "250px" }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-gray-400 text-xs mb-8 truncate"
                  style={{ maxWidth: "250px" }}
                >
                  {event.address}
                </p>
                <p className="text-gray-400 text-xs mt-8 font-semibold">
                  {event.city}, {event.state}, {event.country} {event.zipCode}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-end">
              {/* view and edit buttons */}

              <EventTypeIcon type={event.eventType.type} />
              <p className="text-gray-400 text-xs mt-2 font-semibold">
                {new Date(event.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>

              <div className="flex mt-24">
                <Link to={`/events/${event._id}`}>
                  <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center">
                    View Event
                  </button>
                </Link>
                <Link to={`/events/${event._id}/edit`}>
                  <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center">
                    Edit
                  </button>
                </Link>
              </div>
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
