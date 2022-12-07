import React from 'react';
import { Link } from "react-router-dom";

export default function Product(props) {

    return <div>
        <img className='imagen' src={props.item.thumbnail} alt="img_producto" />
        <p><b>{props.item.title}</b></p>
        <p>Precio: {props.item.price}€</p>
        <Link to={"/products/"+props.id}><button className="show">Ver</button></Link>
    </div>
}