import { useState, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import api, { setupAxiosInterceptors } from "./customFetch";

import Routes from "./Routes";

import { AuthContext } from "./shared/context/auth-context";
import { UserContext } from "./shared/context/user-context";

import { API_GetProfileData, API_Logout } from "./API";

// const login_duration = process.env.REACT_APP_LOGIN_DURATION;
let logoutTimer;
function App() {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const [accessToken, setAccessToken] = useState(null);
  const [id, setId] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [checkedLoginStatus, setCheckedLoginStatus] = useState(false);

  const [loading, setLoading] = useState(true);

  const updateAuthData = useCallback(
    (token = null) => {
      if (token) {
        setAccessToken(token);
        const decoded = jwtDecode(token);
        setId(decoded.id);
        setExpiration(decoded.exp * 1000);
        const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`);
        setSocket(newSocket);
        setupAxiosInterceptors(() => accessToken, setAccessToken);
      } else {
        setAccessToken(null);
        setId(null);
        setExpiration(null);
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
      setLoading(false);
    },
    [socket, accessToken]
  );

  const clearUserData = useCallback(() => {
    setUserData(null);
    setAccessToken(null);
    updateAuthData(null);
  }, [updateAuthData]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "logout") {
        // Clear tokens or state as needed
        clearUserData();
      } else if (event.key === "login") {
        window.location.reload();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [clearUserData]);

  const logout = useCallback(async () => {
    try {
      const response = await API_Logout();
      if (response.status === 200) {
        clearUserData();
        localStorage.setItem("logout", Date.now());
      } else {
        // alert("Logout Failed");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [clearUserData]);

  const updateProfileData = useCallback(
    async (body) => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/tutors/${id}/profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.status === 200) {
          // setProfileData({ ...data.profileData });
          setUserData({ ...data.data });
          setProfile({ ...data.profileData });

          setProfileCompleted(data.profileCompleted);
        } else if (data.status === 404) {
          logout();
        }
      } catch (err) {
        logout();
      }
    },
    [logout, accessToken, id]
  );
  const getUserData = useCallback(
    async (tutorId, accessToken) => {
      try {
        // const response = await API_GetProfileData(tutorId, accessToken);

        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.status === 200) {
          // setProfileData({ ...data.profileData });
          setUserData({ ...data.data });
          setProfile({ ...data.profileData });
          setProfileCompleted(data.profileCompleted);
        } else if (data.status === 404) {
          logout();
        }
      } catch (err) {
        logout();
      }
    },
    [logout]
  );

  const login = useCallback(
    async (token) => {
      updateAuthData(token);
      const decoded = jwtDecode(token);
      getUserData(decoded.id, token);
    },
    [updateAuthData, getUserData]
  );

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutors/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json(); // {userId, email, token: refreshtoken: expirationDate, message:}
      let newAccessToken;
      if (data.message === "new tokens generated") {
        newAccessToken = data.accessToken;
        login(newAccessToken);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  }, [login, logout]);

  //auto logout when token is expired
  useEffect(() => {
    if (accessToken && expiration) {
      const remainingTime = expiration - new Date().getTime();

      logoutTimer = setTimeout(refreshToken, remainingTime); // instead of logout, send refresh token request
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken, expiration, logout, refreshToken]);

  //auto login when page refresh
  useEffect(() => {
    //if new access token, get profile data,
    if (!checkedLoginStatus) {
      setLoading(true);
      refreshToken();
    }
    setCheckedLoginStatus(true);
    //else remain loggedout

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected on cleanup");
      }
    };
  }, [refreshToken, socket, checkedLoginStatus]);
  //test
  let routes;
  if (loading) {
    routes = <div>Loading...</div>;
  } else {
    routes = (
      <Routes isSignedIn={!!accessToken} profileCompleted={profileCompleted} />
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!accessToken,
        accessToken: accessToken,
        id: id,
        socket: socket,

        login: login,
        logout: logout,
      }}
    >
      <UserContext.Provider
        value={{
          data: userData,
          profile: profile,
          setUserData: setUserData,
          getUserData: getUserData,
          updateProfileData: updateProfileData,
        }}
      >
        <BrowserRouter>{routes}</BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
