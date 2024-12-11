import React, { useState, useContext } from "react";
import useStripeConnect from "./useStripeConnect";
import { AuthContext } from "../../../shared/context/auth-context";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

const PaymentTest = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [onboardingExited, setOnboardingExited] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();
  const stripeConnectInstance = useStripeConnect(connectedAccountId);
  const auth = useContext(AuthContext);

  return (
    <div className="container">
      <div className="banner">
        <h2>Rocket Rides</h2>
      </div>
      <div className="content">
        {!connectedAccountId && <h2>Get ready for take off</h2>}
        {connectedAccountId && !stripeConnectInstance && (
          <h2>Add information to start accepting money</h2>
        )}
        {!connectedAccountId && (
          <p>
            Rocket Rides is the world's leading air travel platform: join our
            team of pilots to help people travel faster.
          </p>
        )}
        {!accountCreatePending && !connectedAccountId && (
          <div>
            <button
              onClick={async () => {
                setAccountCreatePending(true);
                setError(false);
                const response = await fetch(
                  process.env.REACT_APP_BACKEND_URL + `/payments/accounts`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth.accessToken,
                    },
                  }
                );
                const data = await response.json();

                setAccountCreatePending(false);
                const { account, error } = data;

                if (account) {
                  setConnectedAccountId(account);
                }

                if (error) {
                  setError(true);
                }
              }}
            >
              Sign up
            </button>
          </div>
        )}
        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding
              onExit={() => setOnboardingExited(true)}
            />
          </ConnectComponentsProvider>
        )}
        {error && <p className="error">Something went wrong!</p>}
        {(connectedAccountId || accountCreatePending || onboardingExited) && (
          <div className="dev-callout">
            {connectedAccountId && (
              <p>
                Your connected account ID is:{" "}
                <code className="bold">{connectedAccountId}</code>
              </p>
            )}
            {accountCreatePending && <p>Creating a connected account...</p>}
            {onboardingExited && (
              <p>The Account Onboarding component has exited</p>
            )}
          </div>
        )}
        <div className="info-callout">
          <p>
            This is a sample app for Connect onboarding using the Account
            Onboarding embedded component.{" "}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=embedded"
              target="_blank"
              rel="noopener noreferrer"
            >
              View docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentTest;
