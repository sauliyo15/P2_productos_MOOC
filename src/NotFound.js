import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound(props) {
  
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/404.jpg"} alt="logo" style={{ width: "25rem", height: "18rem" }} />
      <br />
      <h1 id="info">Ruta no encontrada</h1>
      <Link to={"/"}>
        <Button id="volver" variant="primary" style={{ width: "18rem", height: "3rem" }}>
          Volver
        </Button>
      </Link>
    </div>
  );
}