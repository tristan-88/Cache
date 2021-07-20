import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User/User"
import SplashPage from "./components/SplashPage/SplashPage";
import MainPage from "./components/MainPage/MainPage";
import ArchivedPage from "./components/ArchivedPage/ArchivedPage";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users/:id" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/main" exact={true} >
          <MainPage />
        </ProtectedRoute>
        <ProtectedRoute path="/archived" exact={true} >
          <ArchivedPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
