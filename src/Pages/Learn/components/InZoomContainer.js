import { useState, useEffect, useCallback, useContext } from "react";

import ZoomContext from "../context/zoom-context";

import classes from "./InZoomContainer.module.css";

const InZoomContainer = () => {
  const { client, stream, joinConfig, endZoomSession, currentDevices } =
    useContext(ZoomContext);
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [muted, setMuted] = useState(joinConfig.micMuted);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [loadedVideoContents, setLoadedVideoContents] = useState(false);

  const startVideoButton = useCallback(async () => {
    try {
      if (!videoStarted) {
        await stream.startVideo({
          cameraId: currentDevices.camera,
          virtualBackground: {
            imageUrl:
              // "https://media.istockphoto.com/id/1316043925/ko/%EB%B2%A1%ED%84%B0/%EC%9D%B8%EC%87%84%ED%95%98%EB%8B%A4.jpg?s=612x612&w=0&k=20&c=JTKSTxRcGJn9Ic8uFP4rFaiK7KzdPTqH6RVl4pjv22E=",
              "blur",
          },
        });
        let userVideo = await stream.attachVideo(
          client.getCurrentUserInfo().userId,
          { fullHd: true }
        );

        const label = document.createElement("label");
        label.htmlFor = "tutor";
        label.textContent = "Tutor Camera";
        label.id = "tutor-label";
        label.className = classes.VideoLabel;

        document.querySelector("video-player-container").appendChild(label);
        userVideo.id = "tutor";
        document.querySelector("video-player-container").appendChild(userVideo);

        setVideoStarted(true);
      } else {
        await stream.stopVideo();
        stream.detachVideo(client.getCurrentUserInfo().userId);
        //destroy child element
        let videoElement = document.getElementById("tutor");
        let labelElement = document.getElementById("tutor-label");

        videoElement.remove();
        labelElement.remove();

        setVideoStarted(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [stream, videoStarted, client, currentDevices.camera]);

  const startAudioButton = useCallback(async () => {
    try {
      if (!audioStarted) {
        await stream.startAudio();
        setAudioStarted(true);
      } else {
        if (muted) {
          stream.unmuteAudio();
          setMuted(false);
        } else {
          stream.muteAudio();
          setMuted(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [stream, audioStarted, muted]);

  const shareScreenButton = useCallback(async () => {
    try {
      if (!sharingScreen) {
        if (stream.isStartShareScreenWithVideoElement()) {
          await stream.startShareScreen(
            document.querySelector("#my-screen-share-content-video")
          );
          // screen share successfully started and rendered
        } else {
          await stream.startShareScreen(
            document.querySelector("#my-screen-share-content-canvas")
          );
          // screen share successfully started and rendered
        }
        setSharingScreen(true);
      } else {
        stream.stopShareScreen();
        setSharingScreen(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [stream, sharingScreen]);

  useEffect(() => {
    client.on("peer-video-state-change", async (event) => {
      console.log("changed state: ", event);
      if (event.action === "Start") {
        const label = document.createElement("label");
        label.htmlFor = "student";
        label.textContent = "Student Camera";
        label.id = "student-label";
        label.className = classes.VideoLabel;
        document.querySelector("video-player-container").appendChild(label);
        let userVideo = await stream.attachVideo(event.userId, 3);
        userVideo.id = "student";
        document.querySelector("video-player-container").appendChild(userVideo);
      } else if (event.action === "Stop") {
        let videoElement = document.getElementById("student");
        let labelElement = document.getElementById("student-label");

        videoElement.remove();
        labelElement.remove();
        await stream.detachVideo(event.userId);
      }
    });
    client.on("passively-stop-share", (payload) => {
      stream.stopShareScreen();
    });
    client.on("active-share-change", (payload) => {
      if (payload.state === "Active") {
        stream.startShareView(
          document.querySelector("#users-screen-share-content-canvas"),
          payload.userId
        );
      } else if (payload.state === "Inactive") {
        stream.stopShareView();
      }
    });

    client.on("user-added", (payload) => {
      console.log(payload[0].userId + " joined the session");
    });

    client.on("user-removed", (payload) => {
      console.log(payload[0].userId + " left the session");
    });
  }, [client, stream]);

  const initVideoAudio = useCallback(async () => {
    if (!joinConfig.videoOff) {
      await stream.startVideo({
        cameraId: currentDevices.camera,
        virtualBackground: {
          imageUrl:
            // "https://media.istockphoto.com/id/1316043925/ko/%EB%B2%A1%ED%84%B0/%EC%9D%B8%EC%87%84%ED%95%98%EB%8B%A4.jpg?s=612x612&w=0&k=20&c=JTKSTxRcGJn9Ic8uFP4rFaiK7KzdPTqH6RVl4pjv22E=",
            "blur",
        },
      });
      let userVideo = await stream.attachVideo(
        client.getCurrentUserInfo().userId,
        { fullHd: true }
      );

      const label = document.createElement("label");
      label.htmlFor = "tutor";
      label.textContent = "Tutor Camera";
      label.id = "tutor-label";
      label.className = classes.VideoLabel;

      document.querySelector("video-player-container").appendChild(label);
      userVideo.id = "tutor";
      console.log("userVideo: ", userVideo);
      document.querySelector("video-player-container").appendChild(userVideo);

      setVideoStarted(true);
    }
    stream.startAudio({ mute: joinConfig.micMuted });
    setAudioStarted(true);

    const currentUserId = client.getCurrentUserInfo().userId;
    client.getAllUser().forEach(async (user) => {
      if (user.userId !== currentUserId) {
        if (user.sharerOn) {
          stream.startShareView(
            document.querySelector("#users-screen-share-content-canvas"),
            user.userId
          );
        }
        if (user.bVideoOn) {
          const label = document.createElement("label");
          label.htmlFor = "student";
          label.textContent = "Student Camera";
          label.id = "student-label";
          label.className = classes.VideoLabel;
          document.querySelector("video-player-container").appendChild(label);

          const userVideo = await stream.attachVideo(user.userId, 3);
          userVideo.id = "student";
          document
            .querySelector("video-player-container")
            .appendChild(userVideo);
        }
      }
    });
    setLoadedVideoContents(true);
  }, [client, joinConfig, stream, currentDevices.camera]);
  //Initial self video,audio loading
  useEffect(() => {
    if (!loadedVideoContents) {
      initVideoAudio();
    }
  }, [initVideoAudio, loadedVideoContents]);

  return (
    <div>
      <h1>This is a In-Zoom meeting for your tutor.</h1>
      <div>
        <button onClick={startVideoButton}>
          {videoStarted ? "Stop Video" : "Start Video"}
        </button>
        <button onClick={startAudioButton}>
          {audioStarted ? (muted ? "Unmute" : "Mute") : "Connect to Audio"}
        </button>
        <button onClick={shareScreenButton}>
          {sharingScreen ? "Stop Share" : "Share screen"}
        </button>
        <div className={classes.VideoContainer}>
          <video-player-container></video-player-container>
          <video id="my-screen-share-content-video" width="300"></video>
          <canvas id="my-screen-share-content-canvas" width="300"></canvas>
          <canvas
            id="users-screen-share-content-canvas"
            height="1080"
            width="1920"
          ></canvas>
        </div>
      </div>
      <button
        onClick={() => {
          endZoomSession();
          client.leave(true);
        }}
      >
        End session
      </button>
    </div>
  );
};

export default InZoomContainer;
