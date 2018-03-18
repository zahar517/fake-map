import { call, put, takeLatest } from "redux-saga/effects";
import { usersWatcher, usersWorker } from "../users";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../actions/users";
import { getUsers } from "../../api";

describe("usersWatcher", () => {
  const iterator = usersWatcher();

  it("first step should return takeLatest with args fetchUsersRequest and usersWorker", () => {
    const firstStep = iterator.next().value;

    expect(firstStep).toEqual(takeLatest(fetchUsersRequest, usersWorker));
  });

  it("second step should return { done: true, value: undefined }", () => {
    const secondStep = iterator.next();

    expect(secondStep).toEqual({ done: true, value: undefined });
  });
});

describe("userWorker success scenario", () => {
  const iterator = usersWorker();

  it("first step return call with getUsers", () => {
    const firstStep = iterator.next().value;

    expect(firstStep).toEqual(call(getUsers));
  });

  it("second step return put with fetchUsersSuccess with users data", () => {
    const users = [{ id: 1 }];
    const secondStep = iterator.next(users).value;

    expect(secondStep).toEqual(put(fetchUsersSuccess(users)));
  });

  it("third step should return { done: true, value: undefined }", () => {
    const thirdStep = iterator.next();

    expect(thirdStep).toEqual({ done: true, value: undefined });
  });
});

describe("userWorker failed scenario", () => {
  const iterator = usersWorker();

  it("first step return call with getUsers", () => {
    const firstStep = iterator.next().value;

    expect(firstStep).toEqual(call(getUsers));
  });

  it("second step return put with fetchUsersFailure with error data", () => {
    const error = {message: 'some error' };
    const secondStep = iterator.throw(error).value;

    expect(secondStep).toEqual(put(fetchUsersFailure(error)));
  });

  it("third step should return { done: true, value: undefined }", () => {
    const thirdStep = iterator.next();

    expect(thirdStep).toEqual({ done: true, value: undefined });
  });
});
