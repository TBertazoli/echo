import * as eventsAPI from "./events-api";

export async function getAllEvents() {
  return eventsAPI.getAllEvents();
}

export async function getOneEvent(id) {
  return eventsAPI.getOneEvent(id);
}
