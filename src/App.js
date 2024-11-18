import { useState, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";

import Loading from "./shared/UI/pages/Loading";

import Routes from "./Routes";

import { AuthContext } from "./shared/context/auth-context";
import { ProfileContext } from "./shared/context/profile-context";

import { API_GetProfileData } from "./API";

const login_duration = process.env.REACT_APP_LOGIN_DURATION;
let logoutTimer;
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const login = useCallback((authData) => {
    const tokenExpiryDate = new Date(
      new Date().getTime() + 1000 * login_duration
    );
    setAuthData({ ...authData, tokenExpirationData: tokenExpiryDate });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...authData,
        expiration: tokenExpiryDate.toISOString(),
      })
    );
    console.log("logging in...", authData);
    const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    setSocket(newSocket);
  }, []);

  const verifyUser = useCallback(() => {
    setAuthData((prev) => {
      return { ...prev, verified: true };
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...authData,
        verified: true,
      })
    );
  }, [authData]);

  const setApprovalStatus = useCallback(
    (status) => {
      setAuthData((prev) => {
        return { ...prev, approval: status };
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...authData,
          approval: status,
        })
      );
    },
    [authData]
  );

  const addProfileData = useCallback((profileData) => {
    setProfileData(profileData);
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, []);

  const logout = useCallback(() => {
    setAuthData(null);
    localStorage.removeItem("userData");

    setProfileData(null);
    localStorage.removeItem("profileData");
  }, []);

  const verifyRefreshToken = useCallback(async () => {
    try {
      if (authData && authData.refreshToken) {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/user/verify-refreshtoken",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              refreshToken: authData.refreshToken,
            },
          }
        );
        const data = await response.json(); // {userId, email, token: refreshtoken: expirationDate, message:}
        const newAuthData = data.authData;
        if (data.message === "new tokens generated") {
          login(newAuthData);
        } else if (data.message === "refresh token expired") {
          logout();
        }
      }
    } catch (err) {
      logout();
    }
  }, [login, logout, authData]);

  const getProfileData = useCallback(async () => {
    try {
      if (authData.accessToken) {
        const response = await API_GetProfileData(
          authData.id,
          authData.accessToken
        );
        const data = await response.json();
        const profileData = data.profileData;
        if (data.status === 200) {
          addProfileData(profileData);
        } else if (data.status === 404) {
          logout();
        }
      }
    } catch (err) {
      logout();
    }
  }, [authData, logout, addProfileData]);

  //auto logout when token is expired
  useEffect(() => {
    if (authData && authData.accessToken && authData.tokenExpirationDate) {
      const remainingTime =
        authData.tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(verifyRefreshToken, remainingTime); // instead of logout, send refresh token request
    } else {
      clearTimeout(logoutTimer);
    }
  }, [authData, logout, verifyRefreshToken]);

  //auto login when page refresh
  useEffect(() => {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    if (
      userData &&
      userData.accessToken &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData);
    }
    if (profileData) {
      addProfileData(profileData);
    }
    setIsLoading(false);
  }, [login, addProfileData]);

  let routes;
  if (isLoading) {
    routes = <Loading />;
  } else {
    routes = <Routes isSignedIn={!!authData} />;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!authData,
        accessToken:
          authData && authData.accessToken ? authData.accessToken : null,
        refreshToken:
          authData && authData.refreshToken ? authData.refreshToken : null,
        id: authData && authData.id ? authData.id : null,
        email: authData && authData.email ? authData.email : null,
        verified: authData && authData.verified ? authData.verified : false,
        approval: authData && authData.approval ? authData.approval : false,
        socket: socket,

        login: login,
        logout: logout,
        verifyRefreshToken: verifyRefreshToken,
        verifyUser: verifyUser,
        setApprovalStatus: setApprovalStatus,
      }}
    >
      <ProfileContext.Provider
        value={{
          profileData: profileData,
          setProfileData: addProfileData,
          getProfileData: getProfileData,
        }}
      >
        <BrowserRouter>{routes}</BrowserRouter>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
