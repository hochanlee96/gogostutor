import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";

import ZoomVideo from "@zoom/videosdk";

import { AuthContext } from "../../../shared/context/auth-context";
import ZoomContext from "../context/zoom-context";

import SessionInfoContainer from "../components/SessionInfoContainer";
// import PreZoomContainer from "../components/Test";
import PreZoomContainer from "../components/PreZoomContainer";
import InZoomContainer from "../components/InZoomContainer";
import PostZoomContainer from "../components/PostZoomContainer";

const sessionStages = [
  "before initilizing session",
  "initializing session",
  "initialized session",
];
const zoomStages = [
  "before intiated",
  "intializing zoom session",
  "preview page",
  "in session",
  "after session",
];
const Learn = () => {
  const sessionId = useParams().sessionId;
  const [sessionStage, setSessionStage] = useState(sessionStages[0]);
  const [zoomStage, setZoomStage] = useState(zoomStages[0]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [meetingArgs, setMeetingArgs] = useState(null);
  const [, setSystemReq] = useState(null);
  const auth = useContext(AuthContext);
  const client = ZoomVideo.createClient();
  const [users, setUsers] = useState(client.getAllUser());
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState({
    cameraDevices: null,
    microphoneDevices: null,
    speakerDevices: null,
  });
  const [currentDevices, setCurrentDevices] = useState({
    camera: null,
    microphone: null,
    speaker: null,
  });
  const [joinConfig, setJoinConfig] = useState({
    videoOff: true,
    micMuted: true,
  });

  const fetchSessionInfo = useCallback(
    async (sessionId) => {
      setSessionStage(sessionStages[1]);
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
      const sessionInfo = data.sessionInfo;
      console.log("session info: ", sessionInfo);
      setSessionInfo(sessionInfo);
      setMeetingArgs({
        topic: sessionId,
        name: auth.userId,
        userId: auth.userId,
        signature: data.signature,
      });
      setSessionStage(sessionStages[2]);
    },
    [auth]
  );

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
      if (client) {
        console.log("destroy");
        ZoomVideo.destroyClient();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [client]);

  const initiateZoomSession = useCallback(async () => {
    setZoomStage(zoomStages[1]);
    await client.init("en-US", "Global", { patchJsMedia: true });
    setZoomStage(zoomStages[2]);
  }, [client]);

  const joinZoomSession = useCallback(async () => {
    let mediaStream;
    await client.join(
      meetingArgs.topic,
      meetingArgs.signature,
      meetingArgs.name
    );
    mediaStream = client.getMediaStream();
    setStream(mediaStream);
    enterZoomSession();
  }, [meetingArgs, client]);

  const enterZoomSession = () => {
    setZoomStage(zoomStages[3]);
  };

  const endZoomSession = () => {
    setZoomStage(zoomStages[4]);
  };

  let sessionContent = (
    <div>
      <h1>Learning page before loading session Info</h1>
    </div>
  );
  if (sessionStage === sessionStages[1]) {
    sessionContent = (
      <div>
        <h1>Loading session Info</h1>
      </div>
    );
  } else if (sessionStage === sessionStages[2]) {
    sessionContent = <SessionInfoContainer sessionInfo={sessionInfo} />;
  }

  const getDevices = useCallback(async () => {
    const deviceList = await ZoomVideo.getDevices();

    let camId, micId, spkId;
    let cameraDevices, microphoneDevices, speakerDevices;

    if (deviceList) {
      cameraDevices = deviceList.filter((device) => {
        return device.kind === "videoinput";
      });
      if (cameraDevices && cameraDevices.length > 0) {
        camId = cameraDevices[0].deviceId;
      }
      console.log("cam deviceList: " + cameraDevices);
      microphoneDevices = deviceList.filter((device) => {
        return device.kind === "audioinput";
      });
      if (microphoneDevices && microphoneDevices.length > 0) {
        micId = microphoneDevices[0].deviceId;
      }
      speakerDevices = deviceList.filter((device) => {
        return device.kind === "audiooutput";
      });
      if (speakerDevices && speakerDevices.length > 0) {
        spkId = speakerDevices[0].deviceId;
      }
      setDevices({
        cameraDevices,
        microphoneDevices,
        speakerDevices,
      });
      setCurrentDevices({
        camera: camId,
        microphone: micId,
        speaker: spkId,
      });
    }
  }, []);

  const changeDevice = (type, deviceId) => {
    setCurrentDevices((prev) => {
      return { ...prev, [type]: deviceId };
    });
  };

  useEffect(() => {
    if (sessionStage === sessionStages[0]) {
      fetchSessionInfo(sessionId);
    } else if (sessionStage === sessionStages[2]) {
      setSystemReq(ZoomVideo.checkSystemRequirements());
      setZoomStage(zoomStages[1]);
      initiateZoomSession();
      // joinZoomSession();
      getDevices();
    }

    // return ZoomVideo.destroyClient();
  }, [
    fetchSessionInfo,
    sessionId,
    sessionStage,
    initiateZoomSession,
    client,
    getDevices,
    joinZoomSession,
  ]);

  let zoomContent = null;
  if (zoomStage === zoomStages[1]) {
    zoomContent = <h1>Initializing Zoom Session</h1>;
  } else if (zoomStage === zoomStages[2]) {
    zoomContent = <PreZoomContainer />;
  } else if (zoomStage === zoomStages[3]) {
    zoomContent = <InZoomContainer />;
  } else if (zoomStage === zoomStages[4]) {
    zoomContent = <PostZoomContainer />;
  }

  useEffect(() => {
    client.on("user-added", (payload) => {
      console.log(payload);
      setUsers(client.getAllUser());
    });
  }, [client]);

  return (
    <div>
      {sessionContent}
      <ZoomContext.Provider
        value={{
          client: client,
          stream: stream,
          devices: devices,
          currentDevices: currentDevices,
          changeDevice: changeDevice,
          joinConfig: joinConfig,
          setJoinConfig: setJoinConfig,
          joinZoomSession: joinZoomSession,
          enterZoomSession: enterZoomSession,
          endZoomSession: endZoomSession,
          users: users,
        }}
      >
        {zoomContent}
      </ZoomContext.Provider>
    </div>
  );
};

export default Learn;
