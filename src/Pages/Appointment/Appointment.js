import React from 'react';
import Navigation from '../Shared/Navigation';
import AppointmentBanner from './AppointmentBanner';
import AppointmentForm from './AppointmentForm';

const Appointment = () => {
    return (
        <>
          <Navigation/>
          <AppointmentBanner/>
          <AppointmentForm/>
        </>
    );
};

export default Appointment;