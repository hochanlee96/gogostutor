import { useState, useEffect, useContext } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";

import { AuthContext } from "../../../shared/context/auth-context";

export const useStripeConnect = (connectedAccountId) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/payments/account-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.accessToken,
            },
            body: JSON.stringify({
              account: connectedAccountId,
            }),
          }
        );

        if (!response.ok) {
          // Handle errors on the client side here
          const { error } = await response.json();
          throw ("An error occurred: ", error);
        } else {
          const { client_secret: clientSecret } = await response.json();
          return clientSecret;
        }
      };

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
          fetchClientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              colorPrimary: "#635BFF",
            },
          },
        })
      );
    }
  }, [connectedAccountId, auth.accessToken]);

  return stripeConnectInstance;
};

export default useStripeConnect;
