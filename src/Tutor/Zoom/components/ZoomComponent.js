import React, { useState, useEffect, useContext, useCallback } from "react";

import classes from "./ZoomComponent.module.css";

import ZoomContext from "../../../shared/context/zoom-context";
import MediaContext from "../../../shared/context/media-context";

const ZoomComponent = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [loadedVideoContents, setLoadedVideoContents] = useState(false);

  const client = useContext(ZoomContext);
  const mediaStream = useContext(MediaContext);

  const startVideoButton = useCallback(async () => {
    try {
      console.log("support", mediaStream.isSupportHDVideo());
      if (!videoStarted) {
        await mediaStream.startVideo({ fullHd: true });
        let userVideo = await mediaStream.attachVideo(
          client.getCurrentUserInfo().userId,
          { fullHd: true }
        );
        userVideo.id = "tutor";
        console.log("userVideo: ", userVideo);
        document.querySelector("video-player-container").appendChild(userVideo);

        setVideoStarted(true);
      } else {
        console.log("stop");
        await mediaStream.stopVideo();
        mediaStream.detachVideo(client.getCurrentUserInfo().userId);
        //destroy child element
        let videoElement = document.getElementById("tutor");
        videoElement.parentNode.removeChild(videoElement);

        setVideoStarted(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [mediaStream, videoStarted, client]);

  const startAudioButton = useCallback(async () => {
    try {
      if (!audioStarted) {
        await mediaStream.startAudio();
        setAudioStarted(true);
      } else {
        if (muted) {
          mediaStream.unmuteAudio();
          setMuted(false);
        } else {
          mediaStream.muteAudio();
          setMuted(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [mediaStream, audioStarted, muted]);

  const shareScreenButton = useCallback(async () => {
    try {
      if (!sharingScreen) {
        if (mediaStream.isStartShareScreenWithVideoElement()) {
          await mediaStream.startShareScreen(
            document.querySelector("#my-screen-share-content-video")
          );
          // screen share successfully started and rendered
        } else {
          await mediaStream.startShareScreen(
            document.querySelector("#my-screen-share-content-canvas")
          );
          // screen share successfully started and rendered
        }
        setSharingScreen(true);
      } else {
        mediaStream.stopShareScreen();
        setSharingScreen(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [mediaStream, sharingScreen]);

  useEffect(() => {
    if (mediaStream) {
      client.on("peer-video-state-change", async (event) => {
        if (event.action === "Start") {
          let userVideo = await mediaStream.attachVideo(event.userId, 3);
          userVideo.id = event.userId;
          document
            .querySelector("video-player-container")
            .appendChild(userVideo);
        } else if (event.action === "Stop") {
          console.log("stopped..", event);
          await mediaStream.detachVideo(event.userId);
          let videoElement = document.getElementById(event.userId);
          videoElement.parentNode.removeChild(videoElement);
        }
      });
      client.on("passively-stop-share", (payload) => {
        mediaStream.stopShareScreen();
        document.querySelector("#my-screen-share-content-canvas");
      });
      client.on("active-share-change", (payload) => {
        if (payload.state === "Active") {
          mediaStream.startShareView(
            document.querySelector("#users-screen-share-content-canvas"),
            payload.userId
          );
        } else if (payload.state === "Inactive") {
          mediaStream.stopShareView();
        }
      });
    }
  }, [client, mediaStream]);

  useEffect(() => {
    if (client && mediaStream && loadedVideoContents) {
      client.getAllUser().forEach((user) => {
        if (user.sharerOn) {
          mediaStream.startShareView(
            document.querySelector("#users-screen-share-content-canvas"),
            user.userId
          );
        }
        if (user.bVideoOn) {
          mediaStream.attachVideo(user.userId, 3).then((userVideo) => {
            document
              .querySelector("video-player-container")
              .appendChild(userVideo);
          });
        }
      });
      setLoadedVideoContents(true);
    }
  }, [client, mediaStream, loadedVideoContents]);

  return (
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
        <video
          id="my-screen-share-content-video"
          height="1080"
          width="1920"
        ></video>
        <canvas
          id="my-screen-share-content-canvas"
          height="1080"
          width="1920"
        ></canvas>
        <canvas
          id="users-screen-share-content-canvas"
          height="1080"
          width="1920"
        ></canvas>
      </div>
    </div>
  );
};

export default ZoomComponent;
