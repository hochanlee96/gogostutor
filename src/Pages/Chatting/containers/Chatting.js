import { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import {
  API_GetChatRooms,
  API_GetChatMessages,
  API_GetProfileImageFromCloudinary,
} from "../../../API";

import classes from "./Chatting.module.css";
import { FaSearch } from "react-icons/fa";
import emptyUserImage from "../../../shared/assets/icons/user.png";

const addDelimiters = (chatData) => {
  const result = [];
  let lastDate = null;

  chatData.forEach((item) => {
    const currentDate = item.createdAt.split("T")[0];
    const modified_item = { ...item, type: "chat" };

    // If the date changes, add a delimiter object
    if (currentDate !== lastDate) {
      result.push({ type: "delimiter", date: currentDate });
      lastDate = currentDate; // Update the last date
    }

    // Add the original item to the result
    result.push(modified_item);
  });

  const reversed = [];
  for (let i = result.length - 1; i >= 0; i--) {
    reversed.push(result[i]);
  }

  return reversed;
  // return result;
};

const Chatting = () => {
  const { state } = useLocation();
  const [roomId, setRoomId] = useState(""); // 나중에 통합해야함
  const [currentStudentImage, setCurrentStudentImage] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [studentId, setStudentId] = useState(state ? state.studentId : "");
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");
  const [, setMessages] = useState([]);
  const [processedMessageList, setProcessedMessageList] = useState([]);

  const auth = useContext(AuthContext);
  const socket = auth.socket;

  // const getChatRooms = useCallback(async () => {
  //   try {
  //     const response = await API_GetChatRooms(auth.id, auth.accessToken);
  //     const data = await response.json();
  //     if (data.status === 200) {
  //       //
  //       const dummy_rooms = [];
  //       const numberOfDuplicates = 20;

  //       for (let i = 0; i < numberOfDuplicates; i++) {
  //         dummy_rooms.push(...data.roomList);
  //       }
  //       setRoomList(dummy_rooms);
  //       //

  //       // setRoomList(data.roomList);
  //     } else if (data.status === 401) {
  //       console.log("verifying refresh token");
  //       auth.verifyRefreshToken();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [auth]);

  const getChatMessages = useCallback(
    async (roomId) => {
      try {
        const response = await API_GetChatMessages(roomId, auth.accessToken);
        const data = await response.json();
        if (data.status === 200) {
          console.log(data);
          // const processed_messages = addDelimiters(data.messageList);
          // console.log("!!!", processed_messages);
          // setMessages(data.messageList);

          setMessages(() => {
            setProcessedMessageList(addDelimiters(data.messageList));
            return data.messageList;
          });
          setRoomId(data.roomId);
          // socket.emit("join-room", auth.id);
        } else if (data.status === 401) {
          // console.log("verifying refresh token");
          // auth.verifyRefreshToken();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [auth]
  );
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5001");
  //   setSocket(newSocket);
  // }, []);

  useEffect(() => {
    const initializeMessageRoom = async (tutorId, accessToken) => {
      const response = await API_GetChatRooms(tutorId, accessToken);
      const data = await response.json();
      const roomList = data.roomList;
      setRoomList(roomList);
      socket.emit("join-room", auth.id);

      if (state && state.studentId) {
        if (state.studentData && state.studentData.iamgeURL) {
          const image = await API_GetProfileImageFromCloudinary(
            state.studentData.iamgeURL
          );
          setCurrentStudentImage(image);
        }
        let studentRoom = roomList.find(
          (room) => room.studentId === state.studentId
        );
        if (studentRoom) {
          setRoomId(studentRoom._id);
          getChatMessages(studentRoom._id);
        } else {
          setStudentId(state.studentId);
          setStudentName(state.studentData.fullName);
        }
      }
    };
    if (auth) {
      initializeMessageRoom(auth.id, auth.accessToken);
    }
  }, [getChatMessages, state, auth]);

  // useEffect(() => {
  //   if (auth && auth.accessToken) {
  //     getChatRooms();
  //   }
  // }, [auth, getChatRooms]);

  // useEffect(() => {
  //   if (auth && roomId) {
  //     getChatMessages(roomId);
  //   }
  // }, [auth, getChatMessages, roomId]);

  useEffect(() => {
    if (socket) {
      socket.on("emit-message", (chatData) => {
        console.log("touched");
        if (roomId && chatData.roomId._id === roomId) {
          setMessages((messages) => {
            const newMessages = [...messages, chatData];
            setProcessedMessageList(addDelimiters(newMessages));
            return newMessages;
          });
        }
      });
    }
  }, [socket, roomId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentId && message) {
      socket.emit("send-message", {
        studentId: studentId,
        tutorId: auth.id,
        speakerId: auth.id,
        roomId,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.LeftBox}>
        <div className={classes.TitleBox}>Messages</div>
        <div className={classes.SearchBarBox}>
          <div className={classes.SearchBar}>
            <div className={classes.IconBox}>
              <FaSearch />
            </div>
            <input
              className={classes.InputField}
              placeholder="Search Messages"
            />
          </div>
        </div>
        <div className={classes.RoomListBox}>
          {roomList
            ? roomList.map((room, index) => {
                return (
                  <div
                    className={
                      roomId === room._id
                        ? classes.RoomBoxCurrent
                        : classes.RoomBox
                    }
                    key={index}
                    onClick={() => {
                      getChatMessages(room._id);
                      setStudentId(room.studentId._id);
                      setStudentName(
                        room.studentId.profile.firstName +
                          " " +
                          room.studentId.profile.lastName
                      );
                      setRoomId(room._id);
                    }}
                  >
                    <div className={classes.ImageBox}>
                      <img
                        className={classes.ProfileImage}
                        src={room.studentId.profile.imageURL}
                        alt=""
                      />
                    </div>
                    <div className={classes.RoomInfoBox}>
                      <div className={classes.RoomTitleBox}>
                        {room.studentId.profile.firstName +
                          " " +
                          room.studentId.profile.lastName}
                      </div>
                      <div className={classes.RoomLastMessageBox}>
                        Last message
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className={classes.CenterBox}>
        <div className={classes.CurrentChatterBox}>
          {studentId ? (
            <>
              <div className={classes.ChatterImageBox}>
                <img
                  className={classes.ChatterImage}
                  src={
                    currentStudentImage ? currentStudentImage : emptyUserImage
                  }
                  alt=""
                />
              </div>
              <div className={classes.ChatterTitle}>{studentName}</div>
            </>
          ) : null}
        </div>

        <div
          className={classes.CurrentMessages}
          onFocus={() => console.log("focused")}
        >
          {processedMessageList.map((chatData, index) => {
            if (chatData.type === "chat") {
              const studentId = chatData.roomId.studentId._id;
              const tutorId = chatData.roomId.tutorId._id;
              let myMessage = true;
              let currentSpeaker;
              if (chatData.speakerId === tutorId) {
                currentSpeaker =
                  chatData.roomId.tutorId.profile.firstName +
                  " " +
                  chatData.roomId.tutorId.profile.lastName;
              } else if (chatData.speakerId === studentId) {
                myMessage = false;
                currentSpeaker =
                  chatData.roomId.studentId.profile.firstName +
                  " " +
                  chatData.roomId.studentId.profile.lastName;
              }

              return (
                <div
                  key={index}
                  className={
                    myMessage ? classes.MyMessageBox : classes.OthersMessageBox
                  }
                >
                  {myMessage ? (
                    <div>{chatData.message}</div>
                  ) : (
                    <div>
                      {currentSpeaker}: {chatData.message}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div key={index} className={classes.DateDelimiterBox}>
                  <div>{chatData.date}</div>
                </div>
              );
            }
          })}
        </div>

        <div className={classes.MessageInputBox}>
          {studentId ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                placeholder="Aa"
                onChange={(event) => setMessage(event.target.value)}
              />

              <button type="submit">Send</button>
            </form>
          ) : null}
        </div>
      </div>
      {/* <div className={classes.RightBox}>tutor profile</div> */}
    </div>
  );
};

export default Chatting;
