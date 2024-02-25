import { Domain } from "services/Domain";

const { GetProductList } = require("services/ApiService");
const { useState, useEffect } = require("react");

function ProductData(page, sort, fKey) {
  const [data, setData] = useState([]);
  const count = (page - 1) * 12;

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        let listProduct = [];
        const response = await GetProductList();
        if (response.status === 200) {
          const newResponse = response.data.filter((pd) => pd.status === true && pd.type === 1);
          let listdata = [];

          // *** Resolve Sort and Search => create list product to display for the user to view
          if (sort == "desc") {
            if (fKey != "" && fKey != null) {
              // if User Search and choose "desc" sort
              listdata = newResponse
                .filter((i) => i.produc_name.toLowerCase().includes(fKey.toLowerCase()))
                .sort((a, b) => (a.price > b.price ? -1 : 1));
            } else {
              // if User just sort
              listdata = newResponse.sort((a, b) => (a.price > b.price ? -1 : 1));
            }
          } else if (sort == "asc") {
            if (fKey != "" && fKey != null) {
              // if User Search and choose "asc" sort
              listdata = newResponse
                .filter((i) => i.produc_name.toLowerCase().includes(fKey.toLowerCase()))
                .sort((a, b) => (a.price < b.price ? -1 : 1));
            } else {
              // if User just sort
              listdata = newResponse.sort((a, b) => (a.price < b.price ? -1 : 1));
            }
          } else {
            // if User Search
            if (fKey != "" && fKey != null) {
              listdata = await newResponse.filter((i) =>
                i.produc_name.toLowerCase().includes(fKey.toLowerCase())
              );
            } else {
              // if the user doesn't do  anything
              listdata = await newResponse;
            }
          }

          // *** Configure what information to display
          if (fKey != "" && fKey != null) {
            // if user Search
            for (var j = 0; j < listdata.length; j++) {
              if (newResponse[j] != null) {
                listProduct[j] = {
                  image: `${Domain}/${listdata[j].image}`,
                  name: `${listdata[j].produc_name}`,
                  count: `${listdata[j].price}`,
                  route: `http://localhost:3000/products/ProductDetail/${listdata[j].productId}`,
                };
              } else {
                break;
              }
            }
          } else {
            // if the user doesn't do  anything
            for (var i = 0 + count; i < 12 + count; i++) {
              if (newResponse[i] != null) {
                listProduct[i] = {
                  image: `${Domain}/${listdata[i].image}`,
                  name: `${listdata[i].produc_name}`,
                  count: `${listdata[i].price}`,
                  route: `http://localhost:3000/products/ProductDetail/${listdata[i].productId}`,
                };
              } else {
                break;
              }
            }
          }

          setData(listProduct);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataProduct();
  }, [page, sort, fKey]);

  return data;
}

// *** show the number of pages currently available
function NumberOfPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductList();
        if (response.status === 200) {
          const newResponse = response.data.filter((pd) => pd.status === true);
          setCount(newResponse.length);
          console.log("lengt", newResponse.length);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataProduct();
  }, []);

  return Math.ceil((count / 12).toFixed());
}

export { NumberOfPage, ProductData };
