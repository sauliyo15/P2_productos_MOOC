import { Link, useParams } from "react-router-dom";
import Location from './Location';
import Header from "./Header";

export default function ProductInfo(props) {

	let { productId } = useParams();

	return (<div id="info">
		<Header />
		<Location />
		<img className='imagen' src={props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).thumbnail} alt="img_producto" />
		<h3 id='titulo'>{props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).title}</h3>
		<p>
			Precio: <b> {props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).price}€ </b> <br />
			Rating: {props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).rating} <br />
			Descripción: <b> {props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).description}</b> <br />
			Stock: {props.theproducts.find(({ id }) => { return id === (Number(productId) + 1) }).stock} <br />
		</p>
		<Link to="/"><button id='volver' className="index">Volver</button></Link>

	</div>)
}