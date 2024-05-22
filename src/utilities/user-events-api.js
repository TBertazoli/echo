import sendRequest from "./send-request";
const BASE_URL = "/api/user/events";

export async function create(event) {
  return sendRequest(`${BASE_URL}/`, "POST", event);
}

export async function getUserEvents() {
  return sendRequest(`${BASE_URL}/`);
}

export async function getOneUserEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateUserEvent(id, event) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", event);
}

export async function deleteUserEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

export async function addMedia(id, media) {
  return sendRequest(`${BASE_URL}/${id}/addMedia`, "POST", media);
}

export async function addEventTimeline(id, event) {
  return sendRequest(`${BASE_URL}/${id}/addTimeline`, "POST", event);
}
