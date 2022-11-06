import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Shared/Loader";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51LU0MsDYhOb0jQR7qnAiJPYWAXrEkuGZ11rw17hcndkLJO25QbEM3ge1RY226Gq9nrw31WCbzLssb5Bvp2t1vzYc00KXIO2y5B"
);
const Payment = () => {
  const { id } = useParams();
  const getData = async () => {
    const res = await fetch(
      `http://localhost:5001/appointments/${id}`
    );
    return res.json();
  };
  const {
    data: appointment,
    error,
    isError,
    isLoading,
  } = useQuery(["appointments", id], getData);

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    toast.error(error.message);
  }
  if (isError) {
    toast.error(error.message);
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm appointment={appointment} />
    </Elements>
  );
};

export default Payment;
