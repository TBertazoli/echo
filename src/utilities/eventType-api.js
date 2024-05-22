import sendRequest from "./send-request";
const BASE_URL = "/api/eventtypes";

export async function getEventType() {
  return sendRequest(`${BASE_URL}/`);
}
