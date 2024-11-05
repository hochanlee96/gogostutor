import { useState, useEffect, useCallback, useContext } from "react";

import { useParams } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";
import ZoomContext from "../../../shared/context/zoom-context";
import ZoomVideo from "@zoom/videosdk";

import ZoomContainer from "../components/ZoomContainer";

const Zoom = () => {
  const sessionId = useParams().sessionId;
  const [loadingSessionInfo, setLoadingSessionInfo] = useState(true);
  const [sessionInfo, setSessionInfo] = useState({});
  const [loadingToken, setLoadingToken] = useState(true);
  const auth = useContext(AuthContext);
  const [meetingArgs, setMeetingArgs] = useState(null);

  const fetchSessionInfo = useCallback(async () => {
    let response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutor/sessions/" + sessionId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      }
    );
    const data = await response.json();
    const sessionInfo = data.session;
    console.log("session info: ", sessionInfo);
    setSessionInfo(sessionInfo);
    setMeetingArgs({
      topic: sessionId,
      name: auth.userId,
      userId: auth.userId,
      roleType: 1,
    });
    setLoadingSessionInfo(false);
  }, [auth, sessionId]);

  const getToken = useCallback(
    async (options) => {
      let response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/zoomToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          body: JSON.stringify(options),
        }
      );
      const data = await response.json();
      setMeetingArgs((prev) => {
        return { ...prev, signature: data.signature };
      });
    },
    [auth]
  );

  useEffect(() => {
    fetchSessionInfo();
  }, [fetchSessionInfo]);

  useEffect(() => {
    if (meetingArgs && !meetingArgs.signature) {
      getToken(meetingArgs);
      setLoadingToken(false);
    }
  }, [getToken, meetingArgs]);

  const client = ZoomVideo.createClient();
  return (
    <ZoomContext.Provider value={client}>
      <div>Zoom</div>
      {loadingSessionInfo ? (
        <div>Loading session info...</div>
      ) : (
        <div>
          <div>Course subject: {sessionInfo.subjectId.title}</div>
          <div>Start time: {sessionInfo.startTime}</div>
        </div>
      )}
      {loadingToken ? (
        <div>Loading zoom session...</div>
      ) : (
        <ZoomContainer meetingArgs={meetingArgs} />
      )}
    </ZoomContext.Provider>
  );
};

export default Zoom;
