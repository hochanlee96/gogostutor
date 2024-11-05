import { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import classes from "./Chatting.module.css";
import { FaSearch } from "react-icons/fa";

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
  const [currentRoom, setCurrentRoom] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [userId, setUserId] = useState(state ? state.userId : "");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [, setMessages] = useState([]);
  const [processedMessageList, setProcessedMessageList] = useState([]);

  const auth = useContext(AuthContext);
  const socket = auth.socket;

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/get-rooms",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        //
        const dummy_rooms = [];
        const numberOfDuplicates = 20;

        for (let i = 0; i < numberOfDuplicates; i++) {
          dummy_rooms.push(...data.roomList);
        }
        setRoomList(dummy_rooms);
        //

        // setRoomList(data.roomList);
      } else if (data.status === 401) {
        console.log("verifying refresh token");
        auth.verifyRefreshToken();
      }
    } catch (err) {
      console.log(err);
    }
  }, [auth]);

  const fetchMessages = useCallback(
    async (userId) => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/tutor/get-messages/" + userId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.accessToken,
            },
          }
        );
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
          console.log("joining room: ", data.roomId);
          socket.emit("join_room", auth.userId);
        } else if (data.status === 401) {
          console.log("verifying refresh token");
          auth.verifyRefreshToken();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [auth, socket]
  );
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5001");
  //   setSocket(newSocket);
  // }, []);

  useEffect(() => {
    if (auth.userId) {
      fetchRooms();
      console.log("fetchRooms");
      if (userId) {
        console.log(userId);
        fetchMessages(userId);
      }
    }
  }, [userId, auth.userId, fetchRooms, fetchMessages]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (chatData) => {
        console.log("received message: ", chatData);
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
    if (userId && message) {
      socket.emit("sendMessage", {
        userId: userId,
        tutorId: auth.userId,
        speakerId: auth.userId,
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
                      fetchMessages(room.userId._id);
                      setUserId(room.userId._id);
                      setUserName(
                        room.userId.profile.firstName +
                          " " +
                          room.userId.profile.lastName
                      );
                      setRoomId(room._id);
                      setCurrentRoom(room);
                    }}
                  >
                    <div className={classes.ImageBox}>
                      <img
                        className={classes.ProfileImage}
                        src={room.userId.profile.imageURL}
                        alt=""
                      />
                    </div>
                    <div className={classes.RoomInfoBox}>
                      <div className={classes.RoomTitleBox}>
                        {room.userId.profile.firstName +
                          " " +
                          room.userId.profile.lastName}
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
          {userId ? (
            <>
              <div className={classes.ChatterImageBox}>
                <img
                  className={classes.ChatterImage}
                  src={
                    currentRoom
                      ? currentRoom.userId.profile.imageURL
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wafDKRSMF8lFcbu24YYkhocJtZT46iNXsg&s"
                  }
                  alt=""
                />
              </div>
              <div className={classes.ChatterTitle}>{userName}</div>
            </>
          ) : null}
        </div>

        <div
          className={classes.CurrentMessages}
          onFocus={() => console.log("focused")}
        >
          {processedMessageList.map((chatData, index) => {
            if (chatData.type === "chat") {
              const userId = chatData.roomId.userId._id;
              const tutorId = chatData.roomId.tutorId._id;
              let myMessage = true;
              let currentSpeaker;
              if (chatData.speakerId === tutorId) {
                currentSpeaker =
                  chatData.roomId.tutorId.profile.firstName +
                  " " +
                  chatData.roomId.tutorId.profile.lastName;
              } else if (chatData.speakerId === userId) {
                myMessage = false;
                currentSpeaker =
                  chatData.roomId.userId.profile.firstName +
                  " " +
                  chatData.roomId.userId.profile.lastName;
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
          {userId ? (
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
