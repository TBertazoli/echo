import sendRequest from "./send-request";
import BASE_URL from "/api/reports";

export async function create(report) {
  return sendRequest(`${BASE_URL}`, "POST", report);
}
