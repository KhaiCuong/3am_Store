import axios from "axios";

async function GetProductList() {
  const data = await axios.get("http://localhost:5051/api/Product/GetProductList");
  return data.data;
}

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
  return data;
}

export {
  GetProductList,
  GetProductByID,
  GetProductByCategoryID,
  GetProductImageByID,
  GetUserByID,
  GetFeedbacksByProductId,
  PostFeedback,
};
