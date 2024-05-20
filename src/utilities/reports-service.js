import * as reportsAPI from "./reports-api";

export async function addReport(report) {
  return reportsAPI.create(report);
}

export async function getReports() {
  return reportsAPI.getAllReports();
}

export async function getReport(id) {
  return reportsAPI.getOneReport(id);
}

export async function updateReport(id, report) {
  return reportsAPI.editReport(id, report);
}

export async function deleteReport(id) {
  return reportsAPI.deleteReport(id);
}
