import sendRequest from "./send-request";
const BASE_URL = "/api/user/reports";

export async function create(report) {
  return sendRequest(`${BASE_URL}/`, "POST", report);
}

export async function getUserReports() {
  return sendRequest(`${BASE_URL}/`);
}

export async function getOneReport(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function editReport(id, report) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", report);
}

export async function deleteReport(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
