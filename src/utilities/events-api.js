import sendRequest from "./send-request";
const BASE_URL = "/api/events";

export async function getAllEvents(boundaries) {
  return sendRequest(`${BASE_URL}/`, boundaries);
}

export async function getOneEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
