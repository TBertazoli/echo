import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddressAutofill, config } from "@mapbox/search-js-react";
import * as Events from "../../utilities/user-events-service";
import * as EventTypes from "../../utilities/eventType-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  // check if id exists in the url
  console.log("create event");
  const { id } = useParams();
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

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const [eventTypes, setEventTypes] = useState([]);
  const [disabledFields, setDisabledFields] = useState({
    address: false,
    city: false,
    state: false,
    country: false,
    zip: false,
  });

  useEffect(() => {
    const fetchEventTypes = async () => {
      const types = await EventTypes.getEventType();
      setEventTypes(types);
    };
    fetchEventTypes();
  }, []);

  const [viewport, setViewport] = useState(null);

  const [marker, setMarker] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const [image, setImage] = useState(null);

  const token =
    "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";
  config.accessToken = token;

  useEffect(() => {
    async function getEvent() {
      const event = await Events.getOneUserEvent(id);
      setEventDetails(event);
    }
    if (id) {
      getEvent();
    }
  }, [id]);

  useEffect(() => {
    if (eventDetails.latitude && eventDetails.longitude) {
      setViewport({
        latitude: eventDetails.latitude,
        longitude: eventDetails.longitude,
        zoom: 15,
      });
      setMarker({
        latitude: eventDetails.latitude,
        longitude: eventDetails.longitude,
      });
    } else {
      setViewport({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 15,
      });
      setMarker({
        latitude: 37.7749,
        longitude: -122.4194,
      });
    }
  }, [eventDetails]);

  useEffect(() => {
    if (id && eventDetails.eventType) {
      setEventDetails({
        ...eventDetails,
      });
    }
  }, [id, eventDetails.reportDate]);

  const handleAddressChange = (evt) => {
    if (evt.target.id === "address") {
      setEventDetails({
        ...eventDetails,
        [evt.target.name.split(" ")[0]]: evt.target.value,
      });
    } else {
      setEventDetails({ ...eventDetails, [evt.target.name]: evt.target.value });
    }
  };

  function clearAddressFields() {
    setEventDetails({
      ...eventDetails,
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    });
  }

  const handleSelectAddress = async (evt) => {
    evt.preventDefault();

    const inputFields = ["address", "city", "state", "country", "zip"];

    for (let field of inputFields) {
      if (eventDetails[field]) {
        handleAddressChange({
          target: { name: field, value: eventDetails[field] },
        });
      }
    }
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
        toast.error("Invalid Address", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          icon: false,
        });
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      toast.error("Error fetching geocoding data");
    }
  };

  const handleSubmit = async (evt) => {
    setIsLoaded(true);
    evt.preventDefault();
    try {
      if (id) {
        console.log(image);
        setEventDetails({ ...eventDetails, mediaUrl: image });
        await Events.updateUserEvent(id, eventDetails);

        toast.info("Updating your event", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          icon: false,
          onClose: () => navigate("/events/" + id),
        });
        return;
      } else {
        let response = await Events.createEvent(eventDetails);
        const formData = new FormData();
        formData.append("file", image);
        if (response.signedUrl) {
          const image = {
            method: "PUT",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
          };
          const resutl = await fetch(response.signedUrl, image);
          console.log(resutl);
        }

        toast.info("Creating your event", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          icon: false,
          onClose: () => navigate("/events/" + response.event._id),
        });
      }
    } catch (error) {
      toast.error("Error creating event", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        icon: false,
      });
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-12">
      <ToastContainer />
      <Link to={id ? "/events/" + id : "/"}>
        <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
          <i className="las la-arrow-left"></i> Back
        </button>
      </Link>
      <h1 className="text-3xl font-semibold text-gray-200 pt-8 mb-4">
        {id ? "Edit Event Details" : "Create Event"}
      </h1>
      <div>
        <div>
          <form
            className="flex flex-col gap-4 w-full mb-12 rounded-md p-4 bg-zinc-800 border border-zinc-600 pt-8  pb-8"
            onSubmit={handleSubmit}
          >
            <label className="text-gray-200 text-left">Event Title</label>
            <input
              name="title"
              placeholder="Title"
              value={eventDetails.title}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />

            <label className="text-gray-200 text-left">Location details</label>
            <AddressAutofill accessToken={token}>
              <input
                name="address"
                id="address"
                placeholder="Address"
                onChange={handleAddressChange}
                autoComplete="address-line1"
                value={eventDetails.address}
                disabled={disabledFields.address}
                required
                className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
              />
            </AddressAutofill>
            <input
              name="city"
              placeholder="City"
              value={eventDetails.city}
              onChange={handleAddressChange}
              disabled={disabledFields.city}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="state"
              placeholder="State"
              value={eventDetails.state}
              onChange={handleAddressChange}
              disabled={disabledFields.state}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="country"
              placeholder="Country"
              value={eventDetails.country}
              onChange={handleAddressChange}
              disabled={disabledFields.country}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={eventDetails.zip}
              onChange={handleAddressChange}
              disabled={disabledFields.zip}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />
            <span
              onClick={clearAddressFields}
              className="text-blue-500 cursor-pointer text-right"
            >
              Clear Address Fields
            </span>
            <button
              type="button"
              onClick={handleSelectAddress}
              className="w-full text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"
            >
              Verify Address
            </button>
            <div>
              <Map
                mapboxAccessToken={token}
                viewState={viewport}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "0.5rem",
                }}
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
            {
              // image preview
              image ? (
                <div className="flex justify-center p-4 w-full bg-zinc-800 border border-zinc-600 rounded-lg">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="event"
                    className="w-40 h-20 object-cover rounded-lg"
                  />
                </div>
              ) : (
                ""
              )
            }

            <>
              <label className="text-gray-200 text-left">Media Upload</label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
            </>

            <label className="text-gray-200 text-left">Event Description</label>
            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={eventDetails.description}
              onChange={handleAddressChange}
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />

            <label className="text-gray-200 text-left">Event Type</label>
            <select
              name="eventType"
              onChange={handleAddressChange}
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.type}
                </option>
              ))}
            </select>

            <label className="text-gray-200 text-left">Report Date</label>
            <input
              name="reportDate"
              type="date"
              placeholder="Report Date"
              value={eventDetails.reportDate}
              onChange={handleAddressChange}
              required
              className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex justify-center"
            >
              {isLoaded ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : id ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
