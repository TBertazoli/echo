import sendRequest from "./send-request";
const BASE_URL = "/api/reports";

export async function getAllReports(boundaries) {
  return sendRequest(`${BASE_URL}/`, boundaries);
}

export async function getOneReport(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
