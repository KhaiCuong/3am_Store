import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { GetBrandList, GetProductList } from "services/ApiService";
/* eslint-disable no-unused-vars */
import { Chart as ChartJS } from "chart.js/auto";

const ChartQuantityProduct = () => {
  const [dataRender, setDataRender] = useState({});
  const [cateName, setCateName] = useState({});
  const [color, setColor] = useState({});

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const brand = await GetBrandList();
        if (brand.status === 200) {
          let name = [];
          let colorRandom = [];
          for (let index = 0; index < brand.data.length; index++) {
            name[index] = brand.data[index].category_name;
            colorRandom[index] = getRandomColor();
          }
          let arr = new Array(brand.data.length).fill(0);
          const product = await GetProductList();
          if (product.status === 200) {
            for (let i = 0; i < product.data.length; i++) {
              for (let j = 0; j < brand.data.length; j++) {
                if (brand.data[j].categoryId == product.data[i].categoryId) {
                  arr[j] = arr[j] + 1;
                }
              }
            }
          }
          setCateName(name);
          setDataRender(arr);
          setColor(colorRandom);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTransportData();
  }, []);

  return (
    <Pie
      data={{
        labels: Object.values(cateName),
        datasets: [
          {
            label: "Population (Product)",
            backgroundColor: Object.values(color),
            data: Object.values(dataRender),
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      }}
    />
  );
};

export default ChartQuantityProduct;
