import { useShoppingCart } from "context/ShoppingCartContext";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetDetailByOrderID } from "services/ApiService";
import { PutPaymenttatus } from "services/ApiService";
import Swal from "sweetalert2";

function PayPalCheckout() {
  const paypal = useRef();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const { cartItems } = useShoppingCart();
  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + Number(cartItems[i].price) * Number(cartItems[i].quantity);
  }

  useEffect(() => {
    const fetchProductDataByID = async () => {
      if (total === 0) {
        const response = await GetDetailByOrderID(id);
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i++) {
            total = total + Number(response.data[i].price) * Number(response.data[i].quantity);
          }
          // eslint-disable-next-line no-unused-vars
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: "Your Order",
                      amount: {
                        currency_code: "USD",
                        value: total,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();

                console.log("success", order);
                setTransactionStatus("success");
              },
              onError: (err) => {
                console.log(err);
                setTransactionStatus("failure");
              },
            })
            .render(paypal.current);
        } else {
          Swal.fire({
            title: "Payment faild",
            text: "Please try again.",
            icon: "error",
            confirmButtonText: "ok",
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                navigate("/home");
              } catch (error) {
                console.log("err", error);
              }
            }
          });
        }
      }
    };
    fetchProductDataByID();
  }, []);

  const AddPayment = async () => {
    try {
      const response = await PutPaymenttatus(id, true);
      if (response.status === 200) {
        Swal.fire({
          title: "Completed",
          text: "Order successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              navigate("/home");
            } catch (error) {
              console.log("err", error);
            }
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Payment faild",
        text: "Please try again.",
        icon: "error",
      });
    }
  };
  if (transactionStatus === "success") {
    AddPayment();
  }

  if (transactionStatus === "failure") {
    Swal.fire({
      title: "Payment faild",
      text: "Please try again.",
      icon: "error",
      confirmButtonText: "ok",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          navigate("/home");
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  }

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default PayPalCheckout;
