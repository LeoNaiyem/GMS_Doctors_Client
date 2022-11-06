import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loader from "../Shared/Loader";
import Navigation from "../Shared/Navigation";
import AppointmentBanner from "./AppointmentBanner";
import AppointmentForm from "./AppointmentForm";

const Appointment = () => {
  const getData = async () => {
    const res = await fetch(`http://localhost:5001/services/names`);
    return res.json();
  };
  const {
    data: serviceNames,
    error,
    isError,
    isLoading,
  } = useQuery("serviceNames", getData);

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
    <>
      <Navigation />
      <AppointmentBanner />
      <AppointmentForm serviceNames={serviceNames} />
    </>
  );
};

export default Appointment;
