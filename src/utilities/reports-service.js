import * as reportsAPI from "./reports-api";

export async function addReport(report) {
  return reportsAPI.create(report);
}
