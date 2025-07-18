import { useState } from "react";
const DeleteAccount = () => {
  const [emailInput, setEmailInput] = useState("");
  const inputChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const deleteAccount = async (event) => {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/students/delete-account",
      {
        method: "DELETE",
        body: JSON.stringify({
          email: emailInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert("Delete account");
  };
  return (
    <div>
      <form
        onSubmit={deleteAccount}
        style={{
          width: "400px",
          paddingTop: "200px",
          paddingLeft: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label>Enter email address you want to delete</label>
        <input
          type="email"
          value={emailInput}
          onChange={inputChangeHandler}
          placeholder="Email"
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteAccount;
