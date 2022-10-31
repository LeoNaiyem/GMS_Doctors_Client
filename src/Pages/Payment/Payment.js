import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51LU0MsDYhOb0jQR7qnAiJPYWAXrEkuGZ11rw17hcndkLJO25QbEM3ge1RY226Gq9nrw31WCbzLssb5Bvp2t1vzYc00KXIO2y5B"
);
const Payment = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
