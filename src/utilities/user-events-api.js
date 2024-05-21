import sendRequest from "./send-request";
const BASE_URL = "/api/user/reports";

export async function create(report) {
  return sendRequest(`${BASE_URL}/`, "POST", report);
}

export async function getUserEvents() {
  return sendRequest(`${BASE_URL}/`);
}

export async function getOneUserEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateUserEvent(id, report) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", report);
}

export async function deleteUserEvent(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
