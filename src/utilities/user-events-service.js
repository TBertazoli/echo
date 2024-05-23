import * as userEventsAPI from "./user-events-api";

export async function createEvent(event) {
  return userEventsAPI.create(event);
}
export async function getUserEvents() {
  return userEventsAPI.getUserEvents();
}

export async function getOneUserEvent(id) {
  return userEventsAPI.getOneUserEvent(id);
}

export async function updateUserEvent(id, event) {
  return userEventsAPI.updateUserEvent(id, event);
}

export async function deleteUserEvent(id) {
  return userEventsAPI.deleteUserEvent(id);
}

export async function addMedia(id, media) {
  return userEventsAPI.addMedia(id, media);
}

export async function addEventTimeline(id, event) {
  return userEventsAPI.addEventTimeline(id, event);
}

export async function deleteEventTimeline(id, timeline) {
  return userEventsAPI.deleteEventTimeline(id, timeline);
}

export async function updateEventTimeline(id, timeline) {
  return userEventsAPI.updateEventTimeline(id, timeline);
}
