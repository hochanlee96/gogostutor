import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const ZoomTest = () => {
  const sessionId = useParams().sessionId;
  const [, setSession] = useState(null);
  const [, setSignature] = useState(null);

  const client = ZoomMtgEmbedded.createClient();
  let meetingSDKElement = document.getElementById("meetingSDKElement");

  const auth = useContext(AuthContext);

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/sessions/" + sessionId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setSession(data.session);
        console.log(data.session);
      } else {
        console.log("Error fetching session: ", data.message);
      }
    } catch (err) {
      console.log("Error fetching session: ", err);
    }
  }, [auth, sessionId]);

  const generateZoomMeetingToken = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/meetingToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          body: JSON.stringify({
            topic: "test",
          }),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        console.log(data.signature);
        setSignature(data.signature);
      } else {
        console.log("Error fetching token: ");
      }
    } catch (err) {
      console.log("Error fetching session: ", err);
    }
  }, [auth]);

  useEffect(() => {
    const init = async () => {
      if (meetingSDKElement) {
        client.init({
          zoomAppRoot: meetingSDKElement,
          language: "en-US",
        });
      }
    };
    init();
    return () => {
      ZoomMtgEmbedded.destroyClient();
    };
  }, [client, meetingSDKElement]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    generateZoomMeetingToken();
  }, [generateZoomMeetingToken]);

  return (
    <div>
      <h1>Zoom meeting test page</h1>
      <div id="meetingSDKElement"></div>
    </div>
  );
};

export default ZoomTest;
