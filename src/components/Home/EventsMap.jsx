import { useEffect, useState, useRef } from "react";
import { AddressAutofill, config } from "@mapbox/search-js-react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventTypeIcon from "../Events/EventTypeIcon";

import { Link } from "react-router-dom";

export default function EventsMap({
  longitude: propLongitude,
  latitude: propLatitude,
  reports,
  selectedEvent,
  setSelectedEvent,
}) {
  const [viewport, setViewport] = useState({
    latitude: propLatitude,
    longitude: propLongitude,
    zoom: 13,
  });
  const [marker, setMarker] = useState({
    latitude: propLatitude,
    longitude: propLongitude,
  });

  const isUserInitiated = useRef(false);

  useEffect(() => {
    setViewport({
      latitude: propLatitude,
      longitude: propLongitude,
      zoom: 13,
    });
    setMarker({
      latitude: propLatitude,
      longitude: propLongitude,
    });
  }, [propLongitude, propLatitude]);

  useEffect(() => {
    if (selectedEvent) {
      setViewport({
        latitude: selectedEvent.latitude,
        longitude: selectedEvent.longitude,
        zoom: 13,
      });
    }
  }, [selectedEvent]);

  const [address, setAddress] = useState({
    address: "",
    unit: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  function handleAddressChange(evt) {
    const { name, value } = evt.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  }

  const token =
    "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";

  useEffect(() => {
    config.accessToken = token;
  }, [token]);

  async function handleSelect(evt) {
    evt.preventDefault();

    const fullAddress = `${address["address address-search"]} ${address.unit} ${address.city} ${address.state} ${address.country} ${address.postcode}`;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          fullAddress
        )}.json?access_token=${token}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [longitude, latitude] = feature.center;

        if (latitude && longitude) {
          setViewport({
            latitude,
            longitude,
            zoom: 13,
          });
          setMarker({ latitude, longitude });
        } else {
          alert("Coordinates not found in the response.");
        }
      } else {
        alert("Please enter a valid address.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Error fetching geocoding data");
    }
  }

  const handleMarkerClick = (report) => {
    setSelectedEvent(report);
  };

  return (
    <div className="col-span-8 h-full w-full overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute w-full p-4 z-10">
          <form
            className="flex gap-2 h-full w-full bg-white-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-zinc-950 border-opacity-20 p-4"
            onSubmit={handleSelect}
          >
            <div style={{ width: "100%" }}>
              <AddressAutofill accessToken={token}>
                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleAddressChange}
                  type="text"
                  autoComplete="address-line1"
                  className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
                />
              </AddressAutofill>
            </div>

            <input
              name="unit"
              placeholder="Unit number"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-line2"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <input
              name="city"
              placeholder="City"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-level2"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <input
              name="state"
              placeholder="State"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-level1"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <input
              name="country"
              placeholder="Country"
              type="text"
              onChange={handleAddressChange}
              autoComplete="country"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <input
              name="postcode"
              placeholder="Postcode"
              type="text"
              onChange={handleAddressChange}
              autoComplete="postal-code"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <div className="flexw-full">
              <input
                type="submit"
                value="Submit"
                className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border bg-blue-500 border-blue-600 data-[hover]:border-blue-700 bg-blue hover:bg-blue-700 focus:outline-none cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div className="w-full h-full">
          {propLongitude && propLatitude && (
            <Map
              mapboxAccessToken={token}
              viewState={viewport}
              onMove={(evt) => {
                setTimeout(() => {
                  isUserInitiated.current = true;
                  setViewport(evt.viewState);
                }, 0);
              }}
              onMoveEnd={() => {
                isUserInitiated.current = false;
              }}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              style={{ width: "100%", height: "100%" }}
            >
              {reports.map((report) => (
                <Marker
                  key={report.id}
                  longitude={report.longitude}
                  latitude={report.latitude}
                  onClick={() => handleMarkerClick(report)}
                >
                  <span className="relative flex h-3 w-3 cursor-pointer">
                    {report.eventType.type === "Contruction" ||
                    report.eventType.type === "Traffic" ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                      </>
                    ) : (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </>
                    )}
                  </span>
                </Marker>
              ))}
              <Marker longitude={marker.longitude} latitude={marker.latitude}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </Marker>

              {selectedEvent && (
                <Popup
                  latitude={selectedEvent.latitude}
                  longitude={selectedEvent.longitude}
                  closeOnClick={true}
                  onClose={() => setSelectedEvent(null)}
                  offsetTop={-10}
                >
                  <div className="p-2">
                    <h2 className="text-white font-semibold text-lg mb-2 truncate">
                      {selectedEvent.title}
                    </h2>
                    <EventTypeIcon type={selectedEvent.eventType.type} />
                    <p className="text-gray-400 text-sm font-semibold">
                      {selectedEvent.address}
                    </p>

                    <p className="text-white text-sm mt-2 truncate">
                      {selectedEvent.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-xs mt-2">
                        {new Date(selectedEvent.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </p>
                      <Link to={`/events/${selectedEvent._id}`}>
                        <button className=" mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View Event
                        </button>
                      </Link>
                    </div>
                  </div>
                </Popup>
              )}
            </Map>
          )}
        </div>
      </div>
    </div>
  );
}
