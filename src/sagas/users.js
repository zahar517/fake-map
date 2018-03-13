import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../actions/users";
import { getUsers } from "../api";

export function* usersWorker() {
  try {
    const users = yield call(getUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export function* usersWatcher() {
  yield takeLatest(fetchUsersRequest, usersWorker);
}
