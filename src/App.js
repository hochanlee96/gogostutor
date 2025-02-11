import { useState, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import api, { setupAxiosInterceptors } from "./customFetch";

import Routes from "./Routes";

import { AuthContext } from "./shared/context/auth-context";
import { ProfileContext } from "./shared/context/profile-context";

import { API_GetProfileData, API_Logout } from "./API";

// const login_duration = process.env.REACT_APP_LOGIN_DURATION;
let logoutTimer;
function App() {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);

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

  const logout = useCallback(async () => {
    try {
      const response = await API_Logout();
      if (response.status === 200) {
        // localStorage.removeItem("userData");

        setUserData(null);
        // localStorage.removeItem("profileData");

        updateAuthData(null);
        // setAccessToken(null);
        // setTutorId(null);
        // setExpiration(null);
      } else {
        alert("Logout Failed");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [updateAuthData]);

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
      // const tokenExpiryDate = new Date(
      //   new Date().getTime() + 1000 * login_duration
      // );
      // setAuthData({ ...authData, tokenExpirationData: tokenExpiryDate });
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify({
      //     ...authData,
      //     expiration: tokenExpiryDate.toISOString(),
      //   })
      // );

      updateAuthData(token);
      // setAccessToken(authData.accessToken);
      const decoded = jwtDecode(token);

      // setTutorId(decoded.id);
      // setExpiration(decoded.exp);

      getUserData(decoded.id, token);
    },
    [updateAuthData, getUserData]
  );

  const verifyUser = useCallback(() => {
    setUserData((prev) => {
      return { ...prev, verified: true };
    });
    // localStorage.setItem(
    //   "userData",
    //   JSON.stringify({
    //     ...authData,
    //     verified: true,
    //   })
    // );
  }, []);

  const setApprovalStatus = useCallback((status) => {
    setUserData((prev) => {
      return { ...prev, approval: status };
    });
    // localStorage.setItem(
    //   "userData",
    //   JSON.stringify({
    //     ...authData,
    //     approval: status,
    //   })
    // );
  }, []);

  // const addProfileData = useCallback((profileData) => {
  //   setProfileData(profileData);
  //   // localStorage.setItem("profileData", JSON.stringify(profileData));
  // }, []);

  const verifyRefreshToken = useCallback(async () => {
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
      const newAccessToken = data.accessToken;
      if (data.message === "new tokens generated") {
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

      logoutTimer = setTimeout(verifyRefreshToken, remainingTime); // instead of logout, send refresh token request
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken, expiration, logout, verifyRefreshToken]);

  //auto login when page refresh
  useEffect(() => {
    //if new access token, get profile data,
    if (!checkedLoginStatus) {
      setLoading(true);
      verifyRefreshToken();
    }
    setCheckedLoginStatus(true);
    //else remain loggedout

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected on cleanup");
      }
    };
  }, [verifyRefreshToken, socket, checkedLoginStatus]);

  // useEffect(() => {
  //   // Example: Fetch accessToken from localStorage (or any initial state)
  //   console.log("setup interceptors");
  //   // Configure Axios interceptors
  //   setupAxiosInterceptors(() => accessToken, setAccessToken);
  // }, [accessToken]);
  let routes;
  if (loading) {
    routes = <div>Loading...</div>;
  } else {
    routes = <Routes isSignedIn={!!accessToken} />;
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
      <ProfileContext.Provider
        value={{
          // id: tutorId,
          // email: profileData&& profileData.email ? profileData.email : null,
          // verified: profileData && profileData.verified ? profileData.verified : false,
          // approval: profileData && profileData.approval ? profileData.approval : false,
          userData: userData,
          setUserData: setUserData,
          getUserData: getUserData,
          // verifyUser: verifyUser,
          // setApprovalStatus: setApprovalStatus,
        }}
      >
        <BrowserRouter>{routes}</BrowserRouter>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
