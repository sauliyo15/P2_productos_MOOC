import { Link } from "react-router-dom";

export default function NoMatch() {
  return <div>
    <img className="nofound" src={process.env.PUBLIC_URL + "/404.jpg"} alt="logo" />
    <br />
    <div id='info'>Ruta no encontrada</div>
    <Link to="/"><button id='volver' className="volver">VOLVER</button></Link>
  </div>
}