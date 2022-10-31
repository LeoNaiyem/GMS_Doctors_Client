import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
