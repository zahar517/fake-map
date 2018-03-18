import usersReducer from "../users";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  selectUser,
} from "../../actions/users";
import {
  getCurrentUser,
  getError,
  getIsLoading,
  getUsers,
} from "../../reducers/users";

describe("Users reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      users: [],
      error: null,
      currentUser: null,
    };
  });

  it("test initial state", () => {
    const state = usersReducer(undefined, {});

    expect(state).toEqual(initialState);
  });

  it("should change isLoading flag depending on actions", () => {
    const state1 = usersReducer(initialState, fetchUsersRequest());
    const state2 = usersReducer(state1, fetchUsersSuccess({}));
    const state3 = usersReducer(state1, fetchUsersFailure({}));

    expect(state1.isLoading).toBe(true);
    expect(state2.isLoading).toBe(false);
    expect(state3.isLoading).toBe(false);
  });

  it("should fill users if fetchUsersSuccess", () => {
    const users = [{ id: 1 }];
    const state = usersReducer(initialState, fetchUsersSuccess(users));

    expect(state.users).toEqual(users);
  });

  it("should clear users if fetchUsersRequest", () => {
    const users = [{ id: 1 }];
    const state1 = { ...initialState, users };
    const state2 = usersReducer(state1, fetchUsersRequest());

    expect(state2.users).toEqual(initialState.users);
  });

  it("should fill error if fetchUsersFailure", () => {
    const error = { message: "some error" };
    const state = usersReducer(initialState, fetchUsersFailure(error));

    expect(state.error).toEqual(error);
  });

  it("should clear error if fetchUsersRequest", () => {
    const error = { message: "some error" };
    const state1 = { ...initialState, error };
    const state2 = usersReducer(state1, fetchUsersRequest());

    expect(state2.error).toEqual(initialState.error);
  });

  it("should clear error if fetchUsersSuccess", () => {
    const error = { message: "some error" };
    const state1 = { ...initialState, error };
    const state2 = usersReducer(state1, fetchUsersSuccess({}));

    expect(state2.error).toEqual(initialState.error);
  });

  it("should fill currentUser if selectUser", () => {
    const currentUser = 1;
    const state = usersReducer(initialState, selectUser(currentUser));

    expect(state.currentUser).toBe(currentUser);
  });
});

describe("Users selectors", () => {
  const users = [{id: 1}]
  const isLoading = true
  const error = {message: 'some error'}
  const currentUser = 1
  const state = { users: {users, isLoading, error,currentUser}}

  it("selector getUsers should return users", () => {
    expect(getUsers(state)).toEqual(users);
  });

  it("selector getIsLoading should return isLoading", () => {
    expect(getIsLoading(state)).toEqual(isLoading);
  });

  it("selector getCurrentUser should return currentUser", () => {
    expect(getCurrentUser(state)).toEqual(currentUser);
  });

  it("selector getError should return error", () => {
    expect(getError(state)).toEqual(error);
  });
});
