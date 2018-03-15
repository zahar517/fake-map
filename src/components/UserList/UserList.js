import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUsersRequest, selectUser } from "../../actions/users";
import { getError, getIsLoading, getUsers } from "../../reducers/users";
import UserCard from "../UserCard";
import Loader from "../Loader";
import Error from "../Error";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: scroll;
  border-right: 1px solid #eee;
`;

export class UserList extends PureComponent {
  static defaultProps = {
    users: [],
    error: null,
    isLoading: false,
    fetchUsersRequest: () => null,
    selectUser: () => null,
  };

  componentDidMount() {
    this.props.fetchUsersRequest();
  }

  selectCurrentUser = id => {
    this.props.selectUser(id);
  };

  render() {
    const { users, isLoading, error } = this.props;

    if (isLoading) return <Loader />;
    if (error) return <Error>Sorry! Try again later</Error>;
    if (!users.length) return null;

    return (
      <List onClick={this.clickUserList}>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            selectCurrentUser={this.selectCurrentUser}
          />
        ))}
      </List>
    );
  }
}

export default connect(
  state => ({
    users: getUsers(state),
    error: getError(state),
    isLoading: getIsLoading(state),
  }),
  { fetchUsersRequest, selectUser }
)(UserList);
