import "./App.css";
import SearchPage from "./SearchPage";
import CONFIG from "./config/config.js";
import { mockdata } from "./constants/products.js";
import { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Producto from "./Producto.js";
import NotFound from "./NotFound.js";
import { Route, Routes } from "react-router-dom";


function App() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      if (CONFIG.use_server) {
        try {
          const response = await fetch(CONFIG.server_url);
          const data = await response.json();
          setDatos(data);
          setError(null);
        } catch (error) {
          console.log(error);
          setError({ description: error.message });
        }
      } else {
        setDatos(mockdata);
        setError(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {error && <h1>Ha habido un error: {error.description}</h1>}
      {datos ? (
        <div>
          <Routes>
            <Route path="/" element={<SearchPage theproducts={datos.products}/>} />
            <Route path="/products/:productId" element={<Producto productos={datos.products} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>  
      ) : (
        <div className="text-center">
          <Spinner id="loading" className="spinner" animation="border" role="status">
            <span className="sr-only">Cargando...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default App;