const { GetProductList } = require("pages/ProductPages/service/ApiService");
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
          let listdata = [];
          // let listsearch;
          // if (fKey != "" && fKey != null) {
          //   listsearch = response.data.filter((i) =>
          //     i.produc_name.toLowerCase().includes(fKey.toLowerCase())
          //   );
          // }
          // console.log("listsearch", listsearch);

          // Sort
          if (sort == "desc") {
            listdata = response.data.sort((a, b) => (a.price > b.price ? -1 : 1));
          } else if (sort == "asc") {
            listdata = response.data.sort((a, b) => (a.price < b.price ? -1 : 1));
          } else {
            if (fKey != "" && fKey != null) {
              listdata = await response.data.filter((i) =>
                i.produc_name.toLowerCase().includes(fKey.toLowerCase())
              );
              console.log("listsearch", listdata);
            } else {
              listdata = await response.data;
            }
          }

          if (fKey != "" && fKey != null) {
            for (var j = 0; j < listdata.length; j++) {
              if (response.data[j] != null) {
                listProduct[j] = {
                  image: `http://localhost:5051${listdata[j].image}`,
                  name: `${listdata[j].produc_name}`,
                  count: `${listdata[j].price}`,
                  route: "/sections/page-sections/page-headers",
                };
              } else {
                break;
              }
            }
          } else {
            for (var i = 0 + count; i < 12 + count; i++) {
              if (response.data[i] != null) {
                listProduct[i] = {
                  image: `http://localhost:5051${listdata[i].image}`,
                  name: `${listdata[i].produc_name}`,
                  count: `${listdata[i].price}`,
                  route: "/sections/page-sections/page-headers",
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

function NumberOfPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductList();
        if (response.status === 200) {
          setCount(response.data.length);
          console.log("lengt", response.data.length);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataProduct();
  }, []);

  return (count / 12).toFixed();
}

export { NumberOfPage, ProductData };
