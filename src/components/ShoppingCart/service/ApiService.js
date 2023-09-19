import axios from "axios";

async function GetProductByID(id) {
  const data = await axios.get(`http://localhost:5051/api/Product/GetProduct/${id}`);
  return data.data;
}

async function GetProductByCategoryID(id) {
  const data = await axios.get(
    `http://localhost:5051/api/Product/GetProductListByCategoryId/${id}`
  );
  return data.data;
}
async function GetCategoryByID(id) {
  const data = await axios.get(`http://localhost:5051/api/Category/GetCategory/${id}`);
  return data.data;
}

async function GetProductImageByID(id) {
  const data = await axios.get(
    `http://localhost:5051/api/ProductImage/GetProductImagesByProductId/${id}`
  );
  return data.data;
}

async function GetUserByID(id) {
  const data = await axios.get(`http://localhost:5051/api/User/GetUser/${id}`);
  return data.data;
}

async function GetFeedbacksByProductId(id) {
  const data = await axios.get(
    `http://localhost:5051/api/Feedback/GetFeedbackListByProductId/${id}`
  );
  return data.data;
}

async function PostFeedback(Feedback) {
  const data = await axios.post("http://localhost:5051/api/Feedback/AddFeedback", Feedback);
  return data.data;
}

async function PostOrder(order) {
  const data = await axios.post("http://localhost:5051/api/Order/AddOrder", order);
  return data;
}

async function PostOrderDetail(detail) {
  const data = await axios.post("http://localhost:5051/api/OrderDetail/AddOrderDetail", detail);
  return data.data;
}

async function PutProductQuantity(id, quantity) {
  const data = await axios.put(
    `http://localhost:5051/api/Product/UpdateProductInStock/${id}?quantity=${quantity}`
  );
  return data.data;
}

export {
  GetProductByID,
  GetProductByCategoryID,
  GetProductImageByID,
  GetUserByID,
  GetFeedbacksByProductId,
  PostFeedback,
  GetCategoryByID,
  PostOrder,
  PostOrderDetail,
  PutProductQuantity,
};
