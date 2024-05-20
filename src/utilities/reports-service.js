import * as reportsAPI from "./reports-api";

export async function getAllReports() {
  return reportsAPI.getAllReports();
}

export async function getOneReport(id) {
  return reportsAPI.getOneReport(id);
}
