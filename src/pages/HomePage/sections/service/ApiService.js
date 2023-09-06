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

export { GetProductList, GetProductByID, GetProductByCategoryID };
