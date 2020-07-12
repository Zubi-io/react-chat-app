import React, { PureComponent } from 'react';
import './App.css';

const UserItem = ({ user, isSelected, onClick }) => {
  return (
    <div key={user} onClick={onClick}>
      <p className={isSelected ? 'Selected' : ''}>{user}</p>
    </div>
  );
};

export default class LeftPanel extends PureComponent {
  renderUserItem = (user) => {
    const { updateSelectedUser, selectedUser } = this.props;

    return <UserItem user={user} isSelected={selectedUser === user} onClick={() => updateSelectedUser(user)} />;
  };

  render() {
    const { users } = this.props;
    return (
      <div>
        <header>Users</header>
        {users.map((u) => this.renderUserItem(u))}
      </div>
    );
  }
}
