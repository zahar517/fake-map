import React from "react";
import { shallow } from "enzyme";
import { UserCard, Avatar } from "../UserCard";

describe("UserCard component", () => {
  let user;
  let component;

  beforeEach(() => {
    user = {
      id: 1,
      properties: {
        avatar: "path/to/avatar",
        userName: "Some name",
        email: "mail@mail.ru",
      },
    };
    component = shallow(<UserCard user={user} />);
  });

  it("should render userName", () => {
    expect(component.contains(user.properties.userName)).toBe(true);
  });

  it("should render email", () => {
    expect(component.contains(user.properties.email)).toBe(true);
  });

  it("should render avatar", () => {
    expect(component.find(Avatar).html()).toMatch(user.properties.avatar);
  });

  it("should call selectCurrentUser with user id if it is clicked", () => {
    const mockfn = jest.fn();
    component = shallow(<UserCard selectCurrentUser={mockfn} user={user} />);

    expect(mockfn).toHaveBeenCalledTimes(0);
    component.simulate("click");
    expect(mockfn).toHaveBeenCalledTimes(1);
    expect(mockfn).toHaveBeenCalledWith(user.id);
  });
});
