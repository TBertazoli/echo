import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import { AddressAutofill, config } from "@mapbox/search-js-react";
import * as Events from "../../utilities/user-events-service"

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
  });

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
    const fullAddress = `${eventDetails["address address-search"]}, ${eventDetails.city}, ${eventDetails.state}, ${eventDetails.country}, ${eventDetails.zip}`;
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
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });
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
        <button className="rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border bg-blue-500 border-blue-600 data-[hover]:border-blue-700 bg-blue hover:bg-blue-700 focus:outline-none cursor-pointer">
          <i className="las la-arrow-left"></i> Back
        </button>
      </Link>
      <h1 className="text-3xl font-semibold text-white pt-8 mb-4">
        Create Event
      </h1>
      <div>
        <div>
          <form
            className="flex flex-col gap-4 w-full mb-12 rounded-md bg-clip-padding border border-opacity-20 p-4 bg-zinc-800 border-r border-zinc-600"
            onSubmit={handleSubmit}
          >
            <input
              name="title"
              placeholder="Title"
              value={eventDetails.title}
              onChange={handleAddressChange}
              required
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <AddressAutofill accessToken={token}>
              <input
                name="address"
                placeholder="Address"
                onInput={handleAddressChange}
                autoComplete="address-line1"
                required
                className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
              />
            </AddressAutofill>

            <button
              type="button"
              onClick={handleSelectAddress}
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-white bg-blue-500 border border-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
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
                    offsetLeft={-20}
                    offsetTop={-10}
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
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <input
              name="state"
              placeholder="State"
              value={eventDetails.state}
              onChange={handleAddressChange}
              required
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <input
              name="country"
              placeholder="Country"
              value={eventDetails.country}
              onChange={handleAddressChange}
              required
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={eventDetails.zip}
              onChange={handleAddressChange}
              required
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={eventDetails.description}
              onChange={handleAddressChange}
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />
            <input
              name="reportDate"
              type="date"
              placeholder="Report Date"
              value={eventDetails.reportDate}
              onChange={handleAddressChange}
              required
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
            />

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-500 border-dashed rounded-lg cursor-pointer bg-zinc-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              className="w-full relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-white bg-blue-500 border border-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
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
