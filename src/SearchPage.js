import Header from "./Header";
import Formulario from "./Formulario";
import Tarjeta from "./Tarjeta";
import Location from "./Location";
import { useState } from "react";

export default function SearchPage(props) {
  const [consulta, setConsulta] = useState("");
  const [productos, setProductos] = useState(props.theproducts);

  const buscar = () => {
    setProductos(props.theproducts.filter((objeto) => objeto.title.toLowerCase().includes(consulta.toLowerCase())));
  };

  const filtrar = (categoria) => {
    setProductos(categoria === "All" ? props.theproducts : props.theproducts.filter(objeto => objeto.category === categoria));
  };

  const obtenerCategoriasUnicas = () => {
    const categoriasUnicas = ['All'];

    if (props.theproducts && props.theproducts.length > 0) {
      props.theproducts.forEach((producto) => {
        if (!categoriasUnicas.includes(producto.category)) {
          categoriasUnicas.push(producto.category);
        }
      });
    }
    return categoriasUnicas;
  };


  return (
    <div>
      <Header />
      <br />
      <Location/>
      <br />
      <Formulario
        consulta={consulta}
        setConsulta={setConsulta}
        buscar={buscar}
        filtrar={filtrar}
        categorias={obtenerCategoriasUnicas()}
      />
      <br />
      <div id="productosresultados">
        <ul id="resultados">
          {productos.map((item) => (
          <li className="unproducto" key={item.id}>
            <Tarjeta item={item} indice={props.theproducts.indexOf(item)} />
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
