import axios from "axios";

async function PutUserInfor(id, newData) {
  const data = await axios.put(`http://localhost:5051/api/User/UpdateUser/${id}`, newData);
  return data.data;
}

async function GetUserList() {
  const data = await axios.get("http://localhost:5051/api/User/GetUserList");
  return data.data;
}

async function DeleteUserByID(id) {
  const data = await axios.delete(`http://localhost:5051/api/User/DeleteUser/${id}`);
  return data.data;
}

async function PostUser(newData) {
  const data = await axios.post("http://localhost:5051/api/User/AddUser", newData);
  return data;
}

async function GetProductList() {
  const data = await axios.get("http://localhost:5051/api/Product/GetProductList");
  return data.data;
}

async function GetProductByID(id) {
  const data = await axios.get(`http://localhost:5051/api/Product/GetProduct/${id}`);
  return data.data;
}

async function GetProductImageByID(id) {
  const data = await axios.get(
    `http://localhost:5051/api/ProductImage/GetProductImagesByProductId/${id}`
  );
  return data.data;
}

async function PutProductStatus(id) {
  const data = await axios.put(`http://localhost:5051/api/Product/UpdateStatusProduct/${id}`);
  return data.data;
}

async function PutProduct(id, newData) {
  const data = await axios.put(`http://localhost:5051/api/Product/UpdateProduct/${id}`, newData);
  return data.data;
}

async function PostNewImage(id, files) {
  const data = await axios.post(
    `http://localhost:5051/api/ProductImage/UpdateProductImagesByProductId/${id}`,
    files
  );
  return data.data;
}

async function PostProduct(newData) {
  const data = await axios.post("http://localhost:5051/api/Product/AddProduct", newData);
  return data;
}

async function PostImage(id, newData) {
  const data = await axios.post(
    `http://localhost:5051/api/ProductImage/AddProductImages?Product_Id=${id}`,
    newData
  );
  return data;
}

async function GetBrandList() {
  const data = await axios.get("http://localhost:5051/api/Category/GetCategoryList");
  return data.data;
}

async function PostBrand(newData) {
  const data = await axios.post("http://localhost:5051/api/Category/AddCategory", newData);
  return data;
}

async function GetBrandByID(id) {
  const data = await axios.get(`
  http://localhost:5051/api/Category/GetCategory/${id}`);
  return data.data;
}

async function PutBrand(id, newData) {
  const data = await axios.put(`http://localhost:5051/api/Category/UpdateCategory/${id}`, newData);
  return data.data;
}

async function GetOrderDetailList() {
  const data = await axios.get("http://localhost:5051/api/OrderDetail/GetOrderDetailList");
  return data.data;
}

export {
  GetUserList,
  PutUserInfor,
  DeleteUserByID,
  GetProductList,
  PutProductStatus,
  GetProductByID,
  GetProductImageByID,
  PutProduct,
  PostNewImage,
  PostProduct,
  PostImage,
  GetBrandList,
  PostBrand,
  GetBrandByID,
  PutBrand,
  PostUser,
  GetOrderDetailList,
};
