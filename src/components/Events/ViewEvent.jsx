import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as EventsService from "../../utilities/events-api";
import * as UserEventsService from "../../utilities/user-events-service";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventTypeIcon from "./EventTypeIcon";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function ViewEvent({ user }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [timelineModalIsOpen, setTimelineModalIsOpen] = useState(false);
  const history = useNavigate();
  const [isLoadingDelete, setIsLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [timelineEvent, setTimelineEvent] = useState({
    datetime: "",
    title: "",
    description: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function openTimelineModal() {
    setTimelineModalIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeTimelineModal() {
    setTimelineModalIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#27272A",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
    },
  };

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#27272A",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      width: "40%",
      height: "48%",
    },
  };

  async function getEvent() {
    const event = await EventsService.getOneEvent(id);
    setEvent(event);
  }

  useEffect(() => {
    getEvent();
  }, [id]);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await UserEventsService.deleteUserEvent(id);
      toast.info("Waiting for event to be deleted...", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        icon: false,
        onClose: () => {
          history("/");
        },
      });
    } catch {
      console.log("Error deleting event");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTimelineEvent() {
    if (!timelineEvent.time || !timelineEvent.notes) {
      toast.error("Please fill out all fields", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    try {
      await UserEventsService.addEventTimeline(id, timelineEvent);
      toast.success("Timeline event added successfully!", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      setTimelineModalIsOpen(false);
      setTimelineEvent({ time: "", notes: "" });
      getEvent();
    } catch {
      toast.error("Error adding timeline event", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard");
  };

  if (!event)
    return (
      <div className="container flex justify-center align-center content-center p-4 mb-4 h-full w-full">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
      </div>
    );

  return (
    <div className="container mx-auto p-4 mb-4">
      <ToastContainer />
      <Link to="/">
        <button className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-8 flex justify-center gap-2 items-center">
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
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
          </Marker>
        </Map>

        <button
          onClick={handleCopyUrl}
          className="absolute top-4 right-4 text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4 flex justify-center"
        >
          Share
          <i className="las la-share-alt ml-2 mt-1"></i>
        </button>
      </div>

      {/* delete modal */}

      {user && user._id === event.user && (
        <div className="mb-8 flex justify-end gap-4">
          <button
            onClick={openModal}
            className="text-gray-200  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800  flex justify-center gap-2 items-center"
          >
            Delete Event
          </button>

          <Link to={`/events/${id}/edit`}>
            <button className="text-gray-200 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800  flex justify-center gap-2 items-center">
              Edit Event
            </button>
          </Link>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Event Modal"
      >
        <h2 className="text-2xl mb-4">
          Are you sure you want to delete this event?
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="text-gray-200  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800  flex justify-center gap-2 items-center"
          >
            {isLoadingDelete ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
            ) : (
              "Yes"
            )}
          </button>
          <button
            onClick={closeModal}
            className="text-gray-200 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800  flex justify-center gap-2 items-center"
          >
            No
          </button>
        </div>
      </Modal>

      {/* Add Timeline Event Modal */}
      <Modal
        isOpen={timelineModalIsOpen}
        onRequestClose={closeTimelineModal}
        style={customStyles2}
        contentLabel="Add Timeline Event Modal"
      >
        <h2 className="text-2xl mb-4">Add Event to Timeline</h2>
        <div className="flex flex-col gap-4">
          <Datetime
            className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            value={timelineEvent.time}
            onChange={(date) =>
              setTimelineEvent({ ...timelineEvent, time: date })
            }
          />
          <input
            type="text"
            className="w-full block rounded-lg px-4 py-2 text-base placeholder-zinc-500 text-gray-200 border border-white/10 bg-white/5 focus:outline-none"
            placeholder="Title"
            value={timelineEvent.notes}
            onChange={(e) =>
              setTimelineEvent({ ...timelineEvent, notes: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTimelineEvent}
              className="text-gray-200 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Add
            </button>
            <button
              onClick={closeTimelineModal}
              className="text-gray-200 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col gap-2 w-full mb-8 rounded-md bg-clip-padding border border-opacity-20 p-4 bg-zinc-800 border-r border-zinc-600">
        <div className="">
          <EventTypeIcon type={event.eventType.type} />
          <p className="text-gray-400 mt-2">
            {event.address} {event.city} {event.state}, {event.country}{" "}
            {event.zip}
          </p>
          <h1 className="text-3xl font-bold text-gray-200 mt-2">
            {event.title}
          </h1>
          <div className="flex justify-between w-full mt-2">
            <div className="flex justify-start"></div>
            <p className="text-gray-500 mb-2 text-sm">
              Reported on:{" "}
              {new Date(event.reportDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        {event.description && (
          <h2 className="text-2xl font-bold text-gray-200 mt-2">Summary</h2>
        )}
        {event.description && (
          <p className="text-gray-200 mb-4">{event.description}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-4 w-full mb-12 rounded-md bg-clip-padding border border-opacity-20 p-4 bg-zinc-800 border-r border-zinc-600">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-200 mt-2">Timeline</h2>
          {
            user && user._id === event.user && (
              <button
                onClick={openTimelineModal}
                className="mt-2 text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4 flex justify-center"
              >
                Add Event to Timeline
              </button>
            )

          }
        </div>
        {event.incidentTimeline.length > 0 ? (
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {event.incidentTimeline.map((timelineEvent) => (
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3  rounded-full mt-1.5 -start-1.5 border  border-gray-900 bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                  {new Date(timelineEvent.time).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </time>
                <h3 className="text-lg font-semibold text-gray-200">
                  {timelineEvent.notes}
                </h3>
              </li>
            ))}

            <li className="mb-10 ms-4">
              <div className="absolute w-2 h-2  mb-1.5 -start-1 border  border-gray-900 bg-gray-700"></div>
            </li>
          </ol>
        ) : (
          <p className="text-gray-400">This event does not have a timeline.</p>
        )}
      </div>
    </div>
  );
}
