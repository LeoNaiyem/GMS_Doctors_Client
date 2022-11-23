import { Box, Button, Grid, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const { _id, name, email } = appointment;
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
          <Box
            sx={{
              backgroundColor: "skyBlue",
              color: "royalBlue",
              height: "100%",
              py: 1,
              px: 3,
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6"> Please Pay For : {id} </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "yellowGreen",
              color: "white",
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;
