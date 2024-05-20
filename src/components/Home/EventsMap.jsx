import { useEffect, useState } from "react";
import { AddressAutofill, config } from "@mapbox/search-js-react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapSearch({
  longitude: propLongitude,
  latitude: propLatitude,
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

  const [address, setAddress] = useState({
    address: "",
    unit: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  function handleAddressChange(evt) {
    setAddress({ ...address, [evt.target.name]: evt.target.value });
  }

  const token =
    "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";

  useEffect(() => {
    config.accessToken = token;
  }, [token]);

  async function handleSelect(evt) {
    evt.preventDefault();

    console.log("Address:", address); // Debugging log

    const fullAddress = `${address.address} ${address.unit} ${address.city} ${address.state} ${address.country} ${address.postcode}`;

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
          evt.target.reset();
        } else {
          alert("Coordinates not found in the response.");
        }
      } else {
        alert("Address not found");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Error fetching geocoding data");
    }
  }

  return (
    <div className="col-span-8 h-full w-full">
      <div className="relative w-full h-full">
        <div className="absolute w-full p-4 z-10">
          <form
            className="h-full w-full bg-white-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-zinc-950 border-opacity-20 p-4"
            style={{ maxWidth: "400px", marginLeft: "auto" }}
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
                  className="w-full mb-4 relative block appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border border-white/10 data-[hover]:border-white/20 bg-white/5 focus:outline-none"
                />
              </AddressAutofill>
            </div>

            <input
              name="unit"
              placeholder="Unit number"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-line2"
              className="mb-2 p-2 border rounded w-full"
            />

            <input
              name="city"
              placeholder="City"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-level2"
              className="mb-2 p-2 border rounded w-full"
            />

            <input
              name="state"
              placeholder="State"
              type="text"
              onChange={handleAddressChange}
              autoComplete="address-level1"
              className="mb-2 p-2 border rounded w-full"
            />

            <input
              name="country"
              placeholder="Country"
              type="text"
              onChange={handleAddressChange}
              autoComplete="country"
              className="mb-2 p-2 border rounded w-full"
            />

            <input
              name="postcode"
              placeholder="Postcode"
              type="text"
              onChange={handleAddressChange}
              autoComplete="postal-code"
              className="mb-2 p-2 border rounded w-full "
            />

            <div className="flex flex-end w-full">
              <input
                type="submit"
                value="Submit"
                className="w-1/4 p-2 bg-blue-500 text-white rounded"
              />
            </div>
          </form>
        </div>
        <div className="w-full h-full">
          {propLongitude && propLatitude && (
            <Map
              mapboxAccessToken={token}
              viewState={viewport}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              style={{ width: "100%", height: "100%" }}
            >
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </Marker>
            </Map>
          )}
        </div>
      </div>
    </div>
  );
}
