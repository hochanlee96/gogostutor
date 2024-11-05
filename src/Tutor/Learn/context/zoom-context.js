import { createContext } from "react";

const ZoomContext = createContext({
  client: null,
  stream: null,
  devices: null,
  currentDevices: null,
  changeDevice: null,
  joinConfig: null,
  setJoinConfig: null,
  joinZoomSession: null,
  enterZoomSession: null,
  endZoomSession: null,
  users: null,
});

export default ZoomContext;
