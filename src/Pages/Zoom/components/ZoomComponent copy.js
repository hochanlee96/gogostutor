import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "antd";
import {
  AudioOutlined,
  AudioMutedOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";

import ZoomContext from "../../../shared/context/zoom-context";
import MediaContext from "../../../shared/context/media-context";

const ZoomComponent = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShareScreen, setIsShareScreen] = useState(false);
  const [isSAB, setIsSAB] = useState(false);

  const navigate = useNavigate();

  const client = useContext(ZoomContext);
  const mediaStream = useContext(MediaContext);

  const isSupportedWebCodecs = () => {
    return typeof window.MediaStreamTrackProcessor === "function";
  };

  const startVideoButton = useCallback(async () => {
    try {
      if (!videoStarted) {
        if (!!window.chrome && !(typeof SharedArrayBuffer === "function")) {
          setIsSAB(false);
          await mediaStream.startVideo({
            videoElement: document.querySelector("#self-view-video"),
          });
        } else {
          setIsSAB(true);
          await mediaStream.startVideo();
          mediaStream.renderVideo(
            document.querySelector("#self-view-canvas"),
            client.getCurrentUserInfo().userId,
            1920,
            1080,
            0,
            0,
            3
          );
        }
        setVideoStarted(true);
      } else {
        await mediaStream.stopVideo();
        if (isSAB) {
          mediaStream.stopRenderVideo(
            document.querySelector("#self-view-canvas"),
            client.getCurrentUserInfo().userId
          );
        }
        setVideoStarted(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [mediaStream, videoStarted, client, isSAB]);

  const startAudioButton = useCallback(async () => {
    try {
      if (audioStarted) {
        if (isMuted) {
          await mediaStream.unmuteAudio();
          setIsMuted(false);
        } else {
          await mediaStream.muteAudio();
          setIsMuted(true);
        }
      } else {
        console.log("test", mediaStream);
        await mediaStream.startAudio();
        setAudioStarted(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [mediaStream, audioStarted, isMuted]);

  const shareScreenButton = useCallback(async () => {
    try {
      if (isShareScreen) {
        await mediaStream.stopShareScreen();
        setIsShareScreen(false);
      } else {
        if (isSupportedWebCodecs()) {
          await mediaStream.startShareScreen(
            document.querySelector("#share-video")
          );
        } else {
          await mediaStream.startShareScreen(
            document.querySelector("#share-canvas")
          );
        }
        setIsShareScreen(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isShareScreen, mediaStream]);

  return (
    <div>
      {isSAB ? (
        <canvas id="self-view-canvas" width="960" height="540"></canvas>
      ) : (
        <video id="self-view-video" width="960" height="540"></video>
      )}
      {!isSupportedWebCodecs() ? (
        <canvas id="share-canvas" width="960" height="540"></canvas>
      ) : (
        <video id="share-video" width="960" height="540"></video>
      )}
      <div className="video-footer">
        <Tooltip title={`${videoStarted ? "Stop Camera" : "Start Camera"}`}>
          <Button
            className="camera-button"
            icon={
              videoStarted ? (
                <VideoCameraOutlined />
              ) : (
                <VideoCameraAddOutlined />
              )
            }
            shape="circle"
            size="large"
            onClick={startVideoButton}
          />
        </Tooltip>
        <Tooltip
          title={`${isShareScreen ? "Stop Sharing Screen" : "Share Screen"}`}
        >
          <Button
            className="camera-button"
            icon={
              isShareScreen ? (
                <FullscreenOutlined />
              ) : (
                <FullscreenExitOutlined />
              )
            }
            shape="circle"
            size="large"
            onClick={shareScreenButton}
          />
        </Tooltip>
        <Tooltip
          title={`${
            audioStarted ? (isMuted ? "unmute" : "mute") : "Start Audio"
          }`}
        >
          <Button
            className="camera-button"
            icon={
              audioStarted ? (
                isMuted ? (
                  <AudioMutedOutlined />
                ) : (
                  <AudioOutlined />
                )
              ) : (
                // <IconFont type="icon-headset" />
                <div>Audio</div>
              )
            }
            shape="circle"
            size="large"
            onClick={startAudioButton}
          />
        </Tooltip>
        <button
          onClick={() => {
            client.leave(true);
            navigate("/dashboard");
          }}
        >
          End Session
        </button>
      </div>
    </div>
  );
};

export default ZoomComponent;
