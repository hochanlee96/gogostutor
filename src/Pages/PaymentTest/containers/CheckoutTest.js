import React, { useCallback, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { AuthContext } from "../../../shared/context/auth-context";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const CheckoutTest = () => {
  const auth = useContext(AuthContext);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    console.log("fetching session secret...");
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/payments/checkout-session/testSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      }
    );
    const data = await response.json();
    return data.client_secret;
  }, [auth.accessToken]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export const ReturnTest = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("return test compo");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    const fetchSessionStatus = async (sessionId) => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/payments/checkout-session/status?session_id=${sessionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = response.json();
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    };
    fetchSessionStatus(sessionId);
  }, [auth.accessToken]);

  if (status === "open") {
    navigate("/checkout-test");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};
