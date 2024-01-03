import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Tarjeta(props) {

  function acortarDescripcion(cadena) {
    return cadena.length > 20 ? cadena.slice(0, 20) + "..." : cadena;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.item.thumbnail} style={{ width: "18rem", height: "15rem" }}/>
      <Card.Body>
        <Card.Title>{props.item.title}</Card.Title>
        <Card.Text>{acortarDescripcion(props.item.description)}</Card.Text>
      </Card.Body>
      <Link to={`/products/${props.indice}`}>
        <Button id="ver" variant="primary" style={{ width: "18rem", height: "3rem" }}>
          Ver
        </Button>
      </Link>
    </Card>
  );
}