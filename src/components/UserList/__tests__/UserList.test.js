import React from "react";
import { shallow, mount } from "enzyme";
import { UserList } from "../UserList";
import UserCard from "../../UserCard";
import Loader from "../../Loader";
import Error from "../../Error";

describe("UserList component", () => {
  it("should render two UserCards if posts length 2", () => {
    const users = [{ id: 1 }, { id: 2 }];
    const component = shallow(<UserList users={users} />);

    expect(component.find(UserCard)).toHaveLength(2);
  });

  it("should render Loader if isLoading=true", () => {
    const component = shallow(<UserList isLoading />);

    expect(component.find(Loader)).toHaveLength(1);
  });

  it("should render Error if error", () => {
    const component = shallow(<UserList error={{}} />);

    expect(component.find(Error)).toHaveLength(1);
  });

  it("should call fetchUsersRequest if component mounted", () => {
    const mockfn = jest.fn();
    expect(mockfn).toHaveBeenCalledTimes(0);

    shallow(<UserList fetchUsersRequest={mockfn} />);
    expect(mockfn).toHaveBeenCalledTimes(1);
  });

  it("should call selectUser with user id if selectCurrentUser is called", () => {
    const users = [
      {
        id: 1,
        properties: {
          avatar: "path/to/avatar",
          userName: "Name",
          email: "mail@mail.com",
        },
      },
    ];
    const mockfn = jest.fn();
    expect(mockfn).toHaveBeenCalledTimes(0);

    const component = mount(<UserList selectUser={mockfn} users={users} />);
    component.find(UserCard).simulate("click");

    expect(mockfn).toHaveBeenCalledTimes(1);
    expect(mockfn).toHaveBeenCalledWith(users[0].id);
  });
});
