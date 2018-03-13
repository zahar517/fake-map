import { createActions } from "redux-actions";

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  selectUser,
} = createActions(
  "FETCH_USERS_REQUEST",
  "FETCH_USERS_SUCCESS",
  "FETCH_USERS_FAILURE",
  "SELECT_USER"
);
