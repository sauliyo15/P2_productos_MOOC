import React from 'react';

export default function Header() {
    return (
        <div id="cabecera">
            <img className="logo" src={process.env.PUBLIC_URL + "/sun.webp"} alt="logo" />
            <h3 className="mensaje">Bienvenido a la página de Andres Alfaro Fernandez</h3>
        </div>
    );
}