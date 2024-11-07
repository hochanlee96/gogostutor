import { useState, useEffect, useCallback, useContext, useRef } from "react";
import ZoomVideo from "@zoom/videosdk";

import ZoomContext from "../context/zoom-context";

const PreZoomContainer = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const {
    client,
    devices,
    currentDevices,
    changeDevice,
    joinConfig,
    setJoinConfig,
    joinZoomSession,
    enterZoomSession,
    users,
  } = useContext(ZoomContext);
  const [tracks, setTracks] = useState({
    audioInputTrack: null,
    audioOutputTrack: null,
  });
  const [entering, setEntering] = useState(false);
  const videoInputTrack = useRef(undefined);
  console.log("UUUsers", users);

  const previewVideo = useCallback(() => {
    if (currentDevices.camera) {
      videoInputTrack.current = ZoomVideo.createLocalVideoTrack(
        currentDevices.camera
      );

      videoInputTrack.current.start(
        document.querySelector("#preview-camera-video")
      );
    }
  }, [currentDevices.camera]);
  const stopPreviewVideo = () => {
    if (currentDevices.camera) {
      videoInputTrack.current.stop();
      setVideoStarted(false);
    }
  };

  const setLocalTracks = useCallback(async () => {
    let localAudioInputTrack, localAudioOutputTrack;

    if (devices.microphoneDevices) {
      localAudioInputTrack = ZoomVideo.createLocalAudioTrack(
        devices.microphoneDevices[0]
      );
    }

    if (devices.speakerDevices) {
      localAudioOutputTrack = ZoomVideo.createLocalAudioTrack(
        devices.speakerDevices[0]
      );
    }

    setTracks({
      audioInputTrack: localAudioInputTrack,
      audioOutputTrack: localAudioOutputTrack,
    });
  }, [devices]);

  useEffect(() => {
    if (videoStarted) {
      previewVideo();
    }
  }, [videoStarted, previewVideo]);

  useEffect(() => {
    // client.leave();

    setLocalTracks();
  }, [joinZoomSession, setLocalTracks, client]);

  let speakerTester = undefined;

  const audioOutputTester = (event) => {
    const target = event.target;
    const outputLevelElm = document.querySelector("#speaker-output-level");
    if (target.classList.contains("test-speaker")) {
      const value = target.dataset["start"];
      if (value === "1") {
        if (speakerTester) {
          speakerTester.destroy();
          target.dataset["start"] = "0";
          target.textContent = "Test Speaker";

          outputLevelElm.value = 0;
        }
      } else {
        speakerTester = tracks.audioOutputTrack.testSpeaker({
          speakerId: currentDevices.speaker,
          onAnalyseFrequency: (v) => {
            outputLevelElm.value = v;
          },
        });
        target.dataset["start"] = "1";
        target.textContent = "Stop test";
      }
    }
  };

  let microphoneTester = undefined;
  const audioInputTester = (event) => {
    const target = event.target;
    const inputLevelElm = document.querySelector("#mic-input-level");
    if (target.classList.contains("test-microphone")) {
      const value = target.dataset["start"];
      /**
       * 0 - undefined - init
       * 1 - start
       * 2 - recording
       * 3 - playing recording
       */
      if (value === "1" || value === "3") {
        if (microphoneTester) {
          microphoneTester.stop();
          target.dataset["start"] = "0";
          target.textContent = "Test Microphone";
          inputLevelElm.value = 0;
        }
      } else if (!value || value === "0") {
        microphoneTester = tracks.audioInputTrack.testMicrophone({
          microphoneId: currentDevices.microphone,
          speakerId: currentDevices.speaker,
          onAnalyseFrequency: (v) => {
            inputLevelElm.value = v;
          },
          recordAndPlay: true,
          onStartRecording: () => {
            target.textContent = "Recording";
            target.dataset["start"] = "2";
          },
          onStartPlayRecording: () => {
            target.textContent = "Playing";
            target.dataset["start"] = "3";
          },
          onStopPlayRecording: () => {
            target.textContent = "Stop test";
            target.dataset["start"] = "1";
          },
        });
        target.dataset["start"] = "1";
        target.textContent = "Stop test";
      } else if (value === "2") {
        microphoneTester.stopRecording();
      }
    }
  };

  const cameraDeviceSelectHandler = async (event) => {
    changeDevice("camera", event.target.value);

    videoInputTrack.current = ZoomVideo.createLocalVideoTrack(
      event.target.value
    );
  };
  const speakerDeviceSelectHandler = async (event) => {
    changeDevice("speaker", event.target.value);

    const localAudioOutputTrack = ZoomVideo.createLocalAudioTrack(
      event.target.value
    );
    setTracks((prev) => {
      return { ...prev, audioOutputTrack: localAudioOutputTrack };
    });
  };
  const microphoneDeviceSelectHandler = async (event) => {
    changeDevice("microphone", event.target.value);

    const localAudioInputTrack = ZoomVideo.createLocalAudioTrack(
      event.target.value
    );
    setTracks((prev) => {
      return { ...prev, audioInputputTrack: localAudioInputTrack };
    });
  };

  const findDeviceLabel = (deviceList, deviceId) => {
    const device = deviceList.find((device) => device.deviceId === deviceId);
    return device.label;
  };

  const checkJoinConfigHandler = (event) => {
    setJoinConfig((prev) => {
      return { ...prev, [event.target.name]: event.target.checked };
    });
  };

  return (
    <div>
      <h1>This is a pre-Zoom meeting for your tutor.</h1>

      <div>
        {videoStarted ? (
          <video id="preview-camera-video" width="300" playsInline></video>
        ) : null}
      </div>
      {devices.cameraDevices ? (
        <select
          onChange={cameraDeviceSelectHandler}
          default={currentDevices.camera}
        >
          {devices.cameraDevices.map((device) => {
            return (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            );
          })}
        </select>
      ) : null}
      <div>
        {currentDevices.camera ? (
          <>
            video:{" "}
            {findDeviceLabel(devices.cameraDevices, currentDevices.camera)}
          </>
        ) : null}
        {videoStarted ? (
          <button
            onClick={() => {
              stopPreviewVideo();
            }}
          >
            Stop camera preview
          </button>
        ) : (
          <button
            onClick={() => {
              setVideoStarted(true);
            }}
          >
            Check your camera
          </button>
        )}
      </div>
      <div>
        <label>Join with video off</label>
        <input
          type="checkbox"
          checked={joinConfig.videoOff}
          name="videoOff"
          onChange={checkJoinConfigHandler}
        ></input>
      </div>

      <div>
        <label htmlFor="speaker-output-level">Output level:</label>
        <progress id="speaker-output-level" max="100" value="0"></progress>
        <button onClick={audioOutputTester} className="test-speaker">
          Test Speaker
        </button>
      </div>
      {devices.speakerDevices ? (
        <select
          onChange={speakerDeviceSelectHandler}
          default={currentDevices.speaker}
        >
          {devices.speakerDevices.map((device) => {
            return (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            );
          })}
        </select>
      ) : null}
      {currentDevices.speaker ? (
        <div>
          Audio output:{" "}
          {findDeviceLabel(devices.speakerDevices, currentDevices.speaker)}
        </div>
      ) : null}

      <div>
        <label htmlFor="mic-input-level">Input level:</label>
        <progress id="mic-input-level" max="100" value="0"></progress>
        <button onClick={audioInputTester} className="test-microphone">
          Test Microphone
        </button>
      </div>
      {devices.microphoneDevices ? (
        <select
          onChange={microphoneDeviceSelectHandler}
          default={currentDevices.microphone}
        >
          {devices.microphoneDevices.map((device) => {
            return (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            );
          })}
        </select>
      ) : null}
      {currentDevices.microphone ? (
        <div>
          Audio input:{" "}
          {findDeviceLabel(
            devices.microphoneDevices,
            currentDevices.microphone
          )}
        </div>
      ) : null}
      <div>
        <label>Join with mic muted</label>
        <input
          type="checkbox"
          checked={joinConfig.micMuted}
          name="micMuted"
          onChange={checkJoinConfigHandler}
        ></input>
      </div>

      <div>
        there are currently {users ? users.length : "0"} user(s) in the room
      </div>
      <button
        onClick={() => {
          setEntering(true);
          joinZoomSession();
        }}
      >
        Enter session
      </button>
      {entering ? <div>Entering session...</div> : null}
    </div>
  );
};

export default PreZoomContainer;
