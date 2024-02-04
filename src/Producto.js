import { Button, Card } from "react-bootstrap";
import Header from "./Header";
import Location from "./Location";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function Producto(props) {
  let { productId } = useParams();

  // Convertir productId a entero
  productId = parseInt(productId);

  // Verificar si productId es válido
  if (isNaN(productId) || productId < 0 || productId >= props.productos.length) {
    // Redirigir a la página de error si productId no es válido
    return <NotFound />;
  }

  let producto = props.productos[productId];

  return (
    <div>
      <Header />
      <br />
      <Location/>
      <br />
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={producto.thumbnail} style={{ width: "18rem", height: "15rem" }} />
        <Card.Body>
          <Card.Title id="titulo">{producto.title}</Card.Title>
          <Card.Text>{producto.description}</Card.Text>
        </Card.Body>
        <Link to={"/"}>
          <Button id="volver" variant="success" style={{ width: "18rem", height: "3rem" }}>
            Volver
          </Button>
        </Link>
      </Card>
    </div>
  );
}

