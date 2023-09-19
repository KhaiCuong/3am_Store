const { useState, useEffect } = require("react");
const { GetProductByCategoryID } = require("../service/ApiService");

// const imagesPrefix =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

function dataRolex() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("RL9");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `http://localhost:5051${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.product_id}`,
  }));

  return listProduct;
}

function dataCasio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("CS7");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `http://localhost:5051${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.product_id}`,
  }));

  return listProduct;
}

function dataOrient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("OR1");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `http://localhost:5051${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.product_id}`,
  }));

  return listProduct;
}

function dataOmega() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByCategoryID("OM2");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataProduct();
  }, []);

  let listProduct = data.map((item) => ({
    image: `http://localhost:5051${item.image}`,
    name: `${item.produc_name}`,
    count: `${item.price}`,
    route: `http://localhost:3000/products/ProductDetail/${item.product_id}`,
  }));

  return listProduct;
}

export { dataRolex, dataCasio, dataOrient, dataOmega };
