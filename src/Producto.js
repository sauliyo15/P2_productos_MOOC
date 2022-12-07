import { Link, useParams } from "react-router-dom";
import Location from "./Location";
import { Card } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup';

export default function Producto(props) {
    let { productId } = useParams();
    return (
        <div>
            <Location/>
            <Card style={{ width: '18rem' }}>
                <CardGroup className="cartas">
                    <Card.Body>
                        <p><Card.Img className="imagen" src={props.productos[productId].images[0]} /></p>
                        <p><Card.Title><b id="titulo">{props.productos[productId].title}</b></Card.Title></p>
                        <p><Card.Text>Descripción:{props.productos[productId].description}€</Card.Text></p>
                        <p><Card.Text>Price:{props.productos[productId].price}€</Card.Text></p>
                        <p><Link to={"/"}><button id="volver">Volver</button></Link></p>
                    </Card.Body>
                </CardGroup>
            </Card>
        </div>

    )
}