import { useState, useEffect, useContext } from "react";
import ZoomVideo from "@zoom/videosdk";
import ZoomContext from "../../../shared/context/zoom-context";
import MediaContext from "../../../shared/context/media-context";

import ZoomComponent from "./ZoomComponent";

const ZoomContainer = ({ meetingArgs }) => {
  const { topic, signature, name } = meetingArgs;

  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(" ");
  const [mediaStream, setMediaStream] = useState();
  // const [status, setStatus] = useState(false);

  const client = useContext(ZoomContext);

  useEffect(() => {
    const init = async () => {
      client.init("US-EN", "CDN");
      console.log("before client.join");
      try {
        setLoadingText("Joining session...");
        await client.join(topic, signature, name);

        const stream = client.getMediaStream();
        setMediaStream(stream);
        setIsLoading(false);
      } catch (err) {
        console.log("Error Joining Meeting", err);
        setIsLoading(false);
        // message.error(err.reason);
      }
    };

    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, [signature, client, topic, name]);

  return (
    <div>
      {loading && <div>{loadingText}</div>}
      {!loading && (
        <MediaContext.Provider value={mediaStream}>
          <ZoomComponent />
        </MediaContext.Provider>
      )}
    </div>
  );
};

export default ZoomContainer;
