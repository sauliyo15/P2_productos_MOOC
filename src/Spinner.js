import React from 'react';

function Spinner() {
  return (
    <div id='loading' className="spinner">
        <img id='loading' className="spinner" src={process.env.PUBLIC_URL + "/sun.webp"} alt="spinner" />
    </div>
  );
}

export default Spinner;