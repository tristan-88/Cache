import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.session.user)
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {currentUser.email}
      </li>
      <li>
        <strong>Username</strong> {currentUser.username}
      </li>
      <li>
        <strong>Email</strong> {currentUser.email}
      </li>
    </ul>
  );
}
export default User;
