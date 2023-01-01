import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ appointment }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  const { _id, name, email, price, service, date } = appointment;
  useEffect(() => {
    fetch("http://localhost:5001/create-payment-intent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [appointment]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      console.log("[error]", error);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    //confirm payment
    const { paymentIntent, error: intendError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (intendError) {
      setCardError(intendError?.message);
    } else {
      setCardError("");
      toast.success("Congress! Payment is successful");
      setSuccess(true);
      setTransactionId(paymentIntent.id);

      //store payment information in DB
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
        customerName: name,
        providerEmail: email,
      };
      fetch(`http://localhost:5001/appointments/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount === 1) {
            navigate("/dashboard");
          }
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid sx={{ width: "60%" }} container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "lightblue",
              height: "100%",
              py: 1,
              px: 3,
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6">
              Hello Mr. <span style={{ color: "purple" }}>{name}</span>
            </Typography>
            <Typography variant="subtitle2">
              Your Appointment Date :{" "}
              <span style={{ color: "purple" }}>{date}</span>
            </Typography>
            <Typography variant="subtitle2">
              Please Pay For : <span style={{ color: "purple" }}>{service}</span>{" "}
              Servicing{" "}
            </Typography>
            <Typography variant="subtitle2">
              ID : <span style={{ color: "purple" }}>{id}</span>{" "}
            </Typography>{" "}
            <Typography variant="subtitle2">
              Pay : <span style={{ color: "purple" }}>${price}</span> to confirm
              your appointment
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#ccfffd",
              height: "100%",
              py: 1,
              px: 3,
              borderRadius: "10px",
            }}
          >
            <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="success"
                type="submit"
                disabled={!stripe || !clientSecret || success}
              >
                Pay
              </Button>
            </form>
            {transactionId && (
              <Typography
                sx={{ textAlign: "center", mt: 1, fontWeight: 500 }}
                component="div"
                variant="caption"
                color="secondary"
              >
                <span style={{ color: "blue" }}>Your Transaction Id:</span>{" "}
                {transactionId}
              </Typography>
            )}
            {cardError && (
              <Typography
                sx={{ textAlign: "center", mt: 1, fontWeight: 500 }}
                component="div"
                variant="caption"
                color="error"
              >
                {cardError}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Link style={{textDecoration:"none", margin:"50px auto"}} to="/dashboard">
          <Button variant="contained" color="secondary">Pay Later</Button>{" "}
        </Link>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;
