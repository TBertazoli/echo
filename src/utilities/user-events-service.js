import * as userEeventsAPI from "./user-events-api";

export async function createEvent(report) {
  return userEeventsAPI.create(report);
}
export async function getUserEvents() {
  return userEeventsAPI.getUserEvents();
}

export async function getOneUserEvent(id) {
  return userEeventsAPI.getOneUserEvent(id);
}

export async function updateUserEvent(id, report) {
  return userEeventsAPI.updateUserEvent(id, report);
}

export async function deleteUserEvent(id) {
  return userEeventsAPI.deleteUserEvent(id);
}
