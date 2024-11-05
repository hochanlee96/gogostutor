import { useContext } from "react";
import ZoomContext from "../context/zoom-context";
import ZoomVideo from "@zoom/videosdk";

const Test = () => {
  const { devices } = useContext(ZoomContext);
  console.log("devices", devices);
  const localVideoTrack = ZoomVideo.createLocalVideoTrack(
    devices.cameraDevices[0].deviceId
  );

  localVideoTrack.start(document.querySelector("#preview-camera-video"));
  return (
    <div>
      <h1>This is a Test Page</h1>
      <p>This is a test component.</p>
      <video
        id="preview-camera-video"
        height="1080"
        width="1920"
        playsinline
      ></video>
    </div>
  );
};

export default Test;
