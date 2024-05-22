import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import { AddressAutofill, config } from "@mapbox/search-js-react";
import * as Events from "../../utilities/user-events-service";
import * as EventTypes from "../../utilities/eventType-service";

const CreateEvent = ({ onEventCreated }) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    address: "",
    latitude: null,
    longitude: null,
    city: "",
    state: "",
    country: "",
    zip: "",
    description: "",
    reportDate: "",
    mediaUrl: "",
    eventType: "",
  });

  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      const types = await EventTypes.getEventType();
      setEventTypes(types);
    };
    fetchEventTypes();
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    zoom: 12,
  });

  const [marker, setMarker] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const token =
    "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";
  config.accessToken = token;

  const handleAddressChange = (evt) => {
    setEventDetails({ ...eventDetails, [evt.target.name]: evt.target.value });
  };

  const handleSelectAddress = async (evt) => {
    evt.preventDefault();
    const fullAddress = `${eventDetails.address}, ${eventDetails.city}, ${eventDetails.state}, ${eventDetails.country}, ${eventDetails.zip}`;
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
        const place = feature.place_name;

        // Parsing address components
        const addressComponents = feature.context.reduce((acc, component) => {
          if (component.id.includes("place")) acc.city = component.text;
          if (component.id.includes("region")) acc.state = component.text;
          if (component.id.includes("country")) acc.country = component.text;
          if (component.id.includes("postcode")) acc.zip = component.text;
          return acc;
        }, {});

        setEventDetails({
          ...eventDetails,
          latitude,
          longitude,
          address: place,
          ...addressComponents,
        });
        setViewport({ ...viewport, latitude, longitude });
        setMarker({ latitude, longitude });
      } else {
        alert("Address not found");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Error fetching geocoding data");
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await Events.createEvent(eventDetails);
      if (response.ok) {
        const newEvent = await response.json();
        onEventCreated(newEvent);
        alert("Event created successfully");
      } else {
        alert("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-12">
      <Link to="/">
        <button className="rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">
          <i className="las la-arrow-left"></i> Back
        </button>
      </Link>
      <h1 className="text-3xl font-semibold text-white pt-8 mb-4">
        Create Event
      </h1>
      <div>
        <div>
          <form
            className="flex flex-col gap-4 w-full mb-12 rounded-md p-4 bg-zinc-800 border border-zinc-600"
            onSubmit={handleSubmit}
          >
            <input
              name="title"
              placeholder="Title"
              value={eventDetails.title}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />
            <AddressAutofill accessToken={token}>
              <input
                name="address"
                placeholder="Address"
                value={eventDetails.address}
                onChange={handleAddressChange}
                autoComplete="address-line1"
                required
                className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
              />
            </AddressAutofill>

            <button
              type="button"
              onClick={handleSelectAddress}
              className="w-full block rounded-lg px-4 py-2 text-base text-white bg-blue-500 border border-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Autofill Address
            </button>

            <div>
              <Map
                mapboxAccessToken={token}
                viewState={viewport}
                onMove={(evt) => setViewport(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                style={{ width: "100%", height: "300px" }}
              >
                {marker.latitude && marker.longitude && (
                  <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </Marker>
                )}
              </Map>
            </div>
            <input
              name="city"
              placeholder="City"
              value={eventDetails.city}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="state"
              placeholder="State"
              value={eventDetails.state}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="country"
              placeholder="Country"
              value={eventDetails.country}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={eventDetails.zip}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={eventDetails.description}
              onChange={handleAddressChange}
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />

            <select
              name="eventType"
              value={eventDetails.eventType}
              onChange={handleAddressChange}
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            <input
              name="reportDate"
              type="date"
              placeholder="Report Date"
              value={eventDetails.reportDate}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-white border border-white/10 bg-white/5 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full block rounded-lg px-4 py-2 text-base text-white bg-blue-500 border border-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
