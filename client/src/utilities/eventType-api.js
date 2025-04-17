import sendRequest from "./send-request";
const BASE_URL = "/api/eventtype";

export async function getEventType() {
  return sendRequest(`${BASE_URL}/`);
}
