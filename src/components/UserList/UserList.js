import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUsersRequest } from "../../actions/users";
import { getError, getIsLoading, getUsers } from "../../reducers/users";
import UserCard from "../UserCard";

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
  };

  componentDidMount() {
    this.props.fetchUsersRequest();
  }

  render() {
    const { users } = this.props;

    if (users.length) {
      return (
        <List>{users.map(user => <UserCard key={user.id} user={user} />)}</List>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  state => ({
    users: getUsers(state),
    error: getError(state),
    isLoading: getIsLoading(state),
  }),
  { fetchUsersRequest }
)(UserList);
