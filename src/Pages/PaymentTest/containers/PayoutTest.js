import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

const PayoutTest = () => {
  const auth = useContext(AuthContext);
  const payoutHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/payments/payout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      }
    );
    const data = response.json();
    console.log(data);
  };
  return (
    <div>
      Payout Test
      <button onClick={payoutHandler}>Payout</button>
    </div>
  );
};

export default PayoutTest;
