export const API_GetProfileData = async (tutorId, accessToken) => {
  try {
    if (tutorId && accessToken) {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      return response;
    } else {
      throw new Error("Invalid parameters");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_Login = async (body) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutors/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const API_GoogleLogin = async (body) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutors/login/social-login/google",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const API_FacebookLogin = async (body) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutors/login/social-login/facebook",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_CheckEmailExists = async (email) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/email-exists?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_Signup = async (body) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutors/signup",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_SendVerificationCode = async (tutorId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/tutors/${tutorId}/send-verification-code`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_CheckVerificationCode = async (tutorId, body, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/tutors/${tutorId}/check-verification-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetChatRooms = async (tutorId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/chat-rooms/tutors/${tutorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetChatMessages = async (chatRoomId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/chats/chat-rooms/${chatRoomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_ApplyForApproval = async (tutorId, body, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/approval`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_UpdateProfileData = async (tutorId, body, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetTutorSubjects = async (tutorId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/subjects`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_ModifyTutorSubjects = async (
  tutorId,
  action,
  subjectId,
  accessToken
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/subjects`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ action: action, subjectId: subjectId }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetTotalSubjects = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/subjects`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_AddNewSession = async (tutorId, body, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetTutorSessions = async (tutorId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/sessions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const API_DeleteTutorSessions = async (
  tutorId,
  sessionId,
  accessToken
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/tutors/${tutorId}/sessions/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_UpdateTutorSession = async (
  tutorId,
  sessionId,
  body,
  accessToken
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/tutors/${tutorId}/sessions/${sessionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_InitializeSession = async (
  tutorId,
  sessionId,
  accessToken
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/tutors/${tutorId}/sessions/${sessionId}/token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_UpdateProfileImage = async (
  tutorId,
  imageURL,
  accessToken
) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/profile/imageURL`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ imageURL: imageURL }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetProfileImageFromCloudinary = async (imageURL) => {
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API_GetCreditData = async (tutorId, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/credits`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const API_Payout = async (tutorId, body, accessToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/${tutorId}/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
