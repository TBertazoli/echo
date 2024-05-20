import sendRequest from "./send-request";
const BASE_URL = "/api/reports";

export async function getAllReports() {
  return sendRequest(`${BASE_URL}/`);
}

export async function getOneReport(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
