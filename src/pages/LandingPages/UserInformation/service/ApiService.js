import axios from "axios";

async function GetOrdersByProductID(id) {
  const data = await axios.get(`http://localhost:5051/api/Order/GetOrderListByUserId/${id}`);
  return data.data;
}

async function GetDetailByOrderID(id) {
  const data = await axios.get(
    `http://localhost:5051/api/OrderDetail/GetOrderDetailListByOrderId/${id}`
  );
  return data.data;
}

async function GetUserByID(id) {
  const data = await axios.get(`http://localhost:5051/api/User/GetUser/${id}`);
  return data.data;
}

async function PutUserInfor(id, newData) {
  const data = await axios.put(`http://localhost:5051/api/User/UpdateUser/${id}`, newData);
  return data.data;
}

export { GetUserByID, GetOrdersByProductID, GetDetailByOrderID, PutUserInfor };
