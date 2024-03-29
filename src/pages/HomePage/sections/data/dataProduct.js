import { Domain } from "services/Domain";

const { useState, useEffect } = require("react");
const { GetProductByCategoryID } = require("services/ApiService");

// const imagesPrefix =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

function dataRolex() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("RL");
        if (response.status === 200) {
          setData(response.data.filter((pd) => pd.status === true));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `${Domain}/${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.productId}`,
  }));

  return listProduct;
}

function dataCasio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("CK");
        if (response.status === 200) {
          setData(response.data.filter((pd) => pd.status === true));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `${Domain}/${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.productId}`,
  }));

  return listProduct;
}

function dataOrient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("HL");
        console.log("response", response);
        if (response.status === 200) {
          setData(response.data.filter((pd) => pd.status === true));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `${Domain}/${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.productId}`,
  }));

  return listProduct;
}

function dataOmega() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("OM");
        if (response.status === 200) {
          setData(response.data.filter((pd) => pd.status === true));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `${Domain}/${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.productId}`,
  }));

  return listProduct;
}

export { dataRolex, dataCasio, dataOrient, dataOmega };
