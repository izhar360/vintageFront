import React, { Children, useContext } from "react";
import { Redirect ,Route } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({children,...rest}) {

  const {user} = useContext(UserContext);

  return <Route
    {...rest}
    render = {()=>{
      return user.token ? children : <Redirect to="/login">Login</Redirect>
    }} >
  </Route>;
}
