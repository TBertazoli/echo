import sendRequest from "./send-request";
import BASE_URL from "/api/reports";

export async function create(report) {
  return sendRequest(`${BASE_URL}/account`, "POST", report);
}

export async function getAllReports() {
  return sendRequest(`${BASE_URL}/account`);
}

export async function getOneReport(id) {
  return sendRequest(`${BASE_URL}/account/${id}`);
}

export async function editReport(id, report) {
  return sendRequest(`${BASE_URL}/account/${id}`, "PUT", report);
}

export async function deleteReport(id) {
  return sendRequest(`${BASE_URL}/account/${id}`, "DELETE");
}
