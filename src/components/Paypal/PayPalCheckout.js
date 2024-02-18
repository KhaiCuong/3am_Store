import { useShoppingCart } from "context/ShoppingCartContext";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostPayment } from "services/ApiService";
import Swal from "sweetalert2";

function PayPalCheckout() {
  const paypal = useRef();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const { cartItems } = useShoppingCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  // eslint-disable-next-line no-unused-vars

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + Number(cartItems[i].price) * Number(cartItems[i].quantity);
  }

  useEffect(() => {
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
  }, []);

  const AddPayment = async () => {
    try {
      const dataPayment = {
        orderId: id,
        fullname: usertoken.fullname ? usertoken.fullname : "",
      };
      const response = await PostPayment(dataPayment);
      if (response.status === 201) {
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
              localStorage.removeItem("shopping-cart");
              window.location.reload();
            } catch (error) {
              console.log("err", error);
            }
          }
        });
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
              localStorage.removeItem("shopping-cart");
              window.location.reload();
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
          localStorage.removeItem("shopping-cart");
          window.location.reload();
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
