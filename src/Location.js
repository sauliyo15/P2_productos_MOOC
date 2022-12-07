import {useParams, useLocation} from "react-router-dom";

export default function Location(props) {
  let { productId } = useParams();
	const location = useLocation(); 

	return (<div> 
    <div id="divlocation">Location es: {location.pathname}</div>
		{productId && <div id="divproductid">ProductId es: {productId}</div>}
	</div>)
}