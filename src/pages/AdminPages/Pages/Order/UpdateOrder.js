import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import { GetOrderByID, GetDetailByOrderID } from "services/ApiService";
import moment from "moment";
import Swal from "sweetalert2";
import { PutOrder } from "services/ApiService";
import { GetPaymentByOrderID } from "services/ApiService";
import { OrderDetailItem } from "./sections/OrderDetailItem";

export default function UpdateOrder() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [details, setDetails] = useState([]);
  const [payment, setPayment] = useState(null);

  console.log("details", details);
  console.log("details", payment);

  const handleBack = () => {
    navigate("/admin/orders");
  };
  const { id } = useParams();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await PutOrder(id, order);
          if (response.status === 200) {
            Swal.fire("Updated!", "Your Order has been updated.", "success");
            // handle success or navigate to another page
            navigate("/admin/orders");
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  const handleViewPayment = (e, pm) => {
    e.preventDefault();
    if (pm !== null) {
      console.log("payment", pm);
      Swal.fire({
        title: "Payment Information",
        html: `
            <div>
              <strong>Payment Date:</strong>${moment(pm.createAt).format("DD/MM/YYYY")} <br>
              <strong>Payment Status:</strong> ${pm.status ? "Paid" : "Not Pay"}<br>
              <strong>Payment Option:</strong> Paypal

            </div>
          `,
        confirmButtonText: "Close",
      });
    } else {
      e.preventDefault();
      Swal.fire({
        title: "Payment Information",
        html: `
        <div>
        <strong>Payment Option:</strong> Ship COD
        </div>
      `,
        confirmButtonText: "Close",
      });
    }
  };

  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const response = await GetOrderByID(id);
        if (response.status === 200) {
          setOrder(response.data);
          const OrderDeTail = await GetDetailByOrderID(id);
          if (OrderDeTail.status === 200) {
            setDetails(OrderDeTail.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataPayment = async () => {
      try {
        const responsePm = await GetPaymentByOrderID(id);
        if (responsePm.status === 200) {
          setPayment(responsePm.data);
          console.log("payment ds", payment);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataOrder();
    fetchDataPayment();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Update Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label w-100">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={order.username}
            name="username"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="address" className="form-label w-100">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={order.address}
            name="address"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="phone_number" className="form-label w-100">
            Phone number:
          </label>
          <input
            type="number"
            className="form-control w-100"
            id="phone_number"
            value={order.phone_number}
            name="phone_number"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="status" className="form-label w-100">
            Status:
          </label>
          <select id="status" className="form-control" name="status" onChange={handleChangeInput}>
            <option
              value="Preparing"
              selected={order.status === "Preparing"}
              style={{ color: "orange" }}
            >
              Preparing
            </option>
            <option
              value="Completed"
              selected={order.status === "Completed"}
              style={{ color: "green" }}
            >
              Completed
            </option>
            <option
              value="Delivery"
              selected={order.status === "Delivery"}
              style={{ color: "blue" }}
            >
              Delivery
            </option>
            <option
              value="Canceled"
              selected={order.status === "Canceled"}
              style={{ color: "red" }}
            >
              Canceled
            </option>
          </select>
        </div>
        <div className="row">
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="quantity" className="form-label w-100">
              Quantity:
            </label>
            <input
              type="number"
              className="form-control"
              disabled
              id="quantity"
              value={order.quantity ? order.quantity : 0}
              name="quantity"
              style={{ width: "80%" }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="totalPrice" className="form-label w-100">
              Total Price: ($)
            </label>
            <input
              type="number"
              disabled
              className="form-control"
              id="totalPrice"
              value={order.totalPrice ? order.totalPrice : 0}
              name="totalPrice"
              style={{ width: "80%" }}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <div className="mb-5 mt-3">
          <label htmlFor="createAt" className="form-label w-100">
            Order date:
          </label>
          <input
            type="text"
            className="form-control"
            disabled
            id="createAt"
            value={moment(order.createAt).format("DD/MM/YYYY")}
            name="createAt"
            onChange={handleChangeInput}
          />
        </div>

        <div className="">
          <h4 className="text-center bold">
            <b>Order Detail</b>
          </h4>

          <div className="d-flex align-items-center justify-content-start flex-wrap ">
            <div className="p-2 w-100" style={{ overflowY: "scroll", height: "360px" }}>
              {details.map((item) => (
                <OrderDetailItem key={item.detailId} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-4">
          <div className="d-flex justify-content-between align-items-center w-50">
            <button
              className="btn btn-secondary d-flex align-items-center"
              onClick={() => handleBack()}
            >
              <Icon>arrow_back_ios</Icon> <span> &nbsp;Back</span>
            </button>
            <button
              className="btn btn-success d-flex align-items-center"
              onClick={(e) => handleViewPayment(e, payment)}
            >
              <Icon>sticky_note_2</Icon> <span> &nbsp;Payment Detail</span>
            </button>
            <button type="submit" className="btn btn-primary d-flex align-items-center">
              <Icon>data_saver_on</Icon> <span> &nbsp;Update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
