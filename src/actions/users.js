import { createActions } from "redux-actions";

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} = createActions(
  "FETCH_USERS_REQUEST",
  "FETCH_USERS_SUCCESS",
  "FETCH_USERS_FAILURE"
);
