import axios from "axios";

async function GetFeedbacksByProductId(id) {
  const data = await axios.get(
    `http://localhost:5051/api/Feedback/GetFeedbackListByProductId/${id}`
  );
  return data.data;
}

async function PostLogin(account) {
  const data = await axios.post("http://localhost:5051/api/Auth/Login", account);
  return data;
}

async function PostRegister(account) {
  const data = await axios.post("http://localhost:5051/api/User/AddUser", account);
  return data;
}

async function GetUsers() {
  const data = await axios.get("http://localhost:5051/api/User/GetUserList");
  return data.data;
}

async function GetUserByID(id) {
  const data = await axios.get(`http://localhost:5051/api/User/GetUser/${id}`);
  return data.data;
}

export { GetFeedbacksByProductId, PostLogin, PostRegister, GetUsers, GetUserByID };
