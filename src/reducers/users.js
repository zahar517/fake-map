import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../actions/users";

export const isLoading = handleActions(
  {
    [fetchUsersRequest]: () => true,
    [fetchUsersSuccess]: () => false,
    [fetchUsersFailure]: () => false,
  },
  false
);

export const users = handleActions(
  {
    [fetchUsersRequest]: () => [],
    [fetchUsersSuccess]: (state, action) => action.payload,
  },
  []
);

export const error = handleActions(
  {
    [fetchUsersRequest]: () => null,
    [fetchUsersSuccess]: () => null,
    [fetchUsersFailure]: (state, action) => action.payload,
  },
  null
);

export const getUsers = state => state.users.users;
export const getIsLoading = state => state.users.isLoading;
export const getError = state => state.users.error;

export default combineReducers({
  isLoading,
  users,
  error,
});
