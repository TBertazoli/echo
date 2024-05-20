import * as reportsAPI from "./user-reports-api";

export async function createReport(report) {
  return reportsAPI.create(report);
}

export async function getUserReports() {
  return reportsAPI.getUserReports();
}

export async function getOneReport(id) {
  return reportsAPI.getOneReport(id);
}

export async function updateReport(id, report) {
  return reportsAPI.editReport(id, report);
}

export async function deleteReport(id) {
  return reportsAPI.deleteReport(id);
}
