import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as eventService from "../../utilities/user-events-service";

export default function ProfilePage() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(function () {
    async function getUserEvents() {
      const events = await eventService.getUserEvents();
      setUserEvents(events);
    }
    getUserEvents();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>My Events</h2>
      <ul>
        {userEvents.map((event) => (
          <li key={event._id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
