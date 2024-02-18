import axios from "axios";

// PRODUCT ======================================
async function GetProductList() {
  const data = await axios.get("http://localhost:8080/api/Product/GetProductList");
  return data.data;
}
async function GetProductByID(id) {
  const data = await axios.get(`http://localhost:8080/api/Product/GetProduct/${id}`);
  return data.data;
}
async function GetProductByCategoryID(id) {
  const data = await axios.get(
    `http://localhost:8080/api/Product/GetProductListByCategoryId/${id}`
  );
  return data.data;
}
async function GetProductImageByID(id) {
  const data = await axios.get(
    `http://localhost:8080/api/ProductImage/GetProductImagesByProductId/${id}`
  );
  return data.data;
}
async function PutProductQuantity(id, quantity) {
  const data = await axios.put(
    `http://localhost:8080/api/Product/UpdateProductInStock/${id}`,
    quantity,

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
}
async function PutProductStatus(id) {
  const data = await axios.put(`http://localhost:8080/api/Product/UpdateStatusProduct/${id}`);
  return data.data;
}
async function PutProduct(id, newData) {
  const data = await axios.put(`http://localhost:8080/api/Product/UpdateProduct/${id}`, newData);
  return data.data;
}

async function PostNewImage(id, files) {
  const data = await axios.post(
    `http://localhost:8080/api/ProductImage/UpdateProductImagesByProductId/${id}`,
    files
  );
  return data.data;
}

async function PostProduct(newData) {
  const data = await axios.post("http://localhost:8080/api/Product/AddProduct", newData);
  return data;
}

async function PostImage(id, newData) {
  const data = await axios.post(
    `http://localhost:8080/api/ProductImage/AddProductImages?productId=${id}`,
    newData
  );
  return data;
}

// CATEGORY ======================================
async function GetBrandList() {
  const data = await axios.get("http://localhost:8080/api/Category/GetCategoryList");
  return data.data;
}

async function PostBrand(newData) {
  const data = await axios.post("http://localhost:8080/api/Category/AddCategory", newData);
  return data;
}
async function GetBrandByID(id) {
  const data = await axios.get(`
    http://localhost:8080/api/Category/GetCategory/${id}`);
  return data.data;
}

async function PutBrand(id, newData) {
  const data = await axios.put(`http://localhost:8080/api/Category/UpdateCategory/${id}`, newData);
  return data.data;
}

// USER ======================================
async function GetUserByID(id) {
  const data = await axios.get(`http://localhost:8080/api/User/GetUser/${id}`);
  return data.data;
}
async function PutUserInfor(id, newData) {
  const data = await axios.put(`http://localhost:8080/api/User/UpdateUser/${id}`, newData);
  return data.data;
}

async function PutUserStatus(id, status) {
  const data = await axios.put(`http://localhost:8080/api/User/UpdateUserStatus/${id}`, status, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

async function GetUserList() {
  const data = await axios.get("http://localhost:8080/api/User/GetUserList");
  return data.data;
}

async function GetUserByVerifyCode(code) {
  const data = await axios.get(`http://localhost:8080/api/User/GetUserByVerifyCode?code=${code}`);
  return data.data;
}
async function PutPassword(id, password) {
  const data = await axios.put(`http://localhost:8080/api/User/UpdatePassword/${id}`, password, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

async function DeleteUserByID(id) {
  const data = await axios.delete(`http://localhost:8080/api/User/DeleteUser/${id}`);
  return data.data;
}

async function PostUser(newData) {
  const data = await axios.post("http://localhost:8080/api/User/AddUser", newData);
  return data;
}

async function sendVerifyCode(email) {
  const data = await axios.get(`http://localhost:8080/api/User/ResetPassword/${email}`);
  return data;
}

// AUTHEN ======================================
async function PostLogin(account) {
  const data = await axios.post("http://localhost:8080/api/Auth/Login", account);
  return data.data;
}
async function PostRegister(account) {
  const data = await axios.post("http://localhost:8080/api/User/AddUser", account);
  return data;
}

// FEEDBACK ======================================
async function GetFeedbacksByProductId(id) {
  const data = await axios.get(
    `http://localhost:8080/api/Feedback/GetFeedbackListByProductId/${id}`
  );
  return data.data;
}
async function PostFeedback(Feedback) {
  const data = await axios.post("http://localhost:8080/api/Feedback/AddFeedback", Feedback);
  return data.data;
}

// ORDER ======================================
async function GetAllOrders() {
  const data = await axios.get("http://localhost:8080/api/Order/GetOrderList");
  return data.data;
}

async function GetOrdersByUserID(id) {
  const data = await axios.get(`http://localhost:8080/api/Order/GetOrderListByUserId/${id}`);
  return data.data;
}
async function GetOrderByID(id) {
  const data = await axios.get(`http://localhost:8080/api/Order/GetOrder/${id}`);
  return data.data;
}
async function checkOrderProduct(userId, productID) {
  const data = await axios.get(
    `http://localhost:8080/api/Order/checkOrderProduct/${userId}/${productID}`
  );
  return data.data;
}

async function PostOrder(order) {
  const data = await axios.post("http://localhost:8080/api/Order/AddOrder", order);
  return data.data;
}
async function PutOrderStatus(id, status) {
  const data = await axios.put(`http://localhost:8080/api/Order/UpdateStatusOrder/${id}`, status, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

// ORDER DETAIL ======================================
async function GetOrderDetailList() {
  const data = await axios.get("http://localhost:8080/api/OrderDeTail/GetOrderDetailList");
  return data.data;
}
async function GetDetailByOrderID(id) {
  const data = await axios.get(`http://localhost:8080/api/OrderDeTail/GetDetailListByOrder/${id}`);
  return data.data;
}
async function PostOrderDetail(detail) {
  const data = await axios.post("http://localhost:8080/api/OrderDeTail/AddOrderDetail", detail);
  return data.data;
}

// PAYMENT ======================================
async function PostPayment(detail) {
  const data = await axios.post("http://localhost:8080/api/Payment/AddPayment", detail);
  return data.data;
}

export {
  GetProductByID,
  GetProductByCategoryID,
  GetProductImageByID,
  GetUserByID,
  GetFeedbacksByProductId,
  PostFeedback,
  PostOrder,
  PostOrderDetail,
  PutProductQuantity,
  GetUserList,
  PutUserInfor,
  DeleteUserByID,
  GetProductList,
  PutProductStatus,
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
  PostLogin,
  PostRegister,
  GetOrdersByUserID,
  GetDetailByOrderID,
  PutOrderStatus,
  GetOrderByID,
  PostPayment,
  checkOrderProduct,
  GetUserByVerifyCode,
  PutPassword,
  sendVerifyCode,
  PutUserStatus,
  GetAllOrders,
};
