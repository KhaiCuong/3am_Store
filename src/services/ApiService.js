import axios from "axios";
import { Domain } from "./Domain";

// PRODUCT ======================================
async function GetProductList() {
  const data = await axios.get(`${Domain}/api/Product/GetProductList`);
  return data.data;
}
async function GetProductByID(id) {
  const data = await axios.get(`${Domain}/api/Product/GetProduct/${id}`);
  return data.data;
}
async function GetProductByCategoryID(id) {
  const data = await axios.get(`${Domain}/api/Product/GetProductListByCategoryId/${id}`);
  return data.data;
}
async function GetProductImageByID(id) {
  const data = await axios.get(`${Domain}/api/ProductImage/GetProductImagesByProductId/${id}`);
  return data.data;
}
async function PutProductQuantity(id, quantity) {
  const data = await axios.put(
    `${Domain}/api/Product/UpdateProductInStock/${id}`,
    quantity,

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
}

async function PutProductTotalBuy(id, quantity) {
  const data = await axios.put(
    `${Domain}/api/Product/UpdateProductTotalBuy/${id}`,
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
  const data = await axios.put(`${Domain}/api/Product/UpdateStatusProduct/${id}`);
  return data.data;
}
async function PutProduct(id, newData) {
  const data = await axios.put(`${Domain}/api/Product/UpdateProduct/${id}`, newData);
  return data.data;
}

async function PostNewImage(id, files) {
  const data = await axios.post(
    `${Domain}/api/ProductImage/UpdateProductImagesByProductId/${id}`,
    files
  );
  return data.data;
}

async function PostProduct(newData) {
  const data = await axios.post(`${Domain}/api/Product/AddProduct`, newData);
  return data;
}

async function PostImage(id, newData) {
  const data = await axios.post(
    `${Domain}/api/ProductImage/AddProductImages?productId=${id}`,
    newData
  );
  return data;
}

// CATEGORY ======================================
async function GetBrandList() {
  const data = await axios.get(`${Domain}/api/Category/GetCategoryList`);
  return data.data;
}

async function PostBrand(newData) {
  const data = await axios.post(`${Domain}/api/Category/AddCategory`, newData);
  return data;
}
async function GetBrandByID(id) {
  const data = await axios.get(`
    ${Domain}/api/Category/GetCategory/${id}`);
  return data.data;
}

async function PutBrand(id, newData) {
  const data = await axios.put(`${Domain}/api/Category/UpdateCategory/${id}`, newData);
  return data.data;
}

// USER ======================================
async function GetUserByID(id) {
  const data = await axios.get(`${Domain}/api/User/GetUser/${id}`);
  return data.data;
}
async function PutUserInfor(id, newData) {
  const data = await axios.put(`${Domain}/api/User/UpdateUser/${id}`, newData);
  return data.data;
}

async function PutUserStatus(id, status) {
  const data = await axios.put(`${Domain}/api/User/UpdateUserStatus/${id}`, status, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

async function GetUserList() {
  const data = await axios.get(`${Domain}/api/User/GetUserList`);
  return data.data;
}

async function GetUserByVerifyCode(code) {
  const data = await axios.get(`${Domain}/api/User/GetUserByVerifyCode?code=${code}`);
  return data.data;
}
async function PutPassword(id, password) {
  const data = await axios.put(`${Domain}/api/User/UpdatePassword/${id}`, password, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

async function DeleteUserByID(id) {
  const data = await axios.delete(`${Domain}/api/User/DeleteUser/${id}`);
  return data.data;
}

async function PostUser(newData) {
  const data = await axios.post(`${Domain}/api/User/AddUser`, newData);
  return data;
}

async function sendVerifyCode(email) {
  const data = await axios.get(`${Domain}/api/User/ResetPassword/${email}`);
  return data;
}

// AUTHEN ======================================
async function PostLogin(account) {
  const data = await axios.post(`${Domain}/api/Auth/Login`, account);
  return data.data;
}
async function PostRegister(account) {
  const data = await axios.post(`${Domain}/api/User/AddUser`, account);
  return data;
}

// FEEDBACK ======================================

async function GetFeebackList() {
  const data = await axios.get(`${Domain}/api/Feedback/GetFeedbackList`);
  return data.data;
}

async function GetFeedbacksByProductId(id) {
  const data = await axios.get(`${Domain}/api/Feedback/GetFeedbackListByProductId/${id}`);
  return data.data;
}
async function PostFeedback(Feedback) {
  const data = await axios.post(`${Domain}/api/Feedback/AddFeedback`, Feedback);
  return data.data;
}

// ORDER ======================================
async function GetAllOrders() {
  const data = await axios.get(`${Domain}/api/Order/GetOrderList`);
  return data.data;
}

async function GetOrdersByUserID(id) {
  const data = await axios.get(`${Domain}/api/Order/GetOrderListByUserId/${id}`);
  return data.data;
}
async function GetOrderByID(id) {
  const data = await axios.get(`${Domain}/api/Order/GetOrder/${id}`);
  return data.data;
}
async function checkOrderProduct(userId, productID) {
  const data = await axios.get(`${Domain}/api/Order/checkOrderProduct/${userId}/${productID}`);
  return data.data;
}

async function PutOrder(id, order) {
  const data = await axios.put(`${Domain}/api/Order/UpdateOrder/${id}`, order);
  return data.data;
}

async function PostOrder(order) {
  const data = await axios.post(`${Domain}/api/Order/AddOrder`, order);
  return data.data;
}
async function PutOrderStatus(id, status) {
  const data = await axios.put(`${Domain}/api/Order/UpdateStatusOrder/${id}`, status, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

// ORDER DETAIL ======================================
async function GetOrderDetailList() {
  const data = await axios.get(`${Domain}/api/OrderDeTail/GetOrderDetailList`);
  return data.data;
}
async function GetDetailByOrderID(id) {
  const data = await axios.get(`${Domain}/api/OrderDeTail/GetDetailListByOrder/${id}`);
  return data.data;
}
async function PostOrderDetail(detail) {
  const data = await axios.post(`${Domain}/api/OrderDeTail/AddOrderDetail`, detail);
  return data.data;
}

// PAYMENT ======================================
async function PostPayment(detail) {
  const data = await axios.post(`${Domain}/api/Payment/AddPayment`, detail);
  return data.data;
}
async function GetPaymentList() {
  const data = await axios.get(`${Domain}/api/Payment/GetPaymentList`);
  return data.data;
}
async function GetPaymentByOrderID(id) {
  const data = await axios.get(`${Domain}/api/Payment/GetPaymentByOrderId/${id}`);
  return data.data;
}

async function PutPaymenttatus(id, status) {
  const data = await axios.put(`${Domain}/api/Payment/UpdateStatusPayment/${id}`, status, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

// AUCTION ======================================

async function PostAuction(detail) {
  const data = await axios.post(`${Domain}/api/aution/addnew`, detail);
  return data.data;
}

async function GetAuctionByProductID(id) {
  const data = await axios.get(`${Domain}/api/aution/GetAutionByProductId/${id}`);
  return data.data;
}

async function PutAuction(id, auction) {
  console.log("id    id", id);
  console.log("id  auction  id", auction);

  const data = await axios.put(`${Domain}/api/aution/UpdateAution/${id}`, auction);
  return data.data;
}

async function GetBidByAutionID(id) {
  const data = await axios.get(`${Domain}/api/bid/GetBidByAutionId/${id}`);
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
  PutOrder,
  GetPaymentList,
  PutPaymenttatus,
  GetPaymentByOrderID,
  PutProductTotalBuy,
  GetFeebackList,
  PostAuction,
  GetAuctionByProductID,
  PutAuction,
  GetBidByAutionID,
};
