import './App.css';
import SearchPage from './SearchPage';
import { mockdata } from './constants/products'
import React, { useState, useEffect } from 'react';
import CONFIG from './config/config';
import ProductInfo from './ProductInfo';
import { Routes, Route } from "react-router-dom";
import NoMatch from './NoMatch';
import Spinner from './Spinner';

const USE_SERVER = CONFIG.use_server;
const URL_SERVER = CONFIG.server_url;


function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState([]);

  const downloadData = async () => {
    if (USE_SERVER) {
      try {
        const response = await fetch(URL_SERVER);
        if (response.status === 200) {
          const res = await response.json();
          const datos = res.products;
          setData(datos);
          categorias(datos);
          titulos(datos);


        } else {
          const err = await response.json();
          setData(err);
        }

      } catch (e) {
        setData({ e: { description: e.message } });
      }
    } else {
      setData(mockdata.products);
      categorias(mockdata.products);
      titulos(mockdata.products);

    }
  }
      const categorias = (arr) => {
        let categorias_arr = [];
        arr.map((item, index) => {
          return categorias_arr.push(item.category);
        });
    
        const categorias_filtradas = categorias_arr.reduce(
          (previousValue, currentValue) => {
            if (!previousValue.includes(currentValue)) {
              return [...previousValue, currentValue];
            }
            return previousValue;
          },
          [],
        );
        setCategory(categorias_filtradas);
        }

        const titulos = (arr) =>{
        let titulos_arr = [];
        arr.map((item, index) => {
          return titulos_arr[index] = item.title;
        });
          setTitle(titulos_arr);
        }

  useEffect(() => {
    async function fetchData() {
      await downloadData();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    fetchData();
  }, []);

  return (
    <div className="App">

      {
        loading ? <Spinner id='loading' className="spinner" /> : <Routes>
          <Route path="/" element={<SearchPage theproducts={data} thecategories={category} thetitles={title} />} />
          <Route path="/products/:productId" element={<ProductInfo theproducts={data} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      }
    </div>
  );
}

export default App;
